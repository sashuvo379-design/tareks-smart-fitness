import React from 'react';
import { BRAND_CONFIG } from '@/lib/brand';

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-16 space-y-6">
      <span className="font-mono text-xs text-volt uppercase">LEGAL &amp; DATA PROTECTION</span>
      <h1 className="font-display text-5xl text-bone">PRIVACY POLICY</h1>
      <div className="p-8 rounded-2xl bg-graphite border border-white/10 space-y-4 text-sm text-muted leading-relaxed">
        <p>
          <strong className="text-bone">1. Privacy-First Telemetry:</strong> {BRAND_CONFIG.legalName} uses cookie-free Plausible analytics and local browser storage for your cart, wishlist, and 3D hardware acceleration preferences.
        </p>
        <p>
          <strong className="text-bone">2. Order &amp; Biometric Data:</strong> Information provided during checkout or 3-day QR pass registration is encrypted at rest and never sold to third-party brokers.
        </p>
        <p>
          <strong className="text-bone">3. Payment Security:</strong> All card and mobile wallet transactions are processed via PCI-DSS Level 1 compliant gateways (Stripe, bKash, SSLCommerz).
        </p>
      </div>
    </div>
  );
}
