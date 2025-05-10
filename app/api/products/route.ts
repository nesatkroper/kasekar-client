import prisma from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await prisma.$queryRaw`SELECT 1`;

    const products = await prisma.product.findMany({
      where: {
        status: "active",
      },
      include: {
        category: true,
        stocks: true,
      },
      orderBy: {
        productName: "asc",
      },
    });

    return NextResponse.json(products);
  } catch (error) {
    console.error("Database error details:", error);

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
      { error: "Failed to fetch products" },
      { status: 500 }
    );
  }
}
