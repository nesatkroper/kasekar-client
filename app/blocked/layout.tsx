import type React from "react"
import { Inter } from "next/font/google"
import "../globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "Website Temporarily Unavailable",
  description: "This website is currently taking a break. Please contact the developer for assistance.",
}

export default function BlockedLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
