import { NextResponse } from "next/server"

export async function GET() {
  return NextResponse.json({
    mode: process.env.MODE || "Not set",
    nodeEnv: process.env.NODE_ENV || "Not set",
    timestamp: new Date().toISOString(),
  })
}
