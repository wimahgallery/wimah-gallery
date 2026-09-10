import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { uploadImage } from "@/lib/imagekit"
import { v4 as uuid } from "uuid"
import { parsePagination, paginatedResponse, requireAuth } from "@/lib/api-helpers"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const { page, limit, from, to } = parsePagination(searchParams)
  const search = searchParams.get("search")?.trim() || ""

  let query = supabase
    .from("events")
    .select("*", { count: "exact" })
    .order("event_date", { ascending: false })

  if (search) {
    query = query.or(`couple_name.ilike.%${search}%,event_name.ilike.%${search}%`)
  }

  const { data, error, count } = await query.range(from, to)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return paginatedResponse(data, count, page, limit)
}

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  const formData = await request.formData()
  const coupleName = formData.get("couple_name") as string | null
  const eventName = formData.get("event_name") as string | null
  const eventDate = formData.get("event_date") as string | null
  const location = formData.get("location") as string | null
  const imagesSource = formData.get("images_source") as string | null
  const sortOrder = Number(formData.get("sort_order") ?? 0)
  const imageFile = formData.get("image") as File | null

  if (!coupleName || !eventName || !eventDate || !location) {
    return NextResponse.json(
      { error: "Couple name, event name, date, and location are required" },
      { status: 400 }
    )
  }

  let imageUrl: string | null = null
  let imageFileId: string | null = null

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const ext = imageFile.name.split(".").pop() || "jpg"
    const fileName = `event-${uuid()}.${ext}`

    const uploaded = await uploadImage(buffer, fileName, "Albumn")
    imageUrl = uploaded.url ?? null
    imageFileId = uploaded.fileId ?? null
  }

  const { data, error } = await auth.supabase
    .from("events")
    .insert({
      couple_name: coupleName,
      event_name: eventName,
      event_date: eventDate,
      location,
      images_source: imagesSource || null,
      image_url: imageUrl,
      image_file_id: imageFileId,
      sort_order: sortOrder,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
