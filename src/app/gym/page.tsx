'use client';

import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import {
  SEED_CLASSES,
  SEED_TRAINERS,
  SEED_MEMBERSHIPS,
} from '@/lib/seed-data';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import { QRCodeSVG } from 'qrcode.react';
import {
  Calendar,
  Clock,
  Check,
  Award,
  Flame,
  HelpCircle,
  QrCode,
  UserCheck,
  Sparkles,
} from 'lucide-react';
import WorkoutPlanGenerator from '@/components/gym/WorkoutPlanGenerator';

const GymTour3D = dynamic(() => import('@/components/three/GymTour3D'), {
  ssr: false,
  loading: () => (
    <div className="h-[460px] rounded-2xl bg-graphite animate-pulse flex items-center justify-center font-mono text-xs text-volt">
      LOADING 3D ARCHITECTURAL GYM WALKTHROUGH...
    </div>
  ),
});

export default function GymPage() {
  const { currency, addToast } = useStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'quarterly' | 'yearly'>('monthly');
  const [bookedClasses, setBookedClasses] = useState<string[]>([]);

  // Free Trial & QR Pass Generator State
  const [trialName, setTrialName] = useState('');
  const [trialEmail, setTrialEmail] = useState('');
  const [trialPhone, setTrialPhone] = useState('');
  const [trialGoal, setTrialGoal] = useState('Strength & Hypertrophy');
  const [generatedPassToken, setGeneratedPassToken] = useState<string | null>(null);

  const categories = [
    'ALL',
    'STRENGTH',
    'HIIT',
    'HYPERTROPHY',
    'CONDITIONING',
    'MOBILITY',
    'RECOVERY',
  ];

  const filteredClasses =
    selectedCategory === 'ALL'
      ? SEED_CLASSES
      : SEED_CLASSES.filter((c) => c.category === selectedCategory);

  const handleBookClass = (title: string) => {
    if (bookedClasses.includes(title)) return;
    setBookedClasses([...bookedClasses, title]);
    addToast({
      title: `Spot Reserved: ${title}`,
      description: 'Added to your athlete schedule. Present your QR Pass at reception.',
      variant: 'volt',
    });
  };

  const handleTrialSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const token = `IF-PASS-${Math.floor(100000 + Math.random() * 900000)}`;
    setGeneratedPassToken(token);
    addToast({
      title: '3-Day Free Trial Pass Activated!',
      description: `Pass Token: ${token}`,
      variant: 'volt',
    });
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: trialName,
          guestEmail: trialEmail,
          guestPhone: trialPhone,
          bookingType: 'FREE_TRIAL',
          notes: trialGoal,
        }),
      });
    } catch {
      // Optimistic fallback already active
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-volt/15 border border-volt/30 text-volt font-mono text-xs uppercase tracking-widest">
          PILLAR 01 // TAREK&apos;S SMART FITNESS GYM
        </span>
        <h1 className="font-display text-6xl sm:text-7xl text-bone leading-none">
          TAREK&apos;S SMART <span className="text-volt">FITNESS GYM</span>
        </h1>
        <p className="text-muted text-base sm:text-lg">
          Navigate our 4 specialized training zones at Boarding Field, Brahmanbaria in interactive 3D, reserve a spot in high-intensity coaching sessions, or generate your instant 3-day digital QR trial pass.
        </p>
      </div>

      {/* 1. Interactive Real-Image Gym Floor Walkthrough */}
      <section id="tour">
        <div className="mb-8">
          <span className="font-mono text-xs text-volt uppercase tracking-widest">
            INTERACTIVE FACILITY PHOTO TOUR
          </span>
          <h2 className="font-display text-4xl text-bone mt-1">
            GYM ZONE WALKTHROUGH &amp; HOTSPOTS
          </h2>
        </div>
        <GymTour3D />
      </section>

      {/* 2. Filterable Classes Timetable */}
      <section id="timetable">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <span className="font-mono text-xs text-volt uppercase tracking-widest">
              WEEKLY COACHING SCHEDULE
            </span>
            <h2 className="font-display text-4xl text-bone mt-1">
              CLASS TIMETABLE ({filteredClasses.length} SESSIONS)
            </h2>
          </div>

          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs transition border ${
                  selectedCategory === cat
                    ? 'bg-volt text-obsidian border-volt font-bold'
                    : 'bg-graphite text-muted border-white/10 hover:text-bone'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredClasses.map((cls) => (
            <div
              key={`${cls.dayOfWeek}-${cls.startTime}-${cls.title}`}
              className="p-6 rounded-2xl bg-graphite border border-white/10 hover:border-volt/50 transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-3">
                  <span className="px-2.5 py-1 rounded bg-obsidian text-volt border border-volt/30">
                    {cls.dayOfWeek} • {cls.startTime} ({cls.durationMin}m)
                  </span>
                  <span className="text-ember flex items-center gap-1">
                    <Flame className="w-3.5 h-3.5" /> {cls.intensity}
                  </span>
                </div>
                <h3 className="font-display text-2xl text-bone">{cls.title}</h3>
                <p className="text-xs font-mono text-gold mt-1">
                  Coach: {cls.trainerName} • {cls.room}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 3. Master Trainers Roster */}
      <section id="trainers">
        <div className="mb-8">
          <span className="font-mono text-xs text-volt uppercase tracking-widest">
            CERTIFIED COACHING STAFF
          </span>
          <h2 className="font-display text-4xl text-bone mt-1">
            MASTER TRAINERS ({SEED_TRAINERS.length})
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SEED_TRAINERS.map((trainer) => (
            <div
              key={trainer.slug}
              className="rounded-2xl bg-graphite border border-white/10 overflow-hidden flex flex-col justify-between"
            >
              <div>
                <img
                  src={trainer.avatar}
                  alt={trainer.name}
                  style={{
                    objectPosition: trainer.slug === 'tarek' ? '72% 15%' : '50% 12%',
                  }}
                  className="w-full h-80 object-cover"
                />
                <div className="p-6">
                  <span className="font-mono text-xs text-volt">{trainer.experience}</span>
                  <h3 className="font-display text-3xl text-bone mt-1">{trainer.name}</h3>
                  <p className="text-xs font-mono text-gold">{trainer.role}</p>
                  <p className="text-sm text-muted mt-3 leading-relaxed">{trainer.bio}</p>
                  <div className="flex flex-wrap gap-1.5 mt-4">
                    {trainer.certifications.map((c) => (
                      <span
                        key={c}
                        className="px-2 py-0.5 rounded bg-obsidian border border-white/10 font-mono text-[10px] text-bone"
                      >
                        {c}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Algorithmic Workout Plan Generator */}
      <section id="workout-generator">
        <div className="mb-8">
          <span className="font-mono text-xs text-volt uppercase tracking-widest flex items-center gap-2">
            <Sparkles className="w-3.5 h-3.5 text-volt" />
            COACH TAREK&apos;S ALGORITHM // 15 YEARS EXPERIENCE
          </span>
          <h2 className="font-display text-4xl text-bone mt-1">
            CUSTOM WORKOUT PLAN GENERATOR
          </h2>
          <p className="text-sm text-muted mt-2 max-w-2xl">
            Input your target goal, training frequency, and equipment to generate a complete custom protocol with reps, sets, rest timers, and StairMaster cardio protocols.
          </p>
        </div>
        <WorkoutPlanGenerator />
      </section>

      {/* 5. Membership Tiers */}
      <section id="memberships">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <span className="font-mono text-xs text-volt uppercase tracking-widest">
              OFFICIAL GYM FEES &amp; PACKAGES
            </span>
            <h2 className="font-display text-4xl text-bone mt-1">
              MEMBERSHIP PLANS &amp; FEES
            </h2>
            <p className="text-sm text-muted mt-1">
              One-time admission fee: <strong className="text-volt">2,450 BDT</strong> across all membership packages.
            </p>
          </div>

          <div className="p-3 rounded-2xl bg-graphite border border-white/10 font-mono text-xs text-gold">
            Admission: ৳2,450 (One-Time)
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {SEED_MEMBERSHIPS.map((plan) => {
            return (
              <div
                key={plan.slug}
                className={`rounded-3xl p-8 flex flex-col justify-between border ${
                  plan.popular
                    ? 'bg-obsidian border-volt shadow-volt'
                    : 'bg-graphite border-white/10'
                }`}
              >
                <div>
                  <span className="font-mono text-xs text-volt">TIER // {plan.tier}</span>
                  <h3 className="font-display text-3xl text-bone mt-1">{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <p className="font-mono text-4xl font-bold text-bone">
                      ৳{plan.monthlyBdt.toLocaleString()}
                    </p>
                    <span className="text-xs text-muted font-mono uppercase">/ month</span>
                  </div>
                  <p className="font-mono text-xs text-gold mt-1">
                    + ৳{plan.admissionFeeBdt.toLocaleString()} One-time admission fee
                  </p>
                  <ul className="space-y-2.5 mt-6 text-sm text-bone">
                    {plan.features.map((f) => (
                      <li key={f} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-volt shrink-0 mt-1" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href="#trial"
                  className="mt-8 w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs text-center block shadow-volt hover:brightness-110 transition"
                >
                  JOIN {plan.name}
                </a>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Free Trial & Instant QR Pass Generator */}
      <section
        id="trial"
        className="rounded-3xl bg-gradient-to-br from-graphite to-obsidian border border-volt/40 p-8 lg:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-4">
            <span className="font-mono text-xs text-volt uppercase tracking-widest">
              INSTANT BIOMETRIC TURNSTILE ACCESS
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-bone">
              CLAIM YOUR 3-DAY FREE TRIAL &amp; QR PASS
            </h2>
            <p className="text-sm text-muted max-w-xl">
              Generate an instant encrypted QR pass on screen. Scan at the IRONFORGE turnstile to test our 11-gauge power racks, Ascent StairMaster arena, and recovery suite.
            </p>

            <form onSubmit={handleTrialSubmit} className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={trialName}
                onChange={(e) => setTrialName(e.target.value)}
                className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
              <input
                type="email"
                required
                placeholder="Email Address *"
                value={trialEmail}
                onChange={(e) => setTrialEmail(e.target.value)}
                className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
              <input
                type="tel"
                required
                placeholder="Mobile Number *"
                value={trialPhone}
                onChange={(e) => setTrialPhone(e.target.value)}
                className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
              <select
                value={trialGoal}
                onChange={(e) => setTrialGoal(e.target.value)}
                className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              >
                <option>Strength &amp; Hypertrophy</option>
                <option>StairMaster Fat Loss &amp; HIIT</option>
                <option>Powerlifting Competition Prep</option>
                <option>Mobility &amp; Contrast Recovery</option>
              </select>
              <button
                type="submit"
                className="sm:col-span-2 py-4 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm shadow-volt hover:brightness-110 transition"
              >
                GENERATE INSTANT QR ACCESS PASS
              </button>
            </form>
          </div>

          <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 rounded-2xl bg-obsidian border border-white/10 text-center">
            <QrCode className="w-6 h-6 text-volt mb-2" />
            <p className="font-mono text-xs text-muted uppercase mb-4">
              {generatedPassToken ? 'ACTIVE DIGITAL TURNSTILE PASS' : 'PREVIEW QR MEMBER PASS'}
            </p>
            <div className="p-4 rounded-2xl bg-white">
              <QRCodeSVG
                value={generatedPassToken || 'IRONFORGE-GUEST-PREVIEW-2026'}
                size={165}
              />
            </div>
            <p className="font-mono text-xs text-volt mt-4 font-bold">
              {generatedPassToken || 'FILL FORM TO ACTIVATE TOKEN'}
            </p>
            {trialName && (
              <p className="text-xs text-bone mt-1">
                Holder: {trialName} ({trialGoal})
              </p>
            )}
          </div>
        </div>
      </section>

      {/* 6. Gym FAQ */}
      <section className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl text-bone text-center mb-8">
          FREQUENTLY ASKED QUESTIONS
        </h2>
        <div className="space-y-4">
          {[
            {
              q: 'What are the operating hours of the IRONFORGE Sanctuary?',
              a: 'Members with an active QR pass enjoy access from 05:00 AM to 11:30 PM 7 days a week, with staffed coaching hours from 07:00 AM to 10:30 PM.',
            },
            {
              q: 'Is the Ascent StairMaster & Contrast Recovery Suite included?',
              a: 'Yes! FORGE PRO and APEX BLACK CARD tiers include unrestricted access to our Ascent StairMaster arena, curved sprint runners, and recovery zone.',
            },
            {
              q: 'Can I pause my membership when traveling?',
              a: 'Quarterly and Yearly memberships can be frozen for up to 45 days per year at zero cost directly from your Account Dashboard.',
            },
          ].map((faq) => (
            <div
              key={faq.q}
              className="p-6 rounded-2xl bg-graphite border border-white/10"
            >
              <h4 className="font-semibold text-bone flex items-center gap-2">
                <HelpCircle className="w-4 h-4 text-volt shrink-0" />
                {faq.q}
              </h4>
              <p className="text-sm text-muted mt-2 pl-6">{faq.a}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
