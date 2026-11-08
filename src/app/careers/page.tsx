import React from 'react';
import { BRAND_CONFIG } from '@/lib/brand';

export default function CareersPage() {
  const roles = [
    { title: 'Senior Strength & Conditioning Coach (CSCS)', dept: 'Pillar 01 // Gym Sanctuary', type: 'Full-Time • On-Site' },
    { title: 'Master Leather Artisan & Skiving Specialist', dept: 'Pillar 02 // Heritage Leather', type: 'Full-Time • Atelier' },
    { title: 'CAD Structural Engineer (11-Gauge Steel Rigs)', dept: 'Pillar 03 // Forge Armory', type: 'Full-Time • Hybrid' },
    { title: 'WebGL / Three.js Creative Technologist', dept: 'Digital Experience', type: 'Remote / Hybrid' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-16 space-y-10">
      <div>
        <span className="font-mono text-xs text-volt uppercase tracking-widest">
          JOIN THE FORGE
        </span>
        <h1 className="font-display text-6xl text-bone mt-1">
          CAREERS AT {BRAND_CONFIG.name}
        </h1>
        <p className="text-muted text-sm mt-2 max-w-xl">
          We hire obsessive coaches, craftsmen, and engineers. Send your portfolio or CV to{' '}
          <span className="text-volt font-mono">{BRAND_CONFIG.contact.email}</span>.
        </p>
      </div>

      <div className="space-y-4">
        {roles.map((r) => (
          <div
            key={r.title}
            className="p-6 rounded-2xl bg-graphite border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
          >
            <div>
              <span className="font-mono text-xs text-volt">{r.dept}</span>
              <h3 className="font-display text-2xl text-bone mt-0.5">{r.title}</h3>
              <p className="text-xs text-muted font-mono">{r.type}</p>
            </div>
            <a
              href={`mailto:${BRAND_CONFIG.contact.email}?subject=Application: ${encodeURIComponent(r.title)}`}
              className="px-5 py-2.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs text-center"
            >
              APPLY NOW
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}
