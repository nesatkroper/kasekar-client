import { NextResponse } from "next/server"
import { NextRequest } from "next/server"


export async function middleware(request: NextRequest) {
  try {
    const mode = process.env.MODE || "active"
    console.log(`[Middleware] MODE=${mode}, Path=${request.nextUrl.pathname}`)

    const apiUrl = new URL('/api/system', request.nextUrl.origin);
    const systemResponse = await fetch(apiUrl, {
      headers: { 'Content-Type': 'application/json' },
    });

    if (!systemResponse.ok) {
      const errorData = await systemResponse.json();
      console.error('API Error:', errorData);
      throw new Error(errorData.error || 'Failed to fetch system data');
    }

    const systemData = await systemResponse.json();
    console.log(systemData)

    if (systemData?.status.toLowerCase() === "inactive") {
      if (!request.nextUrl.pathname.startsWith("/blocked")) {
        console.log(`[Middleware] Redirecting to blocked page`)
        return NextResponse.redirect(new URL("/blocked", request.url))
      }
    }
    else if (systemData?.status.toLowerCase() === "active") {
      if (request.nextUrl.pathname.startsWith("/blocked")) {
        console.log(`[Middleware] Redirecting to home page`)
        return NextResponse.redirect(new URL("/", request.url))
      }
    }


    return NextResponse.next()
  } catch (error) {
    console.error("[Middleware] Error:", error)
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    )

  }

}

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
