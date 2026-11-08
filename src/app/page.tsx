'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { BRAND_CONFIG, I18N_DICTIONARY } from '@/lib/brand';
import {
  SEED_WALLETS,
  SEED_MACHINERY,
  SEED_MEMBERSHIPS,
  SEED_TRAINERS,
} from '@/lib/seed-data';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/store/ProductCard';
import {
  ArrowRight,
  Dumbbell,
  ShieldCheck,
  Award,
  Check,
  Star,
  Flame,
  Sparkles,
  Quote,
} from 'lucide-react';

const Hero3DScene = dynamic(() => import('@/components/three/Hero3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[520px] rounded-2xl border border-white/10 bg-graphite animate-pulse flex items-center justify-center font-mono text-xs text-volt">
      LOADING 3D WEBGL FORGE...
    </div>
  ),
});

const BarLoader3DCalculator = dynamic(
  () => import('@/components/three/BarLoader3DCalculator'),
  { ssr: false }
);

export default function HomePage() {
  const { locale, currency } = useStore();
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const t = I18N_DICTIONARY[locale].hero;

  const featuredWallets = SEED_WALLETS.filter((w) => w.featured).slice(0, 4);
  const featuredMachinery = SEED_MACHINERY.filter((m) => m.featured).slice(0, 4);

  return (
    <div className="space-y-28">
      {/* =====================================================================
          1. 3D HERO & SCROLL-DRIVEN STORYTELLING STAGE
         ===================================================================== */}
      <section className="relative pt-8 lg:pt-14 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-graphite border border-volt/30">
                <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
                <span className="font-mono text-xs text-volt tracking-widest uppercase">
                  {t.badge}
                </span>
              </div>

              <h1 className="font-display text-6xl sm:text-7xl lg:text-8xl tracking-tight text-bone leading-[0.94]">
                FORGE <span className="text-volt">STRENGTH.</span>
                <br />
                CARRY <span className="text-gold">LEGACY.</span>
              </h1>

              <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                An uncompromising ecosystem uniting a 24/7 commercial strength sanctuary, handcrafted full-grain Tuscan leather wallets, and 11-gauge architectural gym machinery.
              </p>

              <div className="flex flex-wrap gap-3.5 pt-2">
                <Link
                  href="/gym"
                  className="px-6 py-4 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm flex items-center gap-2 shadow-volt hover:brightness-110 transition"
                >
                  {t.ctaGym} <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  href="/wallets"
                  className="px-6 py-4 rounded-xl bg-graphite hover:bg-elevated border border-gold/50 text-gold font-mono font-bold text-sm flex items-center gap-2 transition"
                >
                  {t.ctaWallets}
                </Link>
                <Link
                  href="/machinery"
                  className="px-6 py-4 rounded-xl bg-graphite hover:bg-elevated border border-ember/50 text-ember font-mono font-bold text-sm flex items-center gap-2 transition"
                >
                  {t.ctaMachinery}
                </Link>
              </div>

              {/* Mini Pillar Scroll Guide */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10">
                <div>
                  <span className="font-mono text-xs text-volt block">PILLAR 01</span>
                  <span className="font-display text-xl text-bone">24/7 GYM ARENA</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-gold block">PILLAR 02</span>
                  <span className="font-display text-xl text-bone">FULL-GRAIN WALLETS</span>
                </div>
                <div>
                  <span className="font-mono text-xs text-ember block">PILLAR 03</span>
                  <span className="font-display text-xl text-bone">PRO MACHINERY</span>
                </div>
              </div>
            </div>

            {/* Right Interactive R3F 3D Stage */}
            <div className="lg:col-span-6">
              <Hero3DScene />
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. LIVE TELEMETRY STATS COUNTER BAR
         ===================================================================== */}
      <section className="border-y border-white/10 bg-graphite/60 py-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <p className="font-mono text-4xl sm:text-5xl font-bold text-volt">210K PSI</p>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mt-1">
              Calibrated Power Bar Steel
            </p>
          </div>
          <div>
            <p className="font-mono text-4xl sm:text-5xl font-bold text-gold">100%</p>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mt-1">
              Vegetable-Tanned Full-Grain Hide
            </p>
          </div>
          <div>
            <p className="font-mono text-4xl sm:text-5xl font-bold text-ember">11-GAUGE</p>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mt-1">
              3x3&quot; Laser-Cut Rack Structural Steel
            </p>
          </div>
          <div>
            <p className="font-mono text-4xl sm:text-5xl font-bold text-bone">1,250+</p>
            <p className="font-mono text-xs text-muted uppercase tracking-widest mt-1">
              Active Athletes &amp; Club Installations
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. THREE-PILLAR ARCHITECTURAL SPLIT
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <div>
            <span className="font-mono text-xs text-volt uppercase tracking-widest">
              {BRAND_CONFIG.name.toUpperCase()}
            </span>
            <h2 className="font-display text-5xl text-bone mt-1">
              THREE PILLARS OF UNCOMPROMISING CRAFT
            </h2>
          </div>
          <p className="text-sm text-muted max-w-md mt-2 md:mt-0">
            Scroll or select any division below. Every product and training zone is inspectable in real-time 3D WebGL.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Pillar 1: Gym */}
          <div className="rounded-3xl bg-graphite border border-volt/30 p-8 flex flex-col justify-between hover:shadow-volt transition group">
            <div>
              <span className="px-3 py-1 rounded-full bg-volt/15 text-volt font-mono text-xs">
                {BRAND_CONFIG.pillars.gym.badge}
              </span>
              <h3 className="font-display text-4xl text-bone mt-4">
                {BRAND_CONFIG.pillars.gym.title}
              </h3>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                Equipped with competition power racks, Brahmanbaria &amp; Austin’s flagship Ascent StairMaster arena, 30m sprint turf, and contrast hydro-recovery.
              </p>
              <ul className="space-y-2 mt-6 text-xs font-mono text-bone">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-volt" /> Interactive 3D Gym Floor Walkthrough</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-volt" /> Filterable Weekly Class Timetable</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-volt" /> Instant QR Code Member Pass</li>
              </ul>
            </div>
            <Link
              href="/gym"
              className="mt-8 w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-2 group-hover:brightness-110 transition"
            >
              ENTER GYM SANCTUARY <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 2: Wallets */}
          <div className="rounded-3xl bg-graphite border border-gold/30 p-8 flex flex-col justify-between hover:shadow-gold transition group">
            <div>
              <span className="px-3 py-1 rounded-full bg-gold/15 text-gold font-mono text-xs">
                {BRAND_CONFIG.pillars.wallets.badge}
              </span>
              <h3 className="font-display text-4xl text-bone mt-4">
                {BRAND_CONFIG.pillars.wallets.title}
              </h3>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                24 signature silhouettes across Bifold, Slim, Cardholder, Travel, and Faraday RFID-safe collections—with live 3D monogram engraving.
              </p>
              <ul className="space-y-2 mt-6 text-xs font-mono text-bone">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> 360° 3D Leather &amp; Stitch Viewer</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> Live Gold-Foil Monogram Preview</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-gold" /> 13.56 MHz Faraday RFID Protection</li>
              </ul>
            </div>
            <Link
              href="/wallets"
              className="mt-8 w-full py-3.5 rounded-xl bg-gold text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-2 group-hover:brightness-110 transition"
            >
              EXPLORE 24 WALLETS <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Pillar 3: Machinery */}
          <div className="rounded-3xl bg-graphite border border-ember/30 p-8 flex flex-col justify-between hover:shadow-ember transition group">
            <div>
              <span className="px-3 py-1 rounded-full bg-ember/15 text-ember font-mono text-xs">
                {BRAND_CONFIG.pillars.machinery.badge}
              </span>
              <h3 className="font-display text-4xl text-bone mt-4">
                {BRAND_CONFIG.pillars.machinery.title}
              </h3>
              <p className="text-sm text-muted mt-3 leading-relaxed">
                16 commercial &amp; garage gym machines including 11-gauge power cages, vulcanized slat treadmills, dual cable stacks, and turnkey bundles.
              </p>
              <ul className="space-y-2 mt-6 text-xs font-mono text-bone">
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ember" /> 3D Dimension Overlay &amp; AR Preview</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ember" /> Side-by-Side 3-Machine Comparison</li>
                <li className="flex items-center gap-2"><Check className="w-4 h-4 text-ember" /> 0% APR Commercial EMI &amp; Bulk Quotes</li>
              </ul>
            </div>
            <Link
              href="/machinery"
              className="mt-8 w-full py-3.5 rounded-xl bg-ember text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-2 group-hover:brightness-110 transition"
            >
              BROWSE 16 MACHINES <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. FEATURED HERITAGE LEATHER WALLETS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-gold uppercase tracking-widest">
              HANDCRAFTED DAILY CARRY
            </span>
            <h2 className="font-display text-5xl text-bone mt-1">
              SIGNATURE FULL-GRAIN WALLETS
            </h2>
          </div>
          <Link
            href="/wallets"
            className="px-5 py-2.5 rounded-xl bg-graphite border border-gold/40 text-gold font-mono text-xs font-bold flex items-center gap-2 hover:bg-gold hover:text-obsidian transition"
          >
            View All 24 Wallets <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredWallets.map((w) => (
            <ProductCard key={w.slug} product={w} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          5. FEATURED COMMERCIAL GYM MACHINERY
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-ember uppercase tracking-widest">
              HEAVY-GAUGE ENGINEERING
            </span>
            <h2 className="font-display text-5xl text-bone mt-1">
              FLAGSHIP STRENGTH &amp; CARDIO MACHINES
            </h2>
          </div>
          <Link
            href="/machinery"
            className="px-5 py-2.5 rounded-xl bg-graphite border border-ember/40 text-ember font-mono text-xs font-bold flex items-center gap-2 hover:bg-ember hover:text-obsidian transition"
          >
            View All 16 Machines <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredMachinery.map((m) => (
            <ProductCard key={m.slug} product={m} />
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. INTERACTIVE 3D 1-REP-MAX BAR LOADER & BMI CALCULATOR
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BarLoader3DCalculator />
      </section>

      {/* =====================================================================
          6B. AI WORKOUT PLAN GENERATOR SHOWCASE
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-graphite via-obsidian to-graphite border border-volt/40 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-volt/10 blur-[100px] pointer-events-none rounded-full" />
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/15 border border-volt/30 text-volt font-mono text-xs uppercase tracking-widest">
                <Sparkles className="w-3.5 h-3.5" />
                <span>ALGORITHMIC COACHING SUITE</span>
              </div>
              <h2 className="font-display text-4xl sm:text-5xl text-bone leading-tight">
                GENERATE YOUR CUSTOM <span className="text-volt">WORKOUT PROTOCOL</span>
              </h2>
              <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
                Powered by 15 years of master coaching experience from Trainer Tarek. Select your goal (Hypertrophy, Fat Loss, Powerlifting), training frequency, and get instant sets, reps, rest timers, and StairMaster intervals.
              </p>
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  href="/workout-generator"
                  className="px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center gap-2 shadow-volt hover:brightness-110 transition"
                >
                  <Sparkles className="w-4 h-4" />
                  LAUNCH WORKOUT GENERATOR
                </Link>
                <Link
                  href="/gym#workout-generator"
                  className="px-6 py-3.5 rounded-xl bg-obsidian border border-white/15 text-bone font-mono text-xs hover:border-volt transition"
                >
                  VIEW GYM ARMORY &amp; PROTOCOLS
                </Link>
              </div>
            </div>

            <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
              <div className="p-4 rounded-2xl bg-obsidian/80 border border-white/10">
                <span className="font-mono text-xs text-volt block mb-1">01 // SPLITS</span>
                <p className="font-display text-xl text-bone">3 TO 6 DAYS</p>
                <p className="text-[11px] text-muted mt-1">Full Body, Upper/Lower, or PPL periodization</p>
              </div>
              <div className="p-4 rounded-2xl bg-obsidian/80 border border-white/10">
                <span className="font-mono text-xs text-gold block mb-1">02 // NUTRITION</span>
                <p className="font-display text-xl text-bone">MACRO TARGETS</p>
                <p className="text-[11px] text-muted mt-1">Custom protein grams &amp; pre/post workout fuel</p>
              </div>
              <div className="p-4 rounded-2xl bg-obsidian/80 border border-white/10">
                <span className="font-mono text-xs text-cyan-400 block mb-1">03 // UTILITY</span>
                <p className="font-display text-xl text-bone">REST TIMERS</p>
                <p className="text-[11px] text-muted mt-1">Interactive 60s/90s/120s set rest stopwatch</p>
              </div>
              <div className="p-4 rounded-2xl bg-obsidian/80 border border-white/10">
                <span className="font-mono text-xs text-ember block mb-1">04 // 1-ON-1</span>
                <p className="font-display text-xl text-bone">WHATSAPP REVIEW</p>
                <p className="text-[11px] text-muted mt-1">Direct feedback from Coach Tarek</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          7. MEMBERSHIP PLANS (ONE-TIME ADMISSION + MONTHLY PRICING)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <span className="font-mono text-xs text-volt uppercase tracking-widest">
            TRANSPARENT GYM PRICING // TAREK&apos;S SMART FITNESS
          </span>
          <h2 className="font-display text-5xl text-bone mt-1">
            CHOOSE YOUR TRAINING TIER
          </h2>
          <div className="mt-4 p-4 rounded-2xl bg-graphite border border-volt/30 inline-block">
            <p className="font-mono text-xs sm:text-sm text-bone">
              <span className="text-volt font-bold">Admission Fee (One-Time): 2,450 BDT</span>
              <span className="text-muted mx-2">•</span>
              <span className="text-gold">Monthly membership starts from only 830 BDT/month</span>
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {SEED_MEMBERSHIPS.map((plan) => {
            return (
              <div
                key={plan.slug}
                className={`rounded-3xl p-8 flex flex-col justify-between border transition ${
                  plan.popular
                    ? 'bg-gradient-to-b from-graphite to-obsidian border-volt shadow-volt scale-[1.02]'
                    : 'bg-graphite/80 border-white/10'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-volt uppercase tracking-widest">
                      TIER // {plan.tier}
                    </span>
                    {plan.popular && (
                      <span className="px-3 py-1 rounded-full bg-volt text-obsidian font-mono font-bold text-[10px]">
                        MOST POPULAR
                      </span>
                    )}
                  </div>
                  <h3 className="font-display text-3xl text-bone mt-2">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-4xl sm:text-5xl font-bold text-bone">
                      ৳{plan.monthlyBdt.toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-muted uppercase">
                      / month
                    </span>
                  </div>
                  <p className="font-mono text-xs text-gold mt-1">
                    + ৳{plan.admissionFeeBdt.toLocaleString()} One-time admission fee
                  </p>

                  <ul className="space-y-3 mt-6 text-sm text-bone">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-volt shrink-0 mt-1" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={`/gym?plan=${plan.slug}#trial`}
                  className={`mt-8 w-full py-3.5 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition ${
                    plan.popular
                      ? 'bg-volt text-obsidian shadow-volt hover:brightness-110'
                      : 'bg-obsidian border border-white/15 text-bone hover:border-volt'
                  }`}
                >
                  ACTIVATE {plan.name} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          8. ELITE COACHES & ATHLETE TRANSFORMATIONS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-volt uppercase tracking-widest">
              HUMAN PERFORMANCE ARCHITECTS
            </span>
            <h2 className="font-display text-5xl text-bone mt-1">
              MEET OUR MASTER COACHES
            </h2>
          </div>
          <Link
            href="/gym#trainers"
            className="px-5 py-2.5 rounded-xl bg-graphite border border-white/15 text-bone font-mono text-xs hover:border-volt"
          >
            View Coaching Team
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SEED_TRAINERS.map((trainer) => (
            <div
              key={trainer.slug}
              className="rounded-2xl bg-graphite border border-white/10 overflow-hidden group hover:border-volt/50 transition"
            >
              <img
                src={trainer.avatar}
                alt={trainer.name}
                style={{
                  objectPosition: trainer.slug === 'tarek' ? '72% 15%' : '50% 12%',
                }}
                className="w-full h-80 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="p-6">
                <span className="font-mono text-xs text-volt">{trainer.experience}</span>
                <h3 className="font-display text-3xl text-bone mt-1">{trainer.name}</h3>
                <p className="text-xs font-mono text-gold">{trainer.role}</p>
                <p className="text-sm text-muted mt-3 line-clamp-2">{trainer.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
