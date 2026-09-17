import { NextResponse } from "next/server"
import { uploadImage, deleteImage } from "@/lib/imagekit"
import { v4 as uuid } from "uuid"
import { requireAuth } from "@/lib/api-helpers"

function extractFileIds(content: unknown): string[] {
  const fileIds: string[] = []
  if (!content || typeof content !== "object") return fileIds

  const node = content as Record<string, unknown>
  if (node.type === "figure" && node.attrs) {
    const attrs = node.attrs as Record<string, unknown>
    if (attrs.fileId && typeof attrs.fileId === "string") {
      fileIds.push(attrs.fileId)
    }
  }

  if (Array.isArray(node.content)) {
    for (const child of node.content) {
      fileIds.push(...extractFileIds(child))
    }
  }

  return fileIds
}

async function deleteInlineImages(fileIds: string[]) {
  await Promise.allSettled(
    fileIds.map(async (fileId) => {
      try {
        await deleteImage(fileId)
      } catch {}
    })
  )
}

export async function PATCH(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params
  const auth = await requireAuth()
  if (auth.error) return auth.error

  const contentType = request.headers.get("content-type") || ""
  const updateData: Record<string, unknown> = {}

  if (contentType.includes("multipart/form-data")) {
    const formData = await request.formData()
    const title = formData.get("title") as string | null
    const slug = formData.get("slug") as string | null
    const excerpt = formData.get("excerpt") as string | null
    const content = formData.get("content") as string | null
    const author = formData.get("author") as string | null
    const category = formData.get("category") as string | null
    const published = formData.get("published") as string | null
    const visible = formData.get("visible") as string | null
    const sortOrder = formData.get("sort_order") as string | null
    const coverImage = formData.get("cover_image") as File | null
    const removeCover = formData.get("removeCoverImage") === "true"

    if (title !== null) updateData.title = title
    if (slug !== null) updateData.slug = slug
    if (excerpt !== null) updateData.excerpt = excerpt || null
    if (author !== null) updateData.author = author
    if (category !== null) updateData.category = category || null
    if (published !== null) updateData.published = published === "true"
    if (visible !== null) updateData.visible = visible === "true"
    if (sortOrder !== null) updateData.sort_order = Number(sortOrder)

    // Handle content update — clean up removed inline images
    if (content !== null) {
      let newContent: unknown = null
      if (content) {
        try {
          newContent = JSON.parse(content)
        } catch {
          return NextResponse.json(
            { error: "Invalid content JSON" },
            { status: 400 }
          )
        }
      }
      const newFileIds = extractFileIds(newContent)

      // Get old content to find fileIds that were removed
      const { data: existing } = await auth.supabase
        .from("blogs")
        .select("content")
        .eq("id", id)
        .single()

      const oldFileIds = extractFileIds(existing?.content)
      const removedFileIds = oldFileIds.filter((fid) => !newFileIds.includes(fid))

      if (removedFileIds.length > 0) {
        await deleteInlineImages(removedFileIds)
      }

      updateData.content = newContent
    }

    // Handle cover image
    if (coverImage && coverImage.size > 0) {
      const { data: existing } = await auth.supabase
        .from("blogs")
        .select("cover_image_file_id")
        .eq("id", id)
        .single()

      if (existing?.cover_image_file_id) {
        try { await deleteImage(existing.cover_image_file_id) } catch {}
      }

      const bytes = await coverImage.arrayBuffer()
      const buffer = Buffer.from(bytes)
      const ext = coverImage.name.split(".").pop() || "jpg"
      const fileName = `blog-${uuid()}.${ext}`
      const uploaded = await uploadImage(buffer, fileName, "Blog")

      updateData.cover_image_url = uploaded.url ?? null
      updateData.cover_image_file_id = uploaded.fileId ?? null
    } else if (removeCover) {
      const { data: existing } = await auth.supabase
        .from("blogs")
        .select("cover_image_file_id")
        .eq("id", id)
        .single()

      if (existing?.cover_image_file_id) {
        try { await deleteImage(existing.cover_image_file_id) } catch {}
      }

      updateData.cover_image_url = null
      updateData.cover_image_file_id = null
    }
  } else {
    const body = await request.json()
    const allowedFields = ["title", "slug", "excerpt", "content", "author", "category", "published", "visible", "sort_order"]
    for (const key of allowedFields) {
      if (key in body) updateData[key] = body[key]
    }
  }

  const { data, error } = await auth.supabase
    .from("blogs")
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
  const auth = await requireAuth()
  if (auth.error) return auth.error

  // Get blog data for cleanup
  const { data: existing } = await auth.supabase
    .from("blogs")
    .select("cover_image_file_id, content")
    .eq("id", id)
    .single()

  // Delete cover image from ImageKit
  if (existing?.cover_image_file_id) {
    try { await deleteImage(existing.cover_image_file_id) } catch {}
  }

  // Delete inline images from ImageKit
  const inlineFileIds = extractFileIds(existing?.content)
  if (inlineFileIds.length > 0) {
    await deleteInlineImages(inlineFileIds)
  }

  // Delete blog from DB
  const { error } = await auth.supabase
    .from("blogs")
    .delete()
    .eq("id", id)

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ success: true })
}
