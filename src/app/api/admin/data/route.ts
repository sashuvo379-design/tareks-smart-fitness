import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const [orders, bookings] = await Promise.all([
      prisma.order.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
      prisma.booking.findMany({
        orderBy: { createdAt: 'desc' },
        take: 50,
      }),
    ]);

    const totalOrders = orders.length;
    const totalRevenue = orders.reduce((acc, o) => acc + (o.total || 0), 0);
    const totalBookings = bookings.length;

    // Revenue by payment method
    const revenueByMethod: Record<string, number> = {
      BKASH: 0,
      SSLCOMMERZ: 0,
      STRIPE: 0,
      COD: 0,
    };

    // Revenue by pillar
    const revenueByPillar = {
      MACHINERY: 0,
      WALLET: 0,
    };

    orders.forEach((o) => {
      const method = o.paymentMethod || 'COD';
      revenueByMethod[method] = (revenueByMethod[method] || 0) + o.total;

      // Infer pillar from items if possible
      try {
        const items = JSON.parse(o.items || '[]');
        items.forEach((item: { sku?: string; price?: number; qty?: number }) => {
          const itemTotal = (item.price || 0) * (item.qty || 1);
          if (item.sku && item.sku.includes('MCH')) {
            revenueByPillar.MACHINERY += itemTotal;
          } else {
            revenueByPillar.WALLET += itemTotal;
          }
        });
      } catch {
        // fallback
        revenueByPillar.WALLET += o.total;
      }
    });

    // 24h metrics
    const oneDayAgo = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const todayOrders = orders.filter((o) => new Date(o.createdAt) >= oneDayAgo);
    const todayRevenue = todayOrders.reduce((acc, o) => acc + o.total, 0);

    return NextResponse.json({
      ok: true,
      serverTime: new Date().toISOString(),
      stats: {
        totalRevenue,
        totalOrders,
        totalBookings,
        todayOrders: todayOrders.length,
        todayRevenue,
        revenueByMethod,
        revenueByPillar,
      },
      orders,
      bookings,
    });
  } catch (err) {
    return NextResponse.json(
      {
        ok: false,
        error: String(err),
        stats: {
          totalRevenue: 0,
          totalOrders: 0,
          totalBookings: 0,
          todayOrders: 0,
          todayRevenue: 0,
          revenueByMethod: {},
          revenueByPillar: { MACHINERY: 0, WALLET: 0 },
        },
        orders: [],
        bookings: [],
      },
      { status: 200 }
    );
  }
}
