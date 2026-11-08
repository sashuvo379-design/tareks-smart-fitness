import React from 'react';

export default function WarrantyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <span className="font-mono text-xs text-gold uppercase">IRONCLAD GUARANTEE</span>
      <h1 className="font-display text-5xl text-bone">
        RETURNS &amp; LIFETIME STRUCTURAL WARRANTY
      </h1>
      <div className="p-8 rounded-2xl bg-graphite border border-white/10 space-y-4 text-sm text-muted leading-relaxed">
        <p>
          <strong className="text-bone">30-Day Trial Return Policy:</strong> Non-engraved wallets and unbolted home gym equipment may be returned within 30 days of delivery for a full refund or exchange.
        </p>
        <p>
          <strong className="text-bone">Lifetime Leather Stitch Guarantee:</strong> If the waxed linen or Kevlar stitching on your IRONFORGE wallet ever frays, we repair or replace it free of charge for life.
        </p>
        <p>
          <strong className="text-bone">11-Gauge Steel Frame Warranty:</strong> All Colossus Power Racks, Monolith Benches, and Olympus 210K PSI Barbells carry a lifetime structural warranty against bending or weld failure.
        </p>
      </div>
    </div>
  );
}
