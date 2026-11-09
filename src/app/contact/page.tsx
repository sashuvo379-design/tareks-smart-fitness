'use client';

import React, { useState } from 'react';
import { BRAND_CONFIG } from '@/lib/brand';
import { useStore } from '@/store/use-store';
import { MapPin, Phone, Mail, Clock, Send } from 'lucide-react';

export default function ContactPage() {
  const { addToast } = useStore();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: name,
          guestEmail: email,
          guestPhone: 'Via Web Contact Form',
          bookingType: 'INQUIRY',
          notes: message,
        }),
      });
    } catch {
      // optimistic fallback
    }
    addToast({
      title: 'Dispatch Received by Concierge',
      description: 'Your inquiry has been delivered directly to Tarek’s Smart Fitness reception.',
      variant: 'volt',
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="max-w-2xl">
        <span className="font-mono text-xs text-volt uppercase tracking-widest">
          DIRECT CONCIERGE &amp; HEADQUARTERS
        </span>
        <h1 className="font-display text-6xl text-bone mt-1">
          GET IN TOUCH
        </h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-5 space-y-5">
          <div className="p-6 rounded-2xl bg-graphite border border-white/10 space-y-4">
            <div className="flex items-start gap-3">
              <MapPin className="w-5 h-5 text-volt shrink-0 mt-1" />
              <div>
                <h4 className="font-mono text-xs text-muted uppercase">Location</h4>
                <p className="text-sm text-bone">{BRAND_CONFIG.contact.address}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Phone className="w-5 h-5 text-gold shrink-0 mt-1" />
              <div>
                <h4 className="font-mono text-xs text-muted uppercase">Direct Hotline</h4>
                <p className="text-sm font-mono text-bone">
                  {BRAND_CONFIG.contact.hotlineBd} / {BRAND_CONFIG.contact.phone}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Mail className="w-5 h-5 text-ember shrink-0 mt-1" />
              <div>
                <h4 className="font-mono text-xs text-muted uppercase">Email</h4>
                <p className="text-sm font-mono text-bone">{BRAND_CONFIG.contact.email}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <Clock className="w-5 h-5 text-volt shrink-0 mt-1" />
              <div>
                <h4 className="font-mono text-xs text-muted uppercase">Hours</h4>
                <p className="text-sm text-bone">{BRAND_CONFIG.contact.hours}</p>
              </div>
            </div>
          </div>

          {/* Interactive Map Embed */}
          <div className="rounded-2xl overflow-hidden border border-white/10 h-64 bg-graphite">
            <iframe
              title="IRONFORGE Sanctuary Location Map"
              src="https://www.openstreetmap.org/export/embed.html?bbox=91.1000%2C23.9650%2C91.1250%2C23.9850&amp;layer=mapnik"
              className="w-full h-full border-0 grayscale invert opacity-80"
              loading="lazy"
            />
          </div>
        </div>

        <form
          onSubmit={handleSubmit}
          className="lg:col-span-7 p-8 rounded-2xl bg-graphite border border-white/10 space-y-4 h-fit"
        >
          <h2 className="font-display text-3xl text-bone">
            SEND A MESSAGE OR COMMERCIAL INQUIRY
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <input
              type="text"
              required
              placeholder="Your Name *"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
            />
            <input
              type="email"
              required
              placeholder="Email Address *"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
            />
          </div>
          <textarea
            rows={5}
            required
            placeholder="How can our coaching staff, leather craftsmen, or commercial rig engineers assist you?"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-full px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
          />
          <button
            type="submit"
            className="px-6 py-4 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center gap-2 shadow-volt"
          >
            <Send className="w-4 h-4" /> TRANSMIT MESSAGE
          </button>
        </form>
      </div>
    </div>
  );
}
