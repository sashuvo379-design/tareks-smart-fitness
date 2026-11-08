'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/lib/brand';
import { useStore } from '@/store/use-store';
import { Dumbbell, ArrowRight, Shield, Truck, Award } from 'lucide-react';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { addToast } = useStore();

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.includes('@')) return;
    addToast({
      title: 'Welcome to the Forge Dispatch',
      description: 'Your 10% welcome code is IRON10.',
      variant: 'volt',
    });
    setEmail('');
  };

  return (
    <footer className="bg-obsidian border-t border-white/10 pt-16 pb-12 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Trust Guarantees Bar */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pb-12 mb-12 border-b border-white/10">
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-graphite/60 border border-white/5">
            <Shield className="w-8 h-8 text-volt shrink-0" />
            <div>
              <h4 className="font-display text-lg text-bone">LIFETIME STRUCTURAL WARRANTY</h4>
              <p className="text-xs text-muted">11-Gauge steel frames &amp; saddle-stitched leather seams</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-graphite/60 border border-white/5">
            <Truck className="w-8 h-8 text-gold shrink-0" />
            <div>
              <h4 className="font-display text-lg text-bone">GLOBAL &amp; WHITE-GLOVE DELIVERY</h4>
              <p className="text-xs text-muted">Express courier for wallets • On-site rig assembly for gyms</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-2xl bg-graphite/60 border border-white/5">
            <Award className="w-8 h-8 text-ember shrink-0" />
            <div>
              <h4 className="font-display text-lg text-bone">100% FULL-GRAIN &amp; CALIBRATED</h4>
              <p className="text-xs text-muted">Zero synthetic leather • +/- 10g CNC calibrated iron</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12">
          {/* Brand Column */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-volt text-obsidian flex items-center justify-center font-bold">
                <Dumbbell className="w-5 h-5" />
              </div>
              <span className="font-display text-3xl text-bone tracking-wider">
                {BRAND_CONFIG.name}
              </span>
            </Link>
            <p className="text-sm text-muted max-w-sm leading-relaxed">
              {BRAND_CONFIG.tagline} — {BRAND_CONFIG.description}
            </p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm pt-2">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email for 10% VIP code..."
                className="flex-1 px-4 py-2.5 rounded-xl bg-graphite border border-white/15 text-xs text-bone"
              />
              <button
                type="submit"
                className="px-4 py-2.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center gap-1"
              >
                JOIN <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
          </div>

          {/* Pillar 1 & 2 */}
          <div>
            <h4 className="font-mono text-xs text-volt uppercase tracking-widest mb-4">
              Pillar 01 &amp; 02
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/gym" className="hover:text-volt">Gym Sanctuary &amp; 3D Tour</Link></li>
              <li><Link href="/workout-generator" className="hover:text-volt text-volt font-semibold">⚡ Workout Plan Generator</Link></li>
              <li><Link href="/gym#timetable" className="hover:text-volt">Class Timetable</Link></li>
              <li><Link href="/gym#memberships" className="hover:text-volt">Membership Plans</Link></li>
              <li><Link href="/wallets" className="hover:text-gold">Full-Grain Wallet Store</Link></li>
              <li><Link href="/wallets?category=Bifold" className="hover:text-gold">Bifold &amp; Cordovan</Link></li>
              <li><Link href="/wallets?category=RFID-safe" className="hover:text-gold">RFID Faraday Series</Link></li>
            </ul>
          </div>

          {/* Pillar 3 & Journal */}
          <div>
            <h4 className="font-mono text-xs text-ember uppercase tracking-widest mb-4">
              Pillar 03 // Armory
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/machinery" className="hover:text-ember">Commercial Machinery</Link></li>
              <li><Link href="/machinery?category=Racks" className="hover:text-ember">Power Racks &amp; Cages</Link></li>
              <li><Link href="/machinery?category=Cardio" className="hover:text-ember">StairMaster &amp; Slat Runners</Link></li>
              <li><Link href="/machinery#quote" className="hover:text-ember">Commercial Bulk Quote</Link></li>
              <li><Link href="/blog" className="hover:text-bone">R&amp;D Journal &amp; Guides</Link></li>
              <li><Link href="/admin" className="hover:text-bone">Admin Command Center</Link></li>
            </ul>
          </div>

          {/* Company & Legal */}
          <div>
            <h4 className="font-mono text-xs text-bone uppercase tracking-widest mb-4">
              Company &amp; Legal
            </h4>
            <ul className="space-y-2.5 text-sm text-muted">
              <li><Link href="/about" className="hover:text-bone">About {BRAND_CONFIG.name}</Link></li>
              <li><Link href="/contact" className="hover:text-bone">Contact &amp; Locations</Link></li>
              <li><Link href="/careers" className="hover:text-bone">Careers at the Forge</Link></li>
              <li><Link href="/warranty" className="hover:text-bone">Returns &amp; Lifetime Warranty</Link></li>
              <li><Link href="/privacy" className="hover:text-bone">Privacy Policy</Link></li>
              <li><Link href="/terms" className="hover:text-bone">Terms of Service</Link></li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-muted font-mono">
          <p>
            &copy; {new Date().getFullYear()} {BRAND_CONFIG.legalName}. All rights reserved.
          </p>
          <p className="text-volt">
            HOTLINE: {BRAND_CONFIG.contact.hotlineBd} • {BRAND_CONFIG.contact.hours}
          </p>
        </div>
      </div>
    </footer>
  );
}
