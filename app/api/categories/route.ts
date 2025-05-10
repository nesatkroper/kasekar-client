import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const categories = await prisma.category.findMany({
      where: {
        status: "active",
      },
      orderBy: {
        categoryName: "asc",
      },
    });

    return NextResponse.json(categories);
  } catch (error) {
    console.error("Database error:", error);
    if (error instanceof Error) {
      return NextResponse.json(
        {
          error: "Failed to fetch products",
          message: error.message,
        },
        { status: 500 }
      );
    }
    return NextResponse.json(
      { error: "Failed to fetch categories" },
      { status: 500 }
    );
  }
}
