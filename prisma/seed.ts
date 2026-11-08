import { PrismaClient } from '@prisma/client';
import {
  SEED_WALLETS,
  SEED_MACHINERY,
  SEED_TRAINERS,
  SEED_CLASSES,
  SEED_MEMBERSHIPS,
  SEED_BLOG_POSTS,
  SEED_COUPONS,
} from '../src/lib/seed-data';

const prisma = new PrismaClient();

async function main() {
  console.log('🔨 Seeding IRONFORGE Database...');

  // Clear existing data cleanly
  await prisma.workoutLog.deleteMany();
  await prisma.booking.deleteMany();
  await prisma.order.deleteMany();
  await prisma.membership.deleteMany();
  await prisma.product.deleteMany();
  await prisma.trainer.deleteMany();
  await prisma.gymClass.deleteMany();
  await prisma.membershipPlan.deleteMany();
  await prisma.blogPost.deleteMany();
  await prisma.coupon.deleteMany();
  await prisma.user.deleteMany();

  // 1. Seed Users (Admin + Demo Athlete Member)
  const admin = await prisma.user.create({
    data: {
      name: 'Commander Marcus (Admin)',
      email: 'admin@ironforge.gg',
      passwordHash: 'hashed:ironforge-admin-2026',
      role: 'ADMIN',
    },
  });

  const member = await prisma.user.create({
    data: {
      name: 'Alex Mercer',
      email: 'athlete@ironforge.gg',
      passwordHash: 'hashed:ironforge-member-2026',
      role: 'MEMBER',
      membership: {
        create: {
          planName: 'CARDIO & STAIRMASTER PLUS',
          tier: 'STAIR PLUS',
          billingCycle: 'MONTHLY',
          status: 'ACTIVE',
          qrCodeToken: 'TAREK-PASS-2026-AX9940',
          renewsAt: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        },
      },
      workoutLogs: {
        create: [
          { exercise: 'Competition Back Squat', sets: 4, reps: 5, weightKg: 165, oneRepMax: 186 },
          { exercise: 'Paused Barbell Bench Press', sets: 4, reps: 6, weightKg: 120, oneRepMax: 140 },
          { exercise: 'Conventional Deadlift', sets: 3, reps: 3, weightKg: 210, oneRepMax: 224 },
          { exercise: 'Strict Overhead Press', sets: 4, reps: 8, weightKg: 72.5, oneRepMax: 90 },
        ],
      },
    },
  });

  // 2. Seed 24 Wallets + 16 Machinery Products (40 total)
  const allProducts = [...SEED_WALLETS, ...SEED_MACHINERY];
  for (const p of allProducts) {
    await prisma.product.create({
      data: {
        slug: p.slug,
        name: p.name,
        pillar: p.pillar,
        category: p.category,
        price: p.price,
        compareAtPrice: p.compareAtPrice ?? null,
        rating: p.rating,
        reviewCount: p.reviewCount,
        stock: p.stock,
        sku: p.sku,
        shortDesc: p.shortDesc,
        description: p.description,
        image: p.image,
        gallery: JSON.stringify(p.gallery),
        colors: JSON.stringify(p.colors),
        materials: JSON.stringify(p.materials),
        specs: JSON.stringify(p.specs),
        model3dType: p.model3dType,
        featured: p.featured,
        allowEngraving: p.allowEngraving,
      },
    });
  }

  // 3. Seed 6 Trainers
  for (const t of SEED_TRAINERS) {
    await prisma.trainer.create({
      data: {
        slug: t.slug,
        name: t.name,
        role: t.role,
        specialty: t.specialty,
        experience: t.experience,
        bio: t.bio,
        avatar: t.avatar,
        certifications: JSON.stringify(t.certifications),
        rating: t.rating,
      },
    });
  }

  // 4. Seed 12 Classes
  for (const c of SEED_CLASSES) {
    await prisma.gymClass.create({
      data: c,
    });
  }

  // 5. Seed 3 Membership Plans
  for (const m of SEED_MEMBERSHIPS) {
    await prisma.membershipPlan.create({
      data: {
        slug: m.slug,
        name: m.name,
        tier: m.tier,
        monthlyPrice: m.monthlyPrice,
        quarterlyPrice: m.quarterlyPrice,
        yearlyPrice: m.yearlyPrice,
        popular: m.popular,
        features: JSON.stringify(m.features),
      },
    });
  }

  // 6. Seed 6 Blog Posts
  for (const b of SEED_BLOG_POSTS) {
    await prisma.blogPost.create({
      data: b,
    });
  }

  // 7. Seed Coupons
  for (const cp of SEED_COUPONS) {
    await prisma.coupon.create({
      data: cp,
    });
  }

  // 8. Seed Demo Orders for Analytics & Account Dashboard
  await prisma.order.createMany({
    data: [
      {
        orderNumber: 'IF-ORD-90412',
        userId: member.id,
        customerName: 'Alex Mercer',
        customerEmail: 'athlete@ironforge.gg',
        customerPhone: '+1 (555) 234-5678',
        shippingAddress: '742 Evergreen Industrial Blvd',
        city: 'Austin, TX',
        country: 'United States',
        items: JSON.stringify([
          { name: 'Apex Heritage Bifold', sku: 'IF-WLT-001', qty: 1, price: 95, engraving: 'A.M. // VII', giftWrap: true },
          { name: 'Titan B-800 Zero-Gap Adjustable FID Bench', sku: 'IF-MCH-005', qty: 1, price: 680 },
        ]),
        subtotal: 775,
        discount: 0,
        shippingCost: 0,
        total: 775,
        paymentMethod: 'STRIPE',
        paymentStatus: 'PAID',
        orderStatus: 'DELIVERED',
      },
      {
        orderNumber: 'IF-ORD-90488',
        userId: admin.id,
        customerName: 'Apex Strength Club',
        customerEmail: 'procurement@apexclub.io',
        customerPhone: '+880 1714-712585',
        shippingAddress: 'Boarding Field Commercial Zone',
        city: 'Brahmanbaria',
        country: 'Bangladesh',
        items: JSON.stringify([
          { name: 'Colossus PR-9000 Commercial Power Rack', sku: 'IF-MCH-001', qty: 2, price: 2450 },
          { name: 'Ascent Pro X1 Commercial Stair Climber', sku: 'IF-MCH-004', qty: 1, price: 3490 },
        ]),
        subtotal: 8390,
        discount: 839,
        shippingCost: 150,
        total: 7701,
        paymentMethod: 'BKASH',
        paymentStatus: 'PAID',
        orderStatus: 'PROCESSING',
        couponCode: 'IRON10',
      },
    ],
  });

  console.log(
    `✅ Seed complete: ${SEED_WALLETS.length} Wallets, ${SEED_MACHINERY.length} Machines, ${SEED_TRAINERS.length} Trainers, ${SEED_CLASSES.length} Classes, ${SEED_BLOG_POSTS.length} Blog Posts.`
  );
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
