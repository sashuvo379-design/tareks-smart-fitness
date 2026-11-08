import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import WorkoutPlanGenerator from '@/components/gym/WorkoutPlanGenerator';
import { BRAND_CONFIG } from '@/lib/brand';
import { Dumbbell, ArrowLeft } from 'lucide-react';

export const metadata: Metadata = {
  title: `Workout Plan Generator | ${BRAND_CONFIG.name}`,
  description:
    'Free custom workout plan generator certified by Head Coach Tarek (15 Years Experience). Daily splits, exercise selections, reps, rest timers, and StairMaster conditioning.',
};

export default function StandaloneWorkoutGeneratorPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <div className="flex items-center justify-between border-b border-white/10 pb-4 text-xs font-mono">
        <Link
          href="/"
          className="text-muted hover:text-volt flex items-center gap-2 transition"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Home
        </Link>
        <span className="text-volt">
          TAREK&apos;S SMART FITNESS // WORKOUT ARCHITECTURE
        </span>
      </div>

      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-volt/15 border border-volt/30 text-volt font-mono text-xs uppercase tracking-widest">
          <Dumbbell className="w-3.5 h-3.5" />
          <span>FREE ONLINE TOOL</span>
        </div>
        <h1 className="font-display text-5xl sm:text-6xl text-bone leading-tight">
          CUSTOM WORKOUT <span className="text-volt">PLAN GENERATOR</span>
        </h1>
        <p className="text-muted text-base sm:text-lg leading-relaxed">
          Select your experience level, weekly frequency, and primary fitness goal. Powered by 15 years of competitive coaching experience from Trainer Tarek.
        </p>
      </div>

      <WorkoutPlanGenerator />
    </div>
  );
}
