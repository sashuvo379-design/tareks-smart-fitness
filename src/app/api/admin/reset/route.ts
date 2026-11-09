import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const [deletedOrders, deletedBookings] = await Promise.all([
      prisma.order.deleteMany(),
      prisma.booking.deleteMany(),
    ]);

    return NextResponse.json({
      ok: true,
      message: 'All metrics, orders, and gym bookings have been reset to 0.',
      deletedOrdersCount: deletedOrders.count,
      deletedBookingsCount: deletedBookings.count,
      resetAt: new Date().toISOString(),
    });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    );
  }
}
