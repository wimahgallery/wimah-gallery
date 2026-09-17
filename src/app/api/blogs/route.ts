import { NextResponse } from "next/server"
import { createClient } from "@/lib/supabase/server"
import { uploadImage } from "@/lib/imagekit"
import { v4 as uuid } from "uuid"
import { parsePagination, paginatedResponse, requireAuth } from "@/lib/api-helpers"

function sanitizeSearch(input: string): string {
  return input.replace(/[%_,]/g, (char) => `\\${char}`)
}

export async function GET(request: Request) {
  const supabase = await createClient()
  const { searchParams } = new URL(request.url)
  const { page, limit, from, to } = parsePagination(searchParams)
  const search = sanitizeSearch(searchParams.get("search")?.trim() || "")
  const publishedOnly = searchParams.get("published") === "true"

  const { data: { user } } = await supabase.auth.getUser()
  const isAdmin = !!user

  let query = supabase
    .from("blogs")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })

  if (search) {
    query = query.or(`title.ilike.%${search}%,category.ilike.%${search}%`)
  }

  if (!isAdmin || publishedOnly) {
    query = query.eq("published", true).eq("visible", true)
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
  const title = formData.get("title") as string | null
  const slug = formData.get("slug") as string | null
  const excerpt = formData.get("excerpt") as string | null
  const content = formData.get("content") as string | null
  const author = formData.get("author") as string | null
  const category = formData.get("category") as string | null
  const published = formData.get("published") === "true"
  const sortOrder = Number(formData.get("sort_order") ?? 0)
  const coverImage = formData.get("cover_image") as File | null

  if (!title || !slug) {
    return NextResponse.json(
      { error: "Title and slug are required" },
      { status: 400 }
    )
  }

  let coverImageUrl: string | null = null
  let coverImageFileId: string | null = null

  if (coverImage && coverImage.size > 0) {
    const bytes = await coverImage.arrayBuffer()
    const buffer = Buffer.from(bytes)
    const ext = coverImage.name.split(".").pop() || "jpg"
    const fileName = `blog-${uuid()}.${ext}`

    const uploaded = await uploadImage(buffer, fileName, "Blog")
    coverImageUrl = uploaded.url ?? null
    coverImageFileId = uploaded.fileId ?? null
  }

  let parsedContent: unknown = null
  if (content) {
    try {
      parsedContent = JSON.parse(content)
    } catch {
      return NextResponse.json(
        { error: "Invalid content JSON" },
        { status: 400 }
      )
    }
  }

  const { data, error } = await auth.supabase
    .from("blogs")
    .insert({
      title,
      slug,
      excerpt: excerpt || null,
      content: parsedContent,
      cover_image_url: coverImageUrl,
      cover_image_file_id: coverImageFileId,
      author: author || "WIMAH",
      category: category || null,
      published,
      sort_order: sortOrder,
    })
    .select()
    .single()

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json(data, { status: 201 })
}
