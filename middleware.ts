import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the MODE environment variable - be more defensive with the check
  const mode = process.env.MODE || "work"

  // Debug information (will appear in server logs)
  console.log(`[Middleware] MODE=${mode}, Path=${request.nextUrl.pathname}`)

  // Force lowercase comparison to avoid case sensitivity issues
  if (mode.toLowerCase() === "block") {
    // Don't redirect if already on the blocked page
    if (!request.nextUrl.pathname.startsWith("/blocked")) {
      console.log(`[Middleware] Redirecting to blocked page`)
      return NextResponse.redirect(new URL("/blocked", request.url))
    }
  }

  // For any other MODE value, allow normal operation
  return NextResponse.next()
}

// Match all paths except static files and API routes
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - api (API routes)
     */
    "/((?!_next/static|_next/image|favicon.ico|api).*)",
  ],
}
