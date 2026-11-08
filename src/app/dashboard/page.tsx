'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/use-store';
import { SEED_WALLETS, SEED_MACHINERY } from '@/lib/seed-data';
import ProductCard from '@/components/store/ProductCard';
import { QRCodeSVG } from 'qrcode.react';
import {
  QrCode,
  Package,
  Dumbbell,
  Heart,
  Calendar,
  MapPin,
  Plus,
  CheckCircle2,
} from 'lucide-react';

interface LiftLog {
  id: string;
  exercise: string;
  sets: number;
  reps: number;
  weightKg: number;
  oneRepMax: number;
  date: string;
}

export default function DashboardPage() {
  const { wishlist, recentlyViewed, addToast } = useStore();
  const [activeTab, setActiveTab] = useState<'overview' | 'workouts' | 'wishlist' | 'orders'>('overview');

  const [logs, setLogs] = useState<LiftLog[]>([
    { id: '1', exercise: 'Competition Back Squat', sets: 4, reps: 5, weightKg: 165, oneRepMax: 192, date: '2026-11-05' },
    { id: '2', exercise: 'Paused Barbell Bench Press', sets: 4, reps: 6, weightKg: 120, oneRepMax: 144, date: '2026-11-06' },
    { id: '3', exercise: 'Conventional Deadlift', sets: 3, reps: 3, weightKg: 210, oneRepMax: 231, date: '2026-11-07' },
  ]);

  const [exercise, setExercise] = useState('Barbell Overhead Press');
  const [sets, setSets] = useState(4);
  const [reps, setReps] = useState(5);
  const [weightKg, setWeightKg] = useState(75);

  const allProducts = [...SEED_WALLETS, ...SEED_MACHINERY];
  const wishlistedProducts = allProducts.filter((p) => wishlist.includes(p.slug));
  const recentProducts = allProducts.filter((p) => recentlyViewed.includes(p.slug));

  const handleAddLog = (e: React.FormEvent) => {
    e.preventDefault();
    const oneRepMax = Math.round(weightKg * (1 + reps / 30));
    setLogs([
      {
        id: Math.random().toString(),
        exercise,
        sets,
        reps,
        weightKg,
        oneRepMax,
        date: new Date().toISOString().slice(0, 10),
      },
      ...logs,
    ]);
    addToast({
      title: `Logged ${exercise}: ${weightKg}kg x ${reps}`,
      description: `Calculated 1RM: ${oneRepMax} kg`,
      variant: 'volt',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      {/* Top Athlete Header & Digital QR Pass */}
      <div className="rounded-3xl bg-graphite border border-white/10 p-6 lg:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div className="lg:col-span-8 space-y-3">
          <div className="flex flex-wrap items-center gap-2.5">
            <span className="px-3 py-1 rounded-full bg-volt/20 text-volt font-mono text-xs font-bold">
              ACTIVE // FORGE PRO TIER
            </span>
            <span className="font-mono text-xs text-muted">
              MEMBER ID: IF-ATH-88412
            </span>
          </div>
          <h1 className="font-display text-5xl text-bone">
            WELCOME BACK, ALEX MERCER
          </h1>
          <p className="text-sm text-muted max-w-xl">
            Your annual FORGE PRO pass grants 24/7 biometric turnstile access, unlimited group conditioning classes, and 15% member pricing on all leather wallets and home machinery.
          </p>
          <div className="flex flex-wrap gap-2 pt-2">
            {(
              [
                { id: 'overview', label: 'Overview & Orders' },
                { id: 'workouts', label: 'Workout & 1RM Log' },
                { id: 'wishlist', label: `Wishlist (${wishlistedProducts.length})` },
                { id: 'orders', label: 'Addresses & Settings' },
              ] as const
            ).map((t) => (
              <button
                key={t.id}
                onClick={() => setActiveTab(t.id)}
                className={`px-4 py-2 rounded-xl font-mono text-xs border transition ${
                  activeTab === t.id
                    ? 'bg-volt text-obsidian border-volt font-bold'
                    : 'bg-obsidian text-muted border-white/10 hover:text-bone'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="lg:col-span-4 flex flex-col items-center justify-center p-5 rounded-2xl bg-obsidian border border-volt/30">
          <div className="flex items-center gap-1.5 text-volt font-mono text-xs mb-2">
            <QrCode className="w-4 h-4" /> TURNSTILE ACCESS QR PASS
          </div>
          <div className="p-3 rounded-xl bg-white">
            <QRCodeSVG value="IRONFORGE-PASS-2026-AX9940" size={125} />
          </div>
          <span className="font-mono text-[11px] text-muted mt-2">
            TOKEN: IRONFORGE-PASS-2026-AX9940
          </span>
        </div>
      </div>

      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Recent Orders */}
          <div className="lg:col-span-7 space-y-4">
            <h2 className="font-display text-3xl text-bone flex items-center gap-2">
              <Package className="w-6 h-6 text-volt" /> RECENT ORDERS
            </h2>
            <div className="space-y-4">
              {[
                {
                  id: 'IF-ORD-90412',
                  date: 'Nov 02, 2026',
                  status: 'DELIVERED',
                  total: '$775',
                  items: '1x Apex Heritage Bifold (Engraved: A.M. // VII), 1x Titan B-800 Zero-Gap Bench',
                },
                {
                  id: 'IF-ORD-88319',
                  date: 'Oct 14, 2026',
                  status: 'DELIVERED',
                  total: '$110',
                  items: '1x Titan Carbon & Leather Cardholder (Saddle Cognac)',
                },
              ].map((ord) => (
                <div
                  key={ord.id}
                  className="p-5 rounded-2xl bg-graphite border border-white/10 space-y-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm font-bold text-volt">
                      {ord.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded bg-emerald-500/20 text-emerald-400 font-mono text-xs">
                      {ord.status}
                    </span>
                  </div>
                  <p className="text-xs text-bone">{ord.items}</p>
                  <div className="flex justify-between text-xs font-mono text-muted pt-2 border-t border-white/5">
                    <span>Ordered: {ord.date}</span>
                    <span className="text-gold font-bold">Total: {ord.total}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Training Floor Schedule */}
          <div className="lg:col-span-5 space-y-4">
            <h2 className="font-display text-3xl text-bone flex items-center gap-2">
              <Calendar className="w-6 h-6 text-gold" /> GYM FLOOR SESSIONS
            </h2>
            <div className="p-5 rounded-2xl bg-graphite border border-white/10 space-y-4">
              {[
                {
                  title: 'Heavy Iron Compound Lift',
                  when: 'Monday • 07:00 AM',
                  coach: 'Tarek',
                  room: 'Main Forge Floor',
                },
                {
                  title: 'StairMaster & Sled Inferno',
                  when: 'Thursday • 07:30 AM',
                  coach: 'Akash',
                  room: 'Turf & Cardio Arena',
                },
              ].map((b) => (
                <div
                  key={b.title}
                  className="p-4 rounded-xl bg-obsidian border border-white/10 flex items-center justify-between"
                >
                  <div>
                    <p className="font-semibold text-sm text-bone">{b.title}</p>
                    <p className="font-mono text-xs text-volt mt-0.5">{b.when}</p>
                    <p className="text-xs text-muted">
                      Coach: {b.coach} • {b.room}
                    </p>
                  </div>
                  <CheckCircle2 className="w-5 h-5 text-volt shrink-0" />
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'workouts' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form
            onSubmit={handleAddLog}
            className="lg:col-span-5 p-6 rounded-2xl bg-graphite border border-white/10 space-y-4 h-fit"
          >
            <h3 className="font-display text-3xl text-bone">LOG NEW LIFT</h3>
            <div>
              <label className="font-mono text-xs text-muted block mb-1">Exercise</label>
              <input
                type="text"
                required
                value={exercise}
                onChange={(e) => setExercise(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
            </div>
            <div className="grid grid-cols-3 gap-3">
              <div>
                <label className="font-mono text-xs text-muted block mb-1">Sets</label>
                <input
                  type="number"
                  value={sets}
                  onChange={(e) => setSets(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-sm font-mono text-bone"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-muted block mb-1">Reps</label>
                <input
                  type="number"
                  value={reps}
                  onChange={(e) => setReps(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-sm font-mono text-bone"
                />
              </div>
              <div>
                <label className="font-mono text-xs text-muted block mb-1">Weight (KG)</label>
                <input
                  type="number"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-sm font-mono text-bone"
                />
              </div>
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> RECORD LIFT &amp; CALCULATE 1RM
            </button>
          </form>

          <div className="lg:col-span-7 space-y-3">
            <h3 className="font-display text-3xl text-bone">PERSONAL STRENGTH LOG</h3>
            {logs.map((l) => (
              <div
                key={l.id}
                className="p-4 rounded-2xl bg-graphite border border-white/10 flex items-center justify-between"
              >
                <div>
                  <p className="font-semibold text-bone">{l.exercise}</p>
                  <p className="font-mono text-xs text-muted">
                    {l.sets} Sets × {l.reps} Reps @ {l.weightKg} KG • {l.date}
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] text-muted block">EST. 1RM</span>
                  <span className="font-mono text-xl font-bold text-volt">
                    {l.oneRepMax} KG
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'wishlist' && (
        <div className="space-y-8">
          <h2 className="font-display text-3xl text-bone">
            SAVED WISHLIST ({wishlistedProducts.length})
          </h2>
          {wishlistedProducts.length === 0 ? (
            <p className="text-sm text-muted">
              No items in your wishlist yet. Click the heart icon on any wallet or machine to save it here.
            </p>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {wishlistedProducts.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          )}

          {recentProducts.length > 0 && (
            <>
              <h2 className="font-display text-3xl text-bone pt-8 border-t border-white/10">
                RECENTLY VIEWED
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {recentProducts.slice(0, 4).map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      {activeTab === 'orders' && (
        <div className="p-6 rounded-2xl bg-graphite border border-white/10 max-w-xl space-y-3">
          <h3 className="font-display text-2xl text-bone flex items-center gap-2">
            <MapPin className="w-5 h-5 text-volt" /> SAVED SHIPPING ADDRESS
          </h3>
          <p className="text-sm text-bone font-semibold">Alex Mercer</p>
          <p className="text-xs text-muted">
            742 Evergreen Industrial Blvd, Suite 4B, Austin, TX / Boarding Field Hub
          </p>
          <p className="text-xs font-mono text-volt">Verified Default Delivery Address</p>
        </div>
      )}
    </div>
  );
}
