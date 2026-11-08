'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { SEED_MACHINERY } from '@/lib/seed-data';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/store/ProductCard';
import {
  Wrench,
  ShieldCheck,
  Calculator,
  Building2,
  SlidersHorizontal,
} from 'lucide-react';

const Product3DViewer = dynamic(
  () => import('@/components/three/Product3DViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[430px] rounded-2xl bg-graphite animate-pulse flex items-center justify-center font-mono text-xs text-ember">
        LOADING 3D ENGINEERING CAD VIEWER...
      </div>
    ),
  }
);

const MACHINERY_CATEGORIES = [
  'All',
  'Racks',
  'Treadmills',
  'Cable Machines',
  'Cardio',
  'Benches',
  'Barbells & Plates',
  'Full Home-Gym Bundles',
];

export default function MachineryStorePage() {
  const { currency, addToast } = useStore();
  const [category, setCategory] = useState('All');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc'>('featured');
  const [selectedMachine, setSelectedMachine] = useState(SEED_MACHINERY[0]);
  const [selectedColor, setSelectedColor] = useState(SEED_MACHINERY[0].colors[0]);

  // Commercial Bulk Quote State
  const [facilityName, setFacilityName] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [spaceSqm, setSpaceSqm] = useState('120');

  const filteredMachinery = useMemo(() => {
    return SEED_MACHINERY.filter(
      (m) => category === 'All' || m.category === category
    ).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      return Number(b.featured) - Number(a.featured);
    });
  }, [category, sortBy]);

  const handleQuoteSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    addToast({
      title: 'Commercial CAD & Bulk Quote Requested',
      description: `Our engineering team will prepare a 3D floor layout for ${facilityName} (${spaceSqm} m²).`,
      variant: 'volt',
    });
    setFacilityName('');
    setContactEmail('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-ember/15 border border-ember/40 text-ember font-mono text-xs uppercase tracking-widest">
          PILLAR 03 // FORGE ARMORY ENGINEERING
        </span>
        <h1 className="font-display text-6xl sm:text-7xl text-bone leading-none">
          COMMERCIAL &amp; HOME <span className="text-ember">GYM MACHINERY</span>
        </h1>
        <p className="text-muted text-base sm:text-lg">
          3x3&quot; 11-gauge laser-cut power cages, vulcanized slat-belt treadmills, Ascent StairClimbers, and calibrated powerlifting sets. Compare up to 3 machines side by side.
        </p>
      </div>

      {/* 1. Interactive 3D CAD & Powder-Coat Customizer */}
      <section className="rounded-3xl bg-graphite border border-ember/30 p-6 lg:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <Product3DViewer
              pillar="MACHINERY"
              modelType={selectedMachine.model3dType}
              colorHex={selectedColor.hex}
              colorName={selectedColor.name}
              productName={selectedMachine.name}
              dimensionsText={selectedMachine.specs.Dimensions}
              image={selectedMachine.image}
              gallery={selectedMachine.gallery}
            />
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="font-mono text-xs text-ember uppercase tracking-widest">
                3D CAD &amp; POWDER-COAT INSPECTOR
              </span>
              <h2 className="font-display text-3xl text-bone mt-1">
                {selectedMachine.name}
              </h2>
              <div className="flex items-baseline gap-3 mt-1">
                <span className="font-mono text-2xl font-bold text-volt">
                  {formatPrice(selectedMachine.price, currency)}
                </span>
                <span className="font-mono text-xs text-muted">
                  or {formatPrice(Math.round(selectedMachine.price / 12), currency)}/mo (0% APR 12-Mo EMI)
                </span>
              </div>
            </div>

            <div>
              <label className="font-mono text-xs text-muted uppercase block mb-2">
                Inspect Machine in 3D:
              </label>
              <select
                value={selectedMachine.slug}
                onChange={(e) => {
                  const found = SEED_MACHINERY.find((m) => m.slug === e.target.value);
                  if (found) setSelectedMachine(found);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-white/15 text-xs font-mono text-bone"
              >
                {SEED_MACHINERY.map((m) => (
                  <option key={m.slug} value={m.slug}>
                    {m.name} ({m.category})
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="font-mono text-xs text-muted uppercase block mb-2">
                Frame Powder-Coat Finish: <strong className="text-bone">{selectedColor.name}</strong>
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedMachine.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-2 border ${
                      selectedColor.name === c.name
                        ? 'border-volt bg-volt/15 text-volt font-bold'
                        : 'border-white/10 bg-obsidian text-muted'
                    }`}
                  >
                    <span
                      className="w-3.5 h-3.5 rounded-full border border-white/30"
                      style={{ backgroundColor: c.hex }}
                    />
                    {c.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Technical Spec Table Preview */}
            <div className="rounded-2xl bg-obsidian p-4 border border-white/10 space-y-2 text-xs font-mono">
              {Object.entries(selectedMachine.specs).map(([k, v]) => (
                <div key={k} className="flex justify-between border-b border-white/5 pb-1.5 last:border-none last:pb-0">
                  <span className="text-muted">{k}:</span>
                  <span className="text-bone text-right">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 2. Category Filter & 16 Machinery Grid */}
      <section>
        <div className="p-5 rounded-2xl bg-graphite border border-white/10 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {MACHINERY_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-3.5 py-2 rounded-xl font-mono text-xs transition ${
                  category === cat
                    ? 'bg-ember text-obsidian font-bold shadow-ember'
                    : 'bg-obsidian text-muted hover:text-bone border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
            className="px-3.5 py-2 rounded-xl bg-obsidian border border-white/10 text-xs font-mono text-bone"
          >
            <option value="featured">Sort: Featured Armory</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredMachinery.map((m) => (
            <ProductCard key={m.slug} product={m} />
          ))}
        </div>
      </section>

      {/* 3. Commercial B2B Quote & Custom Facility CAD Layout */}
      <section
        id="quote"
        className="rounded-3xl bg-gradient-to-r from-obsidian via-graphite to-obsidian border border-ember/40 p-8 lg:p-12"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7 space-y-3">
            <span className="font-mono text-xs text-ember uppercase tracking-widest flex items-center gap-2">
              <Building2 className="w-4 h-4" /> B2B COMMERCIAL OUTFITTING &amp; 0% EMI
            </span>
            <h2 className="font-display text-4xl sm:text-5xl text-bone">
              OUTFITTING A COMMERCIAL GYM, HOTEL, OR STUDIO?
            </h2>
            <p className="text-sm text-muted max-w-xl">
              Request wholesale fleet pricing, complimentary 3D CAD floor planning, custom laser-cut rack branding, and white-glove technician installation.
            </p>
          </div>

          <form onSubmit={handleQuoteSubmit} className="lg:col-span-5 space-y-3">
            <input
              type="text"
              required
              placeholder="Gym / Organization Name *"
              value={facilityName}
              onChange={(e) => setFacilityName(e.target.value)}
              className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
            />
            <div className="grid grid-cols-2 gap-3">
              <input
                type="email"
                required
                placeholder="Work Email *"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
              <input
                type="number"
                required
                placeholder="Floor Area (m²)"
                value={spaceSqm}
                onChange={(e) => setSpaceSqm(e.target.value)}
                className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone font-mono"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-ember text-obsidian font-mono font-bold text-xs shadow-ember hover:brightness-110 transition"
            >
              REQUEST COMMERCIAL QUOTE &amp; 3D CAD LAYOUT
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
