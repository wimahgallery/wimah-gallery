import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const MUTATING_METHODS = ["POST", "PATCH", "PUT", "DELETE"]

function isMutatingApi(pathname: string): boolean {
  return (
    pathname.startsWith("/api/blogs") ||
    pathname.startsWith("/api/events") ||
    pathname.startsWith("/api/faqs") ||
    pathname.startsWith("/api/pricing") ||
    pathname.startsWith("/api/testimonials")
  )
}

function verifyOrigin(request: NextRequest): boolean {
  const origin = request.headers.get("origin")
  const host = request.headers.get("host")

  if (!origin || !host) return false

  try {
    const originUrl = new URL(origin)
    return originUrl.host === host
  } catch {
    return false
  }
}

export async function proxy(request: NextRequest) {
  const { method } = request
  const pathname = request.nextUrl.pathname

  // CSRF check for mutating API requests from browser
  if (isMutatingApi(pathname) && MUTATING_METHODS.includes(method)) {
    const contentType = request.headers.get("content-type") || ""
    const isFormSubmit = contentType.includes("multipart/form-data") || contentType.includes("application/x-www-form-urlencoded")

    // Only check Origin for browser-initiated requests (form submissions / fetch with credentials)
    if (isFormSubmit || request.headers.get("sec-fetch-mode") === "cors") {
      if (!verifyOrigin(request)) {
        return NextResponse.json({ error: "Invalid origin" }, { status: 403 })
      }
    }
  }

  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Protect admin pages — require auth (exclude login page)
  if (pathname.startsWith("/admin") && pathname !== "/admin" && pathname !== "/admin/login") {
    if (!user) {
      const url = request.nextUrl.clone()
      url.pathname = "/admin/login"
      return NextResponse.redirect(url)
    }
  }

  // Protect mutating API routes — require auth
  if (isMutatingApi(pathname) && MUTATING_METHODS.includes(method)) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  // Protect auth/me — require auth
  if (pathname.startsWith("/api/auth/me")) {
    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
  }

  return supabaseResponse
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/api/blogs/:path*",
    "/api/events/:path*",
    "/api/faqs/:path*",
    "/api/pricing/:path*",
    "/api/testimonials/:path*",
    "/api/auth/me",
  ],
}
