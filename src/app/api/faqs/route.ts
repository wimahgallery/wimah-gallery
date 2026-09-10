import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { parsePagination, paginatedResponse, requireAuth } from "@/lib/api-helpers"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const { page, limit, from, to } = parsePagination(searchParams)

  const { data, error, count } = await supabase
    .from("faqs")
    .select("*", { count: "exact" })
    .order("sort_order", { ascending: true })
    .range(from, to)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return paginatedResponse(data, count, page, limit)
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  const body = await request.json()

  const { data, error } = await auth.supabase
    .from("faqs")
    .insert(body)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
