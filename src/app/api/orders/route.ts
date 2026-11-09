import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const OrderSchema = z.object({
  customerName: z.string().min(2),
  customerEmail: z.string().email(),
  customerPhone: z.string().min(6),
  shippingAddress: z.string().min(3),
  city: z.string().min(2),
  country: z.string().min(2),
  items: z.array(z.any()),
  subtotal: z.number(),
  discount: z.number().default(0),
  shippingCost: z.number().default(0),
  total: z.number(),
  paymentMethod: z.enum(['STRIPE', 'BKASH', 'SSLCOMMERZ', 'COD']),
  couponCode: z.string().nullable().optional(),
});

export async function GET() {
  try {
    const orders = await prisma.order.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ orders });
  } catch (err) {
    return NextResponse.json({ orders: [], error: String(err) }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = OrderSchema.parse(body);
    const orderNumber = `IF-ORD-${Math.floor(10000 + Math.random() * 90000)}`;

    const created = await prisma.order.create({
      data: {
        orderNumber,
        customerName: parsed.customerName,
        customerEmail: parsed.customerEmail,
        customerPhone: parsed.customerPhone,
        shippingAddress: parsed.shippingAddress,
        city: parsed.city,
        country: parsed.country,
        items: JSON.stringify(parsed.items),
        subtotal: parsed.subtotal,
        discount: parsed.discount,
        shippingCost: parsed.shippingCost,
        total: parsed.total,
        paymentMethod: parsed.paymentMethod,
        paymentStatus: parsed.paymentMethod === 'COD' ? 'PENDING_COD' : 'PAID',
        orderStatus: 'PROCESSING',
        couponCode: parsed.couponCode ?? null,
      },
    });

    return NextResponse.json({ ok: true, orderNumber: created.orderNumber, order: created });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Invalid order payload' },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { orderNumber, orderStatus, paymentStatus } = body;
    if (!orderNumber) {
      return NextResponse.json({ ok: false, error: 'Missing orderNumber' }, { status: 400 });
    }

    const updated = await prisma.order.update({
      where: { orderNumber },
      data: {
        ...(orderStatus ? { orderStatus } : {}),
        ...(paymentStatus ? { paymentStatus } : {}),
      },
    });

    return NextResponse.json({ ok: true, order: updated });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 400 });
  }
}
