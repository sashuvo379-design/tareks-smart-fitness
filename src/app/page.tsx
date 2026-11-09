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
import ProductCard from '@/components/store/ProductCard';
import {
  ArrowRight,
  Dumbbell,
  Check,
  Flame,
  Sparkles,
  MapPin,
  Phone,
  Clock,
  MessageCircle,
  ShieldCheck,
  Award,
  Zap,
  Calendar,
  Layers,
  ShoppingBag,
  ExternalLink,
} from 'lucide-react';

const Hero3DScene = dynamic(() => import('@/components/three/Hero3DScene'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[460px] rounded-2xl border border-white/10 bg-graphite/60 animate-pulse flex flex-col items-center justify-center gap-2 font-mono text-xs text-volt">
      <Dumbbell className="w-6 h-6 animate-spin text-volt" />
      <span>LOADING 3D GYM STAGE...</span>
    </div>
  ),
});

const BarLoader3DCalculator = dynamic(
  () => import('@/components/three/BarLoader3DCalculator'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[420px] rounded-2xl border border-white/10 bg-graphite/40 animate-pulse flex items-center justify-center font-mono text-xs text-volt">
        LOADING 3D BARBELL CALCULATOR...
      </div>
    ),
  }
);

export default function HomePage() {
  const { locale } = useStore();
  const [storeTab, setStoreTab] = useState<'machinery' | 'wallets'>('machinery');
  const [activeToolTab, setActiveToolTab] = useState<'plan' | 'calculator'>('plan');

  const featuredWallets = SEED_WALLETS.filter((w) => w.featured).slice(0, 4);
  const featuredMachinery = SEED_MACHINERY.filter((m) => m.featured).slice(0, 4);

  return (
    <div className="space-y-24 sm:space-y-32 pb-16">
      {/* =====================================================================
          1. CLEAN & IMPACTFUL HERO SECTION
         ===================================================================== */}
      <section className="relative pt-6 sm:pt-10 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-graphite border border-volt/30">
                <span className="w-2 h-2 rounded-full bg-volt animate-ping" />
                <span className="font-mono text-xs text-volt tracking-widest uppercase">
                  BOARDING FIELD, BRAHMANBARIA
                </span>
              </div>

              <h1 className="font-display text-5xl sm:text-6xl lg:text-7xl tracking-tight text-bone leading-[0.96]">
                FORGE STRENGTH. <br />
                <span className="text-volt">LIVE HEALTHIER.</span>
              </h1>

              <p className="text-base sm:text-lg text-muted max-w-xl leading-relaxed">
                Welcome to <strong>Tarek&apos;s Smart Fitness Gym</strong>. Train directly with{' '}
                <strong>Head Coach Tarek (15 Years Experience)</strong>, experience our flagship{' '}
                <strong>Ascent StairMaster arena</strong>, and access personalized workout programs.
              </p>

              {/* Primary Action Buttons */}
              <div className="flex flex-wrap items-center gap-3 pt-1">
                <Link
                  href="/gym#trial"
                  className="px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm flex items-center gap-2 shadow-volt hover:brightness-110 transition"
                >
                  <Flame className="w-4 h-4" />
                  CLAIM 3-DAY FREE TRIAL
                </Link>
                <Link
                  href="/workout-generator"
                  className="px-6 py-3.5 rounded-xl bg-graphite hover:bg-elevated border border-volt/40 text-bone hover:text-volt font-mono font-bold text-sm flex items-center gap-2 transition"
                >
                  <Sparkles className="w-4 h-4 text-volt" />
                  WORKOUT GENERATOR
                </Link>
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                    'Assalamu Alaikum Coach Tarek, I want to know about gym admission and membership.'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-3.5 rounded-xl bg-obsidian border border-emerald-500/40 text-emerald-400 font-mono text-xs flex items-center gap-1.5 hover:bg-emerald-500/10 transition"
                >
                  <MessageCircle className="w-4 h-4" />
                  01782-226189
                </a>
              </div>

              {/* Quick Trust Highlights */}
              <div className="grid grid-cols-3 gap-3 pt-4 border-t border-white/10 text-xs font-mono">
                <div>
                  <span className="text-volt font-bold block text-sm">৳2,450</span>
                  <span className="text-muted">Admission Fee</span>
                </div>
                <div>
                  <span className="text-volt font-bold block text-sm">From ৳830</span>
                  <span className="text-muted">Monthly Membership</span>
                </div>
                <div>
                  <span className="text-volt font-bold block text-sm">15+ Years</span>
                  <span className="text-muted">Trainer Experience</span>
                </div>
              </div>
            </div>

            {/* Right 3D Visual Stage */}
            <div className="lg:col-span-6">
              <div className="rounded-3xl border border-white/10 bg-graphite/40 overflow-hidden shadow-2xl p-2 sm:p-4">
                <Hero3DScene />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. KEY HIGHLIGHTS STRIP
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-5 rounded-2xl bg-graphite/80 border border-white/10 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-volt/15 text-volt shrink-0">
              <Award className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-base text-bone">15+ Yrs Master Coaching</h4>
              <p className="text-xs text-muted mt-0.5">Head Coach Tarek provides direct form oversight.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-graphite/80 border border-white/10 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-volt/15 text-volt shrink-0">
              <Zap className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-base text-bone">Ascent StairMaster</h4>
              <p className="text-xs text-muted mt-0.5">Flagship fat-loss and HIIT conditioning arena.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-graphite/80 border border-white/10 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-volt/15 text-volt shrink-0">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-base text-bone">Transparent Pricing</h4>
              <p className="text-xs text-muted mt-0.5">৳2,450 admission + from ৳830/month standard.</p>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-graphite/80 border border-white/10 flex items-start gap-3.5">
            <div className="p-2.5 rounded-xl bg-volt/15 text-volt shrink-0">
              <MapPin className="w-5 h-5" />
            </div>
            <div>
              <h4 className="font-display text-base text-bone">Boarding Field, B.Baria</h4>
              <p className="text-xs text-muted mt-0.5">Open daily 07:00 AM – 11:00 PM for all athletes.</p>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. OUR THREE CORE DIVISIONS (CLEAN & CLEAR)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="font-mono text-xs text-volt uppercase tracking-widest">
            FACILITIES &amp; SERVICES
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-bone mt-1">
            WHAT WE OFFER
          </h2>
          <p className="text-sm text-muted mt-2">
            Explore our training sanctuary, automated fitness tools, and exclusive merchandise.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Gym */}
          <div className="p-8 rounded-3xl bg-graphite border border-white/10 hover:border-volt/50 transition flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-volt/15 text-volt flex items-center justify-center font-bold">
                <Dumbbell className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-volt uppercase tracking-wider block">
                PILLAR 01 // SANCTUARY
              </span>
              <h3 className="font-display text-3xl text-bone">
                The Gym &amp; Facility
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                4 specialized training zones at Boarding Field, Brahmanbaria: 11-gauge power cages, Ascent StairMaster cardio, free weights, and recovery.
              </p>
              <ul className="space-y-2 text-xs font-mono text-bone pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-volt" /> Facility Tour &amp; Hotspots
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-volt" /> 3-Day Free Trial QR Pass
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-volt" /> Daily Staffed Coaching
                </li>
              </ul>
            </div>
            <Link
              href="/gym"
              className="mt-8 w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition"
            >
              EXPLORE GYM FACILITY <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 2: AI Workout Generator */}
          <div className="p-8 rounded-3xl bg-graphite border border-volt/40 shadow-volt transition flex flex-col justify-between relative overflow-hidden group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-volt text-obsidian flex items-center justify-center font-bold">
                <Sparkles className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-volt uppercase tracking-wider block">
                FREE ONLINE TOOL // AI
              </span>
              <h3 className="font-display text-3xl text-bone">
                Workout Plan Generator
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                Get a custom 3 to 6-day training schedule built by Coach Tarek. Tailored to your experience, equipment, and goals (Hypertrophy, Shred, Strength).
              </p>
              <ul className="space-y-2 text-xs font-mono text-bone pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-volt" /> Interactive Rest Stopwatches
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-volt" /> Custom Daily Protein Targets
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-volt" /> Direct WhatsApp Consultation
                </li>
              </ul>
            </div>
            <Link
              href="/workout-generator"
              className="mt-8 w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-2 hover:brightness-110 transition"
            >
              GENERATE FREE PLAN <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          {/* Card 3: Machinery & Wallets Store */}
          <div className="p-8 rounded-3xl bg-graphite border border-white/10 hover:border-ember/50 transition flex flex-col justify-between group">
            <div className="space-y-4">
              <div className="w-12 h-12 rounded-2xl bg-ember/15 text-ember flex items-center justify-center font-bold">
                <ShoppingBag className="w-6 h-6" />
              </div>
              <span className="font-mono text-xs text-ember uppercase tracking-wider block">
                PILLARS 02 &amp; 03 // STORE
              </span>
              <h3 className="font-display text-3xl text-bone">
                Machinery &amp; Leather
              </h3>
              <p className="text-sm text-muted leading-relaxed">
                16 commercial single-equipment gym machines with CAD dimensions, plus 24 handcrafted full-grain leather men&apos;s wallets with 3D engraving.
              </p>
              <ul className="space-y-2 text-xs font-mono text-bone pt-2">
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ember" /> Single-Equipment Photo Catalog
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ember" /> Commercial Bulk Inquiries
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-4 h-4 text-ember" /> 3D Monogram Wallet Studio
                </li>
              </ul>
            </div>
            <div className="grid grid-cols-2 gap-2 mt-8">
              <Link
                href="/machinery"
                className="py-3.5 rounded-xl bg-obsidian border border-ember/40 text-ember font-mono font-bold text-xs flex items-center justify-center gap-1 hover:bg-ember hover:text-obsidian transition text-center"
              >
                MACHINERY
              </Link>
              <Link
                href="/wallets"
                className="py-3.5 rounded-xl bg-obsidian border border-gold/40 text-gold font-mono font-bold text-xs flex items-center justify-center gap-1 hover:bg-gold hover:text-obsidian transition text-center"
              >
                WALLETS
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. TRANSPARENT MEMBERSHIP PRICING (CLEAR & ACCESSIBLE)
         ===================================================================== */}
      <section id="pricing" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <span className="font-mono text-xs text-volt uppercase tracking-widest">
            OFFICIAL GYM FEES // BRAHMANBARIA
          </span>
          <h2 className="font-display text-4xl sm:text-5xl text-bone mt-1">
            MEMBERSHIP PLANS
          </h2>
          <p className="text-sm text-muted mt-2">
            Fair and transparent fees with zero hidden charges.
          </p>

          {/* Admission Fee Callout Banner */}
          <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-2xl bg-volt/10 border border-volt/30 text-bone text-xs sm:text-sm font-mono">
            <span className="text-volt font-bold">One-Time Admission Fee: ৳2,450</span>
            <span className="text-muted">•</span>
            <span>Applied once upon joining across all tiers</span>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
          {SEED_MEMBERSHIPS.map((plan) => {
            return (
              <div
                key={plan.slug}
                className={`rounded-3xl p-8 flex flex-col justify-between border transition ${
                  plan.popular
                    ? 'bg-gradient-to-b from-graphite to-obsidian border-volt shadow-volt scale-[1.02]'
                    : 'bg-graphite/80 border-white/10 hover:border-white/20'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-volt uppercase tracking-widest">
                      TIER // {plan.tier}
                    </span>
                    {plan.popular && (
                      <span className="px-3 py-1 rounded-full bg-volt text-obsidian font-mono font-bold text-[10px]">
                        RECOMMENDED
                      </span>
                    )}
                  </div>

                  <h3 className="font-display text-3xl text-bone mt-2">{plan.name}</h3>

                  <div className="mt-4 flex items-baseline gap-2">
                    <span className="font-mono text-4xl sm:text-5xl font-bold text-bone">
                      ৳{plan.monthlyBdt.toLocaleString()}
                    </span>
                    <span className="font-mono text-xs text-muted uppercase">/ month</span>
                  </div>

                  <p className="font-mono text-xs text-gold mt-1.5">
                    + ৳{plan.admissionFeeBdt.toLocaleString()} One-time admission fee
                  </p>

                  <ul className="space-y-3 mt-6 text-sm text-bone">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5">
                        <Check className="w-4 h-4 text-volt shrink-0 mt-0.5" />
                        <span className="text-xs sm:text-sm">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="mt-8 space-y-2">
                  <Link
                    href={`/gym?plan=${plan.slug}#trial`}
                    className={`w-full py-3.5 rounded-xl font-mono font-bold text-xs flex items-center justify-center gap-2 transition ${
                      plan.popular
                        ? 'bg-volt text-obsidian shadow-volt hover:brightness-110'
                        : 'bg-obsidian border border-white/15 text-bone hover:border-volt'
                    }`}
                  >
                    SELECT {plan.name} <ArrowRight className="w-4 h-4" />
                  </Link>

                  <a
                    href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                      `Assalamu Alaikum Coach Tarek, I would like to join the ${plan.name} plan (৳${plan.monthlyBdt}/mo + ৳2,450 admission).`
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-2.5 rounded-xl bg-transparent border border-white/10 hover:border-emerald-500/50 text-muted hover:text-emerald-400 font-mono text-[11px] flex items-center justify-center gap-1.5 transition"
                  >
                    <MessageCircle className="w-3.5 h-3.5" />
                    Inquire on WhatsApp
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          5. MEET HEAD COACH TAREK & CERTIFIED TRAINERS
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-volt uppercase tracking-widest">
              CERTIFIED COACHING TEAM
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-bone mt-1">
              MEET OUR MASTER COACHES
            </h2>
          </div>
          <a
            href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
              'Assalamu Alaikum Coach Tarek, I want to book a personal training consultation.'
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-5 py-2.5 rounded-xl bg-graphite border border-volt/40 text-volt font-mono text-xs hover:bg-volt hover:text-obsidian font-bold transition flex items-center gap-1.5 self-start sm:self-auto"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with Coach Tarek
          </a>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SEED_TRAINERS.map((trainer) => (
            <div
              key={trainer.slug}
              className="rounded-3xl bg-graphite border border-white/10 overflow-hidden flex flex-col justify-between group hover:border-volt/40 transition"
            >
              <div>
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  style={{
                    objectPosition: trainer.slug === 'tarek' ? '72% 15%' : '50% 12%',
                  }}
                  className="w-full h-80 object-cover group-hover:scale-102 transition duration-500"
                />
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-volt font-bold">
                      {trainer.experience}
                    </span>
                    <span className="font-mono text-[11px] text-gold">{trainer.role}</span>
                  </div>
                  <h3 className="font-display text-3xl text-bone mt-1">{trainer.name}</h3>
                  <p className="text-sm text-muted mt-3 leading-relaxed">{trainer.bio}</p>

                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {trainer.certifications.map((cert) => (
                      <span
                        key={cert}
                        className="px-2.5 py-1 rounded-lg bg-obsidian border border-white/10 font-mono text-[10px] text-bone"
                      >
                        {cert}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className="p-6 pt-0">
                <a
                  href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                    `Assalamu Alaikum, I would like to consult with ${trainer.name} at Tarek's Smart Fitness Gym.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full py-3 rounded-xl bg-obsidian border border-white/10 hover:border-volt text-bone hover:text-volt font-mono text-xs flex items-center justify-center gap-2 transition"
                >
                  <MessageCircle className="w-4 h-4 text-emerald-400" />
                  Direct Consultation with {trainer.name.split(' ')[0]}
                </a>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* =====================================================================
          6. SMART ATHLETE TOOLS (WORKOUT GENERATOR & 3D BARBELL CALCULATOR)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs text-volt uppercase tracking-widest">
              INTERACTIVE ATHLETE SUITE
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-bone mt-1">
              SMART TRAINING TOOLS
            </h2>
            <p className="text-sm text-muted mt-1">
              Free tools designed to calculate weights, plates, and personalized workout routines.
            </p>
          </div>

          {/* Tool Tab Switcher */}
          <div className="flex gap-2 p-1.5 rounded-2xl bg-graphite border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setActiveToolTab('plan')}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition flex items-center gap-1.5 ${
                activeToolTab === 'plan'
                  ? 'bg-volt text-obsidian font-bold shadow-volt'
                  : 'text-muted hover:text-bone'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Workout Generator
            </button>
            <button
              onClick={() => setActiveToolTab('calculator')}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition flex items-center gap-1.5 ${
                activeToolTab === 'calculator'
                  ? 'bg-volt text-obsidian font-bold shadow-volt'
                  : 'text-muted hover:text-bone'
              }`}
            >
              <Dumbbell className="w-3.5 h-3.5" />
              3D Barbell &amp; 1RM
            </button>
          </div>
        </div>

        {/* Tab 1: AI Workout Generator Highlight */}
        {activeToolTab === 'plan' ? (
          <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-graphite via-obsidian to-graphite border border-volt/40 shadow-2xl relative overflow-hidden">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 space-y-4">
                <span className="px-3 py-1 rounded-full bg-volt/15 text-volt font-mono text-xs uppercase tracking-wider">
                  ALGORITHMIC COACHING BY TRAINER TAREK
                </span>
                <h3 className="font-display text-4xl sm:text-5xl text-bone leading-tight">
                  BUILD YOUR CUSTOM <span className="text-volt">WORKOUT PLAN</span>
                </h3>
                <p className="text-sm sm:text-base text-muted max-w-xl leading-relaxed">
                  Select your fitness goal (Muscle Gain, Fat Loss, Strength), weekly frequency (3–6 days), and available equipment. Generates complete sets, reps, rest timers, and StairMaster intervals in seconds.
                </p>
                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <Link
                    href="/workout-generator"
                    className="px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center gap-2 shadow-volt hover:brightness-110 transition"
                  >
                    <Sparkles className="w-4 h-4" />
                    OPEN WORKOUT GENERATOR
                  </Link>
                  <Link
                    href="/gym#workout-generator"
                    className="px-6 py-3.5 rounded-xl bg-obsidian border border-white/15 text-bone font-mono text-xs hover:border-volt transition"
                  >
                    VIEW GYM SCHEDULES
                  </Link>
                </div>
              </div>

              <div className="lg:col-span-5 grid grid-cols-2 gap-3.5">
                <div className="p-4 rounded-2xl bg-obsidian/80 border border-white/10">
                  <span className="font-mono text-xs text-volt block mb-1">01 // FREQUENCY</span>
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
                  <span className="font-mono text-xs text-emerald-400 block mb-1">04 // 1-ON-1</span>
                  <p className="font-display text-xl text-bone">WHATSAPP REVIEW</p>
                  <p className="text-[11px] text-muted mt-1">Direct feedback from Coach Tarek</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tab 2: 3D Barbell & 1RM Calculator */
          <div className="rounded-3xl border border-white/10 bg-graphite/40 overflow-hidden shadow-2xl p-4 sm:p-8">
            <BarLoader3DCalculator />
          </div>
        )}
      </section>

      {/* =====================================================================
          7. FEATURED STORE HIGHLIGHTS (CLEAN TAB: MACHINERY / WALLETS)
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs text-volt uppercase tracking-widest">
              OFFICIAL STORE &amp; GEAR
            </span>
            <h2 className="font-display text-4xl text-bone mt-1">
              EQUIPMENT &amp; ESSENTIALS
            </h2>
          </div>

          {/* Store Category Selector */}
          <div className="flex items-center gap-2 p-1.5 rounded-2xl bg-graphite border border-white/10 self-start sm:self-auto">
            <button
              onClick={() => setStoreTab('machinery')}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition ${
                storeTab === 'machinery'
                  ? 'bg-ember text-obsidian font-bold shadow-ember'
                  : 'text-muted hover:text-bone'
              }`}
            >
              Gym Machinery ({SEED_MACHINERY.length})
            </button>
            <button
              onClick={() => setStoreTab('wallets')}
              className={`px-4 py-2 rounded-xl font-mono text-xs transition ${
                storeTab === 'wallets'
                  ? 'bg-gold text-obsidian font-bold shadow-gold'
                  : 'text-muted hover:text-bone'
              }`}
            >
              Leather Wallets ({SEED_WALLETS.length})
            </button>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {storeTab === 'machinery'
            ? featuredMachinery.map((m) => <ProductCard key={m.slug} product={m} />)
            : featuredWallets.map((w) => <ProductCard key={w.slug} product={w} />)}
        </div>

        <div className="mt-8 text-center">
          <Link
            href={storeTab === 'machinery' ? '/machinery' : '/wallets'}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-graphite border border-white/15 text-bone hover:border-volt font-mono text-xs font-bold transition"
          >
            {storeTab === 'machinery'
              ? 'View All 16 Gym Machines'
              : 'Explore All 24 Handcrafted Wallets'}
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* =====================================================================
          8. VISIT THE FACILITY // RECEPTION & LOCATION
         ===================================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-br from-graphite to-obsidian border border-white/15 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            <div className="lg:col-span-7 space-y-4">
              <span className="font-mono text-xs text-volt uppercase tracking-widest">
                VISIT OUR FACILITY
              </span>
              <h3 className="font-display text-4xl sm:text-5xl text-bone">
                COME TRAIN AT THE FORGE
              </h3>
              <p className="text-sm sm:text-base text-muted leading-relaxed max-w-xl">
                Ready to take your fitness to the next level? Visit our front desk at Boarding Field, Brahmanbaria or message Coach Tarek directly on WhatsApp for membership and trial activation.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-volt shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-mono text-xs text-bone font-bold">ADDRESS</h5>
                    <p className="text-xs text-muted mt-0.5">{BRAND_CONFIG.contact.address}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-mono text-xs text-bone font-bold">HOURS</h5>
                    <p className="text-xs text-muted mt-0.5">{BRAND_CONFIG.contact.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-mono text-xs text-bone font-bold">PHONE / HOTLINE</h5>
                    <p className="text-xs text-muted mt-0.5">{BRAND_CONFIG.contact.hotlineBd}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MessageCircle className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-mono text-xs text-bone font-bold">WHATSAPP DIRECT</h5>
                    <p className="text-xs text-muted mt-0.5">{BRAND_CONFIG.contact.phone}</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-5 flex flex-col gap-3.5 p-6 rounded-2xl bg-obsidian border border-white/10 text-center">
              <h4 className="font-display text-2xl text-bone">START YOUR JOURNEY TODAY</h4>
              <p className="text-xs text-muted">
                3-Day Free Trial QR pass is available with instant biometric turnstile activation.
              </p>
              <Link
                href="/gym#trial"
                className="w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs shadow-volt hover:brightness-110 transition text-center"
              >
                CLAIM 3-DAY FREE TRIAL
              </Link>
              <a
                href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp}?text=${encodeURIComponent(
                  'Assalamu Alaikum Coach Tarek, I am contacting you from the website to join the gym.'
                )}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-2 transition"
              >
                <MessageCircle className="w-4 h-4" />
                MESSAGE COACH TAREK ON WHATSAPP
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
