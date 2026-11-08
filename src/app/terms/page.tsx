import React from 'react';
import { BRAND_CONFIG } from '@/lib/brand';

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <span className="font-mono text-xs text-volt uppercase">TERMS OF SERVICE</span>
      <h1 className="font-display text-5xl text-bone">TERMS &amp; CONDITIONS</h1>
      <div className="p-8 rounded-2xl bg-graphite border border-white/10 space-y-4 text-sm text-muted leading-relaxed">
        <p>
          <strong className="text-bone">1. Sanctuary Conduct &amp; Safety:</strong> All athletes using {BRAND_CONFIG.name} free weights and power cages must use safety spotter arms or collars during maximal attempts.
        </p>
        <p>
          <strong className="text-bone">2. Custom Engraved Wallets:</strong> Bespoke monogrammed full-grain wallets are made to order and covered under our Lifetime Stitch &amp; RFID Warranty.
        </p>
        <p>
          <strong className="text-bone">3. Commercial Machinery Freight:</strong> Heavy 11-gauge equipment orders include insured pallet freight and optional white-glove floor installation.
        </p>
      </div>
    </div>
  );
}
