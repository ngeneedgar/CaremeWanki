import { NextResponse } from 'next/server';
import { listings, Listing } from '@/lib/listings-data';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json({
    success: true,
    count: listings.length,
    listings,
  });
}
