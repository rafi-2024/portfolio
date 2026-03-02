import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const packages = await prisma.servicePackage.findMany({
      include: {
        features: {
          orderBy: {
            order: 'asc',
          },
        },
      },
      orderBy: {
        order: 'asc',
      },
    });

    return NextResponse.json(packages);
  } catch (error) {
    console.error('Error fetching service packages:', error);
    return NextResponse.json([]);
  }
}
