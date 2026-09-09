import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { uploadImage, deleteImage } from "@/lib/imagekit"
import { v4 as uuid } from "uuid"

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const contentType = request.headers.get("content-type") || ""
  let updateData: Record<string, unknown> = {}

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData()
    const coupleName = formData.get("couple_name") as string | null
    const eventName = formData.get("event_name") as string | null
    const eventDate = formData.get("event_date") as string | null
    const location = formData.get("location") as string | null
    const imagesSource = formData.get("images_source") as string | null
    const visible = formData.get("visible") as string | null
    const sortOrder = formData.get("sort_order") as string | null
    const imageFile = formData.get("image") as File | null
    const removeImage = formData.get("removeImage") === "true"

    if (coupleName !== null) updateData.couple_name = coupleName
    if (eventName !== null) updateData.event_name = eventName
    if (eventDate !== null) updateData.event_date = eventDate
    if (location !== null) updateData.location = location
    if (imagesSource !== null) updateData.images_source = imagesSource || null
    if (visible !== null) updateData.visible = visible === "true"
    if (sortOrder !== null) updateData.sort_order = Number(sortOrder)

    if (imageFile && imageFile.size > 0) {
      const { data: existing } = await supabase
        .from("events")
        .select("image_file_id")
        .eq("id", id)
        .single()

      if (existing?.image_file_id) {
        try { await deleteImage(existing.image_file_id) } catch {}
      }

      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const ext = imageFile.name.split(".").pop() || "jpg"
      const fileName = `event-${uuid()}.${ext}`
      const uploaded = await uploadImage(buffer, fileName, "Albumn")

      updateData.image_url = uploaded.url ?? null
      updateData.image_file_id = uploaded.fileId ?? null
    } else if (removeImage) {
      const { data: existing } = await supabase
        .from("events")
        .select("image_file_id")
        .eq("id", id)
        .single()

      if (existing?.image_file_id) {
        try { await deleteImage(existing.image_file_id) } catch {}
      }

      updateData.image_url = null
      updateData.image_file_id = null
    }
  } else {
    const body = await request.json()
    updateData = body
  }

  const { data, error } = await supabase
    .from("events")
    .update(updateData)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}

export async function DELETE(
  _request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const supabase = await createClient()

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { data: existing } = await supabase
    .from("events")
    .select("image_file_id")
    .eq("id", id)
    .single()

  if (existing?.image_file_id) {
    try { await deleteImage(existing.image_file_id) } catch {}
  }

  const { error } = await supabase
    .from("events")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
