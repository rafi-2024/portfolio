import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    if (!prisma) {
      console.warn('Prisma client not available, returning empty array');
      return NextResponse.json([]);
    }

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
