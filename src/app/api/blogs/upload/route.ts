import { NextResponse } from "next/server"
import { requireAuth } from "@/lib/api-helpers"
import { uploadImage } from "@/lib/imagekit"
import { v4 as uuid } from "uuid"

const ALLOWED_MIMES = ["image/jpeg", "image/png", "image/webp", "image/gif"]
const ALLOWED_EXTENSIONS = ["jpg", "jpeg", "png", "webp", "gif"]

export async function POST(request: Request) {
  const auth = await requireAuth()
  if (auth.error) return auth.error

  const formData = await request.formData()
  const file = formData.get("file") as File | null

  if (!file || file.size === 0) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "File must be less than 5MB" }, { status: 400 })
  }

  if (!ALLOWED_MIMES.includes(file.type)) {
    return NextResponse.json(
      { error: "Invalid file type. Allowed: JPG, PNG, WebP, GIF" },
      { status: 400 }
    )
  }

  const ext = file.name.split(".").pop()?.toLowerCase() || "jpg"
  if (!ALLOWED_EXTENSIONS.includes(ext)) {
    return NextResponse.json(
      { error: "Invalid file extension" },
      { status: 400 }
    )
  }

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)
  const fileName = `blog-inline-${uuid()}.${ext}`

  const uploaded = await uploadImage(buffer, fileName, "Blog")

  return NextResponse.json({
    url: uploaded.url,
    fileId: uploaded.fileId,
  })
}
