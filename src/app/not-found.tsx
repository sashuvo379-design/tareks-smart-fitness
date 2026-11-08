import React from 'react';
import Link from 'next/link';
import { Dumbbell, ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center text-center px-4 space-y-6">
      <div className="w-20 h-20 rounded-2xl bg-volt/15 border border-volt text-volt flex items-center justify-center animate-bounce">
        <Dumbbell className="w-10 h-10" />
      </div>
      <span className="font-mono text-xs text-ember uppercase tracking-widest">
        ERROR 404 // PLATE MISLOADED
      </span>
      <h1 className="font-display text-7xl text-bone leading-none">
        SECTOR NOT FOUND IN THE 3D FORGE
      </h1>
      <p className="text-sm text-muted max-w-md">
        The coordinates you requested are outside the IRONFORGE Sanctuary perimeter. Return to the main platform to resume training.
      </p>
      <Link
        href="/"
        className="px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center gap-2 shadow-volt"
      >
        <ArrowLeft className="w-4 h-4" /> RETURN TO BASE PLATFORM
      </Link>
    </div>
  );
}
