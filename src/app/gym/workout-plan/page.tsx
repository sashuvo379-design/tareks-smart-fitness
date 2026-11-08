import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import WorkoutPlanGenerator from '@/components/gym/WorkoutPlanGenerator';
import { BRAND_CONFIG } from '@/lib/brand';
import { Dumbbell, ArrowLeft, Shield, Sparkles, Flame } from 'lucide-react';

export const metadata: Metadata = {
  title: `Free Workout Plan Generator | ${BRAND_CONFIG.name}`,
  description:
    'Generate your personalized strength, hypertrophy, or fat-loss workout routine certified by Head Coach Tarek (15 Years Experience). Complete sets, reps, rest timers, and nutrition targets.',
};

export default function WorkoutPlanPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Breadcrumb & Navigation */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
        <Link
          href="/gym"
          className="text-muted hover:text-volt flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Gym Overview
        </Link>
        <span className="text-volt">
          TAREK&apos;S SMART FITNESS // WORKOUT ARCHITECTURE
        </span>
      </div>

      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/15 border border-volt/30 text-volt font-mono text-xs uppercase tracking-widest">
          <Dumbbell className="w-3.5 h-3.5" />
          <span>SMART TRAINING ALGORITHM</span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl text-bone leading-tight">
          AI WORKOUT PLAN <span className="text-volt">GENERATOR</span>
        </h1>
        <p className="text-muted text-base sm:text-lg leading-relaxed">
          Craft your science-backed training protocol in seconds. Customized for hypertrophy, fat loss, or raw powerlifting strength—engineered around the high-performance armory at Boarding Field, Brahmanbaria.
        </p>
      </div>

      {/* Main Interactive Generator Component */}
      <WorkoutPlanGenerator />
    </div>
  );
}
