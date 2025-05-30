import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  // Get the MODE environment variable
  const mode = process.env.MODE

  console.log("Middleware running - MODE:", mode) // Debug log
  console.log("Current path:", request.nextUrl.pathname) // Debug log

  // Only redirect to blocked page if MODE is explicitly set to "block"
  if (mode === "block") {
    // Don't redirect if already on the blocked page to avoid infinite loop
    if (request.nextUrl.pathname !== "/blocked") {
      console.log("Redirecting to blocked page") // Debug log
      return NextResponse.redirect(new URL("/blocked", request.url))
    }
  }

  // For any other MODE value (including "work" or undefined), allow normal operation
  return NextResponse.next()
}

// Configure which paths the middleware should run on
export const config = {
  // Match all paths except static files
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
}
