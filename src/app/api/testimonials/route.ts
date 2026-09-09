import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { uploadImage } from "@/lib/imagekit"
import { v4 as uuid } from "uuid"

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const page = Math.max(1, Number(searchParams.get("page")) || 1)
  const limit = Math.min(50, Math.max(1, Number(searchParams.get("limit")) || 10))
  const from = (page - 1) * limit
  const to = from + limit - 1

  const { data, error, count } = await supabase
    .from("testimonials")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(from, to)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({
    data,
    total: count ?? 0,
    page,
    limit,
    totalPages: Math.ceil((count ?? 0) / limit),
  })
}

export async function POST(request: Request) {
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const formData = await request.formData()
  const message = formData.get("message") as string | null
  const username = formData.get("username") as string | null
  const role = formData.get("role") as string | null
  const visible = formData.get("visible") !== "false"
  const imageFile = formData.get("image") as File | null

  if (!message || !username || !role) {
    return NextResponse.json(
      { error: "Message, username, and role are required" },
      { status: 400 }
    )
  }

  let imageUrl: string | null = null
  let imageFileId: string | null = null

  if (imageFile && imageFile.size > 0) {
    const bytes = await imageFile.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const ext = imageFile.name.split(".").pop() || "jpg"
    const fileName = `testimonial-${uuid()}.${ext}`

    const uploaded = await uploadImage(buffer, fileName, "Testimonial")
    imageUrl = uploaded.url ?? null
    imageFileId = uploaded.fileId ?? null
  }

  const { data, error } = await supabase
    .from("testimonials")
    .insert({ message, username, role, visible, image_url: imageUrl, image_file_id: imageFileId })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
