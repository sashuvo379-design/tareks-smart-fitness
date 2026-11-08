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
      },
    });

    return NextResponse.json({ ok: true, bookingId: booking.id });
  } catch (err) {
    return NextResponse.json(
      { ok: false, error: err instanceof Error ? err.message : 'Invalid booking' },
      { status: 400 }
    );
  }
}
