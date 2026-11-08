'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useStore } from '@/store/use-store';
import { BRAND_CONFIG, I18N_DICTIONARY } from '@/lib/brand';
import {
  Dumbbell,
  Search,
  ShoppingBag,
  Heart,
  User,
  Volume2,
  VolumeX,
  Menu,
  X,
  ShieldCheck,
  Globe,
} from 'lucide-react';

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const {
    cart,
    wishlist,
    setCartOpen,
    currency,
    setCurrency,
    locale,
    setLocale,
    soundEnabled,
    setSoundEnabled,
    setSearchOpen,
  } = useStore();

  const t = I18N_DICTIONARY[locale].nav;
  const totalCartQty = cart.reduce((acc, item) => acc + item.qty, 0);

  // Cmd/Ctrl + K global shortcut
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setSearchOpen(true);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [setSearchOpen]);

  const navLinks = [
    { href: '/', label: t.home },
    { href: '/gym', label: t.gym, accent: 'hover:text-volt' },
    { href: '/workout-generator', label: t.workoutPlan, accent: 'hover:text-volt', badge: 'AI' },
    { href: '/wallets', label: t.wallets, accent: 'hover:text-gold' },
    { href: '/machinery', label: t.machinery, accent: 'hover:text-ember' },
    { href: '/blog', label: t.blog },
    { href: '/about', label: t.about },
    { href: '/contact', label: t.contact },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50 h-20 bg-obsidian/85 backdrop-blur-xl border-b border-white/10">
      <div className="max-w-7xl mx-auto h-full px-4 sm:px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Identity */}
        <Link href="/" className="flex items-center gap-3 group shrink-0">
          <div className="w-10 h-10 rounded-xl bg-volt text-obsidian flex items-center justify-center shadow-volt group-hover:scale-105 transition">
            <Dumbbell className="w-5 h-5 stroke-[2.5]" />
          </div>
          <div>
            <span className="font-display text-2xl tracking-wider text-bone block leading-none">
              {BRAND_CONFIG.name}
            </span>
            <span className="font-mono text-[10px] tracking-widest text-volt uppercase block mt-0.5">
              STRENGTH • LEATHER • IRON
            </span>
          </div>
        </Link>

        {/* Desktop Links */}
        <nav aria-label="Main Navigation" className="hidden xl:flex items-center gap-6">
          {navLinks.map((link) => {
            const active =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm font-medium transition flex items-center gap-1.5 ${
                  active
                    ? 'text-volt font-semibold'
                    : `text-muted ${link.accent || 'hover:text-bone'}`
                }`}
              >
                <span>{link.label}</span>
                {'badge' in link && (
                  <span className="px-1.5 py-0.5 rounded bg-volt/20 border border-volt/40 text-[9px] font-mono text-volt font-bold">
                    {link.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Action Bar */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Cmd+K Search Trigger */}
          <button
            onClick={() => setSearchOpen(true)}
            aria-label="Open Global Search"
            className="px-3 py-2 rounded-xl bg-graphite hover:bg-elevated border border-white/10 text-muted hover:text-bone text-xs font-mono flex items-center gap-2 transition"
          >
            <Search className="w-4 h-4 text-volt" />
            <span className="hidden md:inline">Search...</span>
            <kbd className="hidden sm:inline px-1.5 py-0.5 text-[10px] rounded bg-obsidian border border-white/10 text-muted">
              ⌘K
            </kbd>
          </button>

          {/* Currency Selector */}
          <select
            aria-label="Select Currency"
            value={currency}
            onChange={(e) => setCurrency(e.target.value as 'USD' | 'BDT' | 'EUR')}
            className="hidden sm:block px-2.5 py-2 rounded-xl bg-graphite border border-white/10 text-xs font-mono text-bone cursor-pointer"
          >
            <option value="USD">USD ($)</option>
            <option value="BDT">BDT (৳)</option>
            <option value="EUR">EUR (€)</option>
          </select>

          {/* Language Toggle (EN / BN) */}
          <button
            onClick={() => setLocale(locale === 'en' ? 'bn' : 'en')}
            aria-label="Toggle Language"
            className="hidden sm:flex px-2.5 py-2 rounded-xl bg-graphite hover:bg-elevated border border-white/10 text-xs font-mono text-bone items-center gap-1"
            title="Switch Language (English / বাংলা)"
          >
            <Globe className="w-3.5 h-3.5 text-volt" />
            {locale.toUpperCase()}
          </button>

          {/* Sound Toggle */}
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            aria-label="Toggle UI Sound"
            className="hidden md:flex p-2 rounded-xl bg-graphite hover:bg-elevated border border-white/10 text-muted hover:text-bone transition"
            title={soundEnabled ? 'Mute UI Sound' : 'Enable Tactile UI Audio'}
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-volt" />
            ) : (
              <VolumeX className="w-4 h-4" />
            )}
          </button>

          {/* Account Dashboard */}
          <Link
            href="/dashboard"
            aria-label="Account Dashboard"
            className="p-2 rounded-xl bg-graphite hover:bg-elevated border border-white/10 text-muted hover:text-bone relative transition"
            title="Member Dashboard & Wishlist"
          >
            <User className="w-4 h-4" />
            {wishlist.length > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-gold text-obsidian font-mono font-bold text-[10px] flex items-center justify-center">
                {wishlist.length}
              </span>
            )}
          </Link>

          {/* Admin Panel Link */}
          <Link
            href="/admin"
            aria-label="Admin Portal"
            className="hidden sm:flex p-2 rounded-xl bg-graphite hover:bg-elevated border border-white/10 text-muted hover:text-ember transition"
            title="Admin Command Center"
          >
            <ShieldCheck className="w-4 h-4" />
          </Link>

          {/* Slide-Out Cart Trigger */}
          <button
            onClick={() => setCartOpen(true)}
            aria-label="Open Shopping Cart"
            className="relative px-3.5 py-2 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center gap-1.5 shadow-volt hover:brightness-110 transition"
          >
            <ShoppingBag className="w-4 h-4 stroke-[2.2]" />
            <span>{totalCartQty}</span>
          </button>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label="Toggle Menu"
            className="xl:hidden p-2 rounded-xl bg-graphite border border-white/10 text-bone"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="xl:hidden bg-obsidian/98 border-b border-white/10 px-6 py-5 space-y-3">
          <div className="grid grid-cols-2 gap-2 pb-3 border-b border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-2 rounded-lg bg-graphite text-bone text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="px-3 py-2 rounded-lg bg-ember/15 border border-ember/30 text-ember text-sm font-medium"
            >
              {t.admin}
            </Link>
          </div>
          <div className="flex items-center justify-between pt-1">
            <div className="flex gap-2">
              {(['USD', 'BDT', 'EUR'] as const).map((c) => (
                <button
                  key={c}
                  onClick={() => setCurrency(c)}
                  className={`px-2.5 py-1 rounded text-xs font-mono ${
                    currency === c ? 'bg-volt text-obsidian font-bold' : 'bg-graphite text-muted'
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
            <button
              onClick={() => setLocale(locale === 'en' ? 'bn' : 'en')}
              className="px-3 py-1 rounded bg-graphite text-xs font-mono text-volt border border-volt/30"
            >
              {locale === 'en' ? 'বাংলা (BN)' : 'English (EN)'}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
