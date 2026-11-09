import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const BookingSchema = z.object({
  guestName: z.string().min(2),
  guestEmail: z.string().email(),
  guestPhone: z.string().min(6),
  bookingType: z.string().default('FREE_TRIAL'),
  notes: z.string().optional(),
});

export async function GET() {
  try {
    const bookings = await prisma.booking.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
    return NextResponse.json({ bookings });
  } catch (err) {
    return NextResponse.json({ bookings: [], error: String(err) }, { status: 200 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const parsed = BookingSchema.parse(body);

    const booking = await prisma.booking.create({
      data: {
        guestName: parsed.guestName,
        guestEmail: parsed.guestEmail,
        guestPhone: parsed.guestPhone,
        bookingType: parsed.bookingType,
        notes: parsed.notes ?? null,
        status: 'CONFIRMED',
      },
    });

    return NextResponse.json({ ok: true, bookingId: booking.id, booking });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Invalid booking' },
      { status: 400 }
    );
  }
}

export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { id, status } = body;
    if (!id || !status) {
      return NextResponse.json({ ok: false, error: 'Missing id or status' }, { status: 400 });
    }

    const updated = await prisma.booking.update({
      where: { id },
      data: { status },
    });

    return NextResponse.json({ ok: true, booking: updated });
  } catch (err) {
    return NextResponse.json({ ok: false, error: String(err) }, { status: 400 });
  }
}
