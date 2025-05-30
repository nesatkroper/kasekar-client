// app/api/system/route.ts
import prisma from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const system = await prisma.system.findFirst();

    if (!system) {
      return NextResponse.json(
        { error: "System configuration not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(system);
  } catch (error) {
    console.error('API Route Error:', error);
    return NextResponse.json(
      {
        error: "Failed to fetch system data",
        details: error instanceof Error ? error.message : String(error)
      },
      { status: 500 }
    );
  }
}
// In your API route
export const dynamic = 'force-dynamic'; // Ensure fresh data

// // app/api/system/route.ts
// import prisma from '@/lib/prisma'
// import { NextResponse } from 'next/server'

// export async function GET() {
//   try {
//     const system = await prisma.system.findFirst()
//     console.log(system)
//     return NextResponse.json(system)
//   } catch (error) {
//     return NextResponse.json(
//       { error: 'Failed to fetch system data' },
//       { status: 500 }
//     )
//   }
// }