import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function block(request: NextRequest) {
    const mode = process.env.MODE

    if (mode === "block") {
        if (!request.nextUrl.pathname.startsWith("/blocked")) {
            return NextResponse.redirect(new URL("/blocked", request.url))
        }
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        "/((?!_next/static|_next/image|favicon.ico).*)",
    ],
}
