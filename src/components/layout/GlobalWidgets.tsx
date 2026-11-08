'use client';

import React, { useState, useEffect } from 'react';
import { useStore } from '@/store/use-store';
import { BRAND_CONFIG } from '@/lib/brand';
import { MessageCircle, PhoneCall, X, Cookie } from 'lucide-react';

export default function GlobalWidgets() {
  const { toasts, removeToast, soundEnabled } = useStore();
  const [cookieAccepted, setCookieAccepted] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem('ironforge-cookie-consent');
    if (!saved) setCookieAccepted(false);
  }, []);

  // Optional Subtle Web Audio Tactile Click when soundEnabled is true
  useEffect(() => {
    if (!soundEnabled) return;
    const handleClick = () => {
      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        const ctx = new AudioCtx();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(520, ctx.currentTime);
        gain.gain.setValueAtTime(0.03, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.05);
      } catch {
        // Ignore audio errors
      }
    };
    window.addEventListener('click', handleClick);
    return () => window.removeEventListener('click', handleClick);
  }, [soundEnabled]);

  const acceptCookies = () => {
    localStorage.setItem('ironforge-cookie-consent', 'accepted');
    setCookieAccepted(true);
  };

  return (
    <>
      {/* Toast Notifications Stack */}
      <div className="fixed top-24 right-4 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
        {toasts.map((t) => {
          const borderClass =
            t.variant === 'gold'
              ? 'border-l-4 border-l-gold border-white/15'
              : t.variant === 'ember'
              ? 'border-l-4 border-l-ember border-white/15'
              : 'border-l-4 border-l-volt border-white/15';
          return (
            <div
              key={t.id}
              className={`pointer-events-auto p-4 rounded-xl bg-obsidian/95 backdrop-blur-xl border ${borderClass} shadow-2xl flex items-start justify-between gap-3`}
            >
              <div>
                <p className="text-sm font-semibold text-bone">{t.title}</p>
                {t.description && (
                  <p className="text-xs text-muted mt-0.5">{t.description}</p>
                )}
              </div>
              <button
                onClick={() => removeToast(t.id)}
                className="text-muted hover:text-bone"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          );
        })}
      </div>

      {/* Floating WhatsApp & Direct Call Concierge */}
      <div className="fixed bottom-6 right-5 z-40 flex flex-col gap-2.5">
        <a
          href={`tel:${BRAND_CONFIG.contact.hotlineBd}`}
          aria-label="Call Concierge"
          title="Click to Call Concierge"
          className="w-12 h-12 rounded-full bg-graphite hover:bg-elevated border border-white/15 text-volt flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <PhoneCall className="w-5 h-5" />
        </a>
        <a
          href={`https://wa.me/${BRAND_CONFIG.contact.whatsapp}`}
          target="_blank"
          rel="noreferrer"
          aria-label="Chat on WhatsApp"
          title="WhatsApp Concierge"
          className="w-12 h-12 rounded-full bg-[#25D366] text-obsidian flex items-center justify-center shadow-lg hover:scale-105 transition"
        >
          <MessageCircle className="w-6 h-6 fill-current" />
        </a>
      </div>

      {/* Cookie Consent Banner */}
      {!cookieAccepted && (
        <div className="fixed bottom-4 left-4 z-50 max-w-md p-4 rounded-2xl bg-graphite/95 backdrop-blur-xl border border-white/15 shadow-2xl flex items-center justify-between gap-4">
          <div className="flex items-start gap-3">
            <Cookie className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="text-xs text-muted leading-relaxed">
              We use privacy-first analytics (Plausible) and local storage for your 3D preferences &amp; cart.
            </p>
          </div>
          <button
            onClick={acceptCookies}
            className="px-3.5 py-2 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs shrink-0"
          >
            Accept
          </button>
        </div>
      )}
    </>
  );
}
