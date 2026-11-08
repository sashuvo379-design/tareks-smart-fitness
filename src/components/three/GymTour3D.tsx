'use client';

import React, { useState } from 'react';
import {
  Compass,
  CheckCircle2,
  MapPin,
  ZoomIn,
  ZoomOut,
  Sparkles,
} from 'lucide-react';

export interface GymHotspotPin {
  id: string;
  label: string;
  detail: string;
  x: string; // CSS left %
  y: string; // CSS top %
}

export interface GymZoneInfo {
  id: 'freeweights' | 'cardio' | 'functional' | 'recovery';
  name: string;
  tagline: string;
  image: string;
  color: string;
  equipment: string[];
  description: string;
  hotspots: GymHotspotPin[];
}

const TOUR_ZONES: GymZoneInfo[] = [
  {
    id: 'freeweights',
    name: '01. Free Weights & Power Racks',
    tagline: 'Colossus 11-Gauge Cages & 5–70kg Pro Urethane Dumbbells',
    image: '/assets/gym/zone-freeweights.jpg',
    color: '#C6FF00',
    equipment: [
      '6x Colossus PR-9000 Commercial Power Racks',
      '210K PSI Calibrated Olympic Power Bars',
      'Full 5–70kg Pro Urethane Dumbbell Wall',
      'Monolith Competition Adjustable FID Benches',
    ],
    description:
      'Constructed over 30mm acoustic shock flooring with Westside-spaced cages, calibrated competition plates, and full-length mirror dumbbell racks.',
    hotspots: [
      {
        id: 'fw-1',
        label: '5–70kg Pro Dumbbell Rack',
        detail: '2-Tier commercial urethane dumbbell line with knurled chrome handles.',
        x: '26%',
        y: '55%',
      },
      {
        id: 'fw-2',
        label: '11-Gauge Squat & Power Racks',
        detail: 'Laser-cut 3x3" structural steel cages with safety spotter arms.',
        x: '62%',
        y: '38%',
      },
      {
        id: 'fw-3',
        label: 'Adjustable FID Bench Line',
        detail: 'Zero-gap competition benches rated to 1,200 lb static load.',
        x: '82%',
        y: '58%',
      },
    ],
  },
  {
    id: 'cardio',
    name: '02. Cardio & Treadmill Arena',
    tagline: 'Commercial Slat-Belt Treadmills, StairClimbers & Air Bikes',
    image: '/assets/gym/zone-cardio.jpg',
    color: '#FF6B2B',
    equipment: [
      '8x Commercial Slat-Belt Incline Treadmills',
      '4x Revolving Commercial StairClimbers',
      'Heavy-Duty Elliptical Cross-Trainers',
      'Heart-Rate Zone Telemetry Displays',
    ],
    description:
      'Climate-controlled metabolic conditioning deck featuring shock-absorbing vulcanized slat treadmills and panoramic floor lighting.',
    hotspots: [
      {
        id: 'cd-1',
        label: 'Commercial Treadmill Fleet',
        detail: '5.0 HP AC brushless drive with 15% incline and impact-absorbing deck.',
        x: '48%',
        y: '54%',
      },
      {
        id: 'cd-2',
        label: 'Elliptical & Cross-Trainer Bay',
        detail: 'Zero-impact electromagnetic stride machines for endurance work.',
        x: '14%',
        y: '56%',
      },
      {
        id: 'cd-3',
        label: 'Functional Conditioning Track',
        detail: 'Hardwood & high-grip floor lane for metabolic circuits.',
        x: '74%',
        y: '72%',
      },
    ],
  },
  {
    id: 'functional',
    name: '03. Functional & Cable Crossover Lab',
    tagline: 'Dual-Stack Cable Machines, Leg Press & Athletic Stations',
    image: '/assets/gym/zone-functional.jpg',
    color: '#C6FF00',
    equipment: [
      'Vulcan Dual-Stack Cable Crossover Towers',
      '45° Linear Commercial Leg Press & Hack Squat',
      'Indoor Spin & Metabolic Conditioning Bikes',
      'Competition Kettlebells & Multi-Angle Benches',
    ],
    description:
      'High-density hypertrophy and functional strength zone combining dual-pulley cable towers, plate-loaded leg presses, and conditioning bikes.',
    hotspots: [
      {
        id: 'fn-1',
        label: '45° Linear Leg Press',
        detail: 'Heavy-duty sled carriage on linear bearings with 1,000 lb capacity.',
        x: '46%',
        y: '52%',
      },
      {
        id: 'fn-2',
        label: 'Power Cage & Cable Rig',
        detail: 'Multi-station pull-up arch, barbell bays, and dual pulley stacks.',
        x: '68%',
        y: '42%',
      },
      {
        id: 'fn-3',
        label: 'Metabolic Spin & HIIT Bikes',
        detail: 'Magnetic resistance sprint bikes for high-output interval finishers.',
        x: '78%',
        y: '70%',
      },
    ],
  },
  {
    id: 'recovery',
    name: '04. Panoramic Strength & Recovery Studio',
    tagline: 'Natural-Light Cardio Deck, Back Extension & Mobility Zone',
    image: '/assets/gym/zone-recovery.jpg',
    color: '#F5C542',
    equipment: [
      '45° Hyperextension & Posterior Chain Benches',
      'Panoramic Daylight Treadmill & Cooldown Deck',
      'Smith Machine & Guided Hypertrophy Rack',
      'Dedicated Stretching, Foam Rolling & Mobility Floor',
    ],
    description:
      'Sunlit cooldown, core stability, and guided hypertrophy suite designed for post-workout decompression, mobility work, and accessory training.',
    hotspots: [
      {
        id: 'rc-1',
        label: 'Posterior Chain & Core Benches',
        detail: '45° hyperextension and decline core benches for lower-back resilience.',
        x: '54%',
        y: '66%',
      },
      {
        id: 'rc-2',
        label: 'Daylight Cooldown Runners',
        detail: 'Low-impact recovery walking and Zone-2 incline treadmills.',
        x: '42%',
        y: '48%',
      },
      {
        id: 'rc-3',
        label: 'Guided Smith & Accessory Station',
        detail: 'Counter-balanced vertical bar path for isolated hypertrophy work.',
        x: '86%',
        y: '54%',
      },
    ],
  },
];

export default function GymTour3D() {
  const [activeZone, setActiveZone] = useState<GymZoneInfo>(TOUR_ZONES[0]);
  const [activePin, setActivePin] = useState<GymHotspotPin>(TOUR_ZONES[0].hotspots[0]);
  const [zoom, setZoom] = useState<number>(1);

  const handleSelectZone = (zone: GymZoneInfo) => {
    setActiveZone(zone);
    setActivePin(zone.hotspots[0]);
    setZoom(1);
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
      {/* Left Interactive Real-Photo Gym Tour & Clickable Hotspots */}
      <div className="lg:col-span-8 relative h-[500px] sm:h-[540px] rounded-2xl border border-white/20 bg-obsidian overflow-hidden shadow-2xl flex flex-col justify-between">
        {/* Background Real High-Resolution Gym Photograph */}
        <div className="absolute inset-0 overflow-hidden">
          <img
            src={activeZone.image}
            alt={activeZone.name}
            style={{ transform: `scale(${zoom})` }}
            className="w-full h-full object-cover transition-all duration-500 ease-out brightness-105 contrast-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/90 via-obsidian/20 to-obsidian/60 pointer-events-none" />
        </div>

        {/* Top HUD Bar */}
        <div className="relative z-20 p-4 flex flex-wrap items-center justify-between gap-2">
          <div className="px-3.5 py-1.5 rounded-full bg-obsidian/90 backdrop-blur-md border border-white/20 font-mono text-xs text-volt flex items-center gap-2 shadow-lg">
            <Compass className="w-4 h-4 animate-spin" style={{ animationDuration: '8s' }} />
            <span>REAL GYM FLOOR TOUR • CLICK HOTSPOTS ON PHOTO</span>
          </div>

          <button
            onClick={() => setZoom((z) => (z >= 1.4 ? 1 : 1.25))}
            className="px-3 py-1.5 rounded-full bg-obsidian/90 backdrop-blur-md border border-white/20 hover:border-volt text-bone font-mono text-xs flex items-center gap-1.5 transition shadow-lg"
          >
            {zoom > 1 ? (
              <>
                <ZoomOut className="w-3.5 h-3.5 text-volt" /> Reset View
              </>
            ) : (
              <>
                <ZoomIn className="w-3.5 h-3.5 text-volt" /> Zoom Photo
              </>
            )}
          </button>
        </div>

        {/* Interactive Clickable Hotspot Pins Overlaid on Real Gym Photo */}
        <div className="relative z-20 flex-1 w-full">
          {activeZone.hotspots.map((pin, idx) => {
            const isSelected = activePin?.id === pin.id;
            return (
              <div
                key={pin.id}
                style={{ left: pin.x, top: pin.y }}
                className="absolute -translate-x-1/2 -translate-y-1/2"
              >
                <button
                  onClick={() => setActivePin(pin)}
                  className={`group relative flex items-center gap-2 px-3 py-1.5 rounded-full font-mono text-xs transition-all duration-300 shadow-xl border ${
                    isSelected
                      ? 'bg-volt text-obsidian border-volt font-bold scale-110 z-30'
                      : 'bg-obsidian/90 text-bone border-white/30 hover:border-volt hover:scale-105 z-20'
                  }`}
                >
                  <span
                    className={`w-2.5 h-2.5 rounded-full ${
                      isSelected ? 'bg-obsidian animate-ping' : 'bg-volt'
                    }`}
                  />
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="whitespace-nowrap">
                    0{idx + 1}. {pin.label}
                  </span>
                </button>
              </div>
            );
          })}
        </div>

        {/* Bottom Active Hotspot Callout + 4-Zone Real Photo Filmstrip */}
        <div className="relative z-20 p-4 space-y-3 bg-gradient-to-t from-obsidian via-obsidian/90 to-transparent">
          {activePin && (
            <div className="p-3.5 rounded-xl bg-obsidian/95 border border-volt/50 flex flex-col sm:flex-row sm:items-center justify-between gap-2 shadow-lg">
              <div className="flex items-center gap-2.5">
                <Sparkles className="w-4 h-4 text-volt shrink-0" />
                <div>
                  <span className="font-mono text-xs font-bold text-volt uppercase">
                    {activePin.label}:
                  </span>{' '}
                  <span className="text-xs text-bone">{activePin.detail}</span>
                </div>
              </div>
              <span className="font-mono text-[10px] text-muted uppercase shrink-0">
                Spot Verified
              </span>
            </div>
          )}

          {/* 4-Zone Real Photo Thumbnail Switcher */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
            {TOUR_ZONES.map((z) => {
              const isSelected = activeZone.id === z.id;
              return (
                <button
                  key={z.id}
                  onClick={() => handleSelectZone(z)}
                  className={`relative h-16 rounded-xl overflow-hidden border-2 text-left transition group ${
                    isSelected
                      ? 'border-volt shadow-volt scale-[1.02]'
                      : 'border-white/20 opacity-80 hover:opacity-100 hover:border-white/40'
                  }`}
                >
                  <img
                    src={z.image}
                    alt={z.name}
                    className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                  <div className="absolute inset-0 bg-obsidian/65 flex items-end p-2">
                    <span
                      className={`font-mono text-[10px] leading-tight line-clamp-1 ${
                        isSelected ? 'text-volt font-bold' : 'text-bone'
                      }`}
                    >
                      {z.name}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Right Zone Specification Inspector */}
      <div className="lg:col-span-4 rounded-2xl border border-white/20 bg-graphite p-6 flex flex-col justify-between shadow-xl">
        <div>
          <span className="font-mono text-xs text-volt uppercase tracking-widest">
            ACTIVE GYM ZONE // REAL VIEW
          </span>
          <h3 className="font-display text-3xl text-bone mt-1">{activeZone.name}</h3>
          <p className="text-sm text-gold font-medium mt-1">{activeZone.tagline}</p>
          <p className="text-sm text-muted mt-4 leading-relaxed">
            {activeZone.description}
          </p>

          <div className="mt-6 space-y-2.5">
            <p className="font-mono text-xs text-bone uppercase tracking-wider">
              Zone Equipment &amp; Spots:
            </p>
            {activeZone.equipment.map((eq) => (
              <div
                key={eq}
                className="flex items-center gap-2.5 text-sm text-bone bg-obsidian/80 px-3.5 py-2.5 rounded-xl border border-white/10"
              >
                <CheckCircle2 className="w-4 h-4 text-volt shrink-0" />
                <span>{eq}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 mt-6 pt-4 border-t border-white/15">
          {TOUR_ZONES.map((z) => (
            <button
              key={z.id}
              onClick={() => handleSelectZone(z)}
              className={`px-3 py-2 rounded-xl font-mono text-xs text-left truncate border transition ${
                activeZone.id === z.id
                  ? 'bg-volt text-obsidian border-volt font-bold'
                  : 'bg-obsidian/80 text-bone border-white/15 hover:border-volt'
              }`}
            >
              {z.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
