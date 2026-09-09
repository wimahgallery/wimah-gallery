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
    const message = formData.get("message") as string | null
    const username = formData.get("username") as string | null
    const role = formData.get("role") as string | null
    const visible = formData.get("visible") as string | null
    const imageFile = formData.get("image") as File | null
    const removeImage = formData.get("removeImage") === "true"

    if (message !== null) updateData.message = message
    if (username !== null) updateData.username = username
    if (role !== null) updateData.role = role
    if (visible !== null) updateData.visible = visible === "true"

    if (imageFile && imageFile.size > 0) {
      const { data: existing } = await supabase
        .from("testimonials")
        .select("image_file_id")
        .eq("id", id)
        .single()

      if (existing?.image_file_id) {
        try { await deleteImage(existing.image_file_id) } catch {}
      }

      const bytes = await imageFile.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const ext = imageFile.name.split(".").pop() || "jpg"
      const fileName = `testimonial-${uuid()}.${ext}`
      const uploaded = await uploadImage(buffer, fileName, "testimonials")

      updateData.image_url = uploaded.url ?? null
      updateData.image_file_id = uploaded.fileId ?? null
    } else if (removeImage) {
      const { data: existing } = await supabase
        .from("testimonials")
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
    .from("testimonials")
    .update(updateData)
    .eq("id", id)
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data)
}
