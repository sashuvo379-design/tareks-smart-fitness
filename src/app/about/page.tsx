import React from 'react';
import Link from 'next/link';
import { BRAND_CONFIG } from '@/lib/brand';
import { Shield, Flame, Award, ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-16">
      <div className="max-w-3xl space-y-4">
        <span className="font-mono text-xs text-volt uppercase tracking-widest">
          OUR MANIFESTO // EST. {BRAND_CONFIG.foundedYear}
        </span>
        <h1 className="font-display text-6xl sm:text-7xl text-bone leading-none">
          BUILT AGAINST DISPOSABLE CULTURE
        </h1>
        <p className="text-lg text-muted leading-relaxed">
          {BRAND_CONFIG.name} was born from a simple observation: modern training facilities, everyday leather goods, and home gym machines have been diluted by cheap plastics and planned obsolescence. We build for those who demand lifetime permanence—in their physique, in their pocket, and on their lifting platform.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="p-8 rounded-2xl bg-graphite border border-white/10 space-y-3">
          <Flame className="w-8 h-8 text-volt" />
          <h3 className="font-display text-3xl text-bone">01. THE SANCTUARY</h3>
          <p className="text-sm text-muted leading-relaxed">
            Calibrated competition plates, Ascent StairMaster conditioning decks, and CSCS-certified strength coaches dedicated to measurable progression.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-graphite border border-white/10 space-y-3">
          <Award className="w-8 h-8 text-gold" />
          <h3 className="font-display text-3xl text-bone">02. THE ATELIER</h3>
          <p className="text-sm text-muted leading-relaxed">
            Every wallet is cut from the top 5% of full-grain vegetable-tanned Tuscan hides and Shell Cordovan, saddle-stitched with waxed linen thread.
          </p>
        </div>
        <div className="p-8 rounded-2xl bg-graphite border border-white/10 space-y-3">
          <Shield className="w-8 h-8 text-ember" />
          <h3 className="font-display text-3xl text-bone">03. THE ARMORY</h3>
          <p className="text-sm text-muted leading-relaxed">
            Laser-cut 3x3&quot; 11-gauge structural steel cages and 210,000 PSI alloy bars engineered for commercial clubs and serious home sanctuaries.
          </p>
        </div>
      </div>

      <div className="p-8 rounded-3xl bg-obsidian border border-volt/30 flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="font-display text-3xl text-bone">
            EXPERIENCE THE ECOSYSTEM IN PERSON OR ONLINE
          </h3>
          <p className="text-sm text-muted">
            {BRAND_CONFIG.contact.address} • {BRAND_CONFIG.contact.hours}
          </p>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center gap-2 shrink-0"
        >
          CONTACT CONCIERGE <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
