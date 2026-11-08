'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/store/use-store';
import {
  SEED_WALLETS,
  SEED_MACHINERY,
  SEED_TRAINERS,
  SEED_BLOG_POSTS,
} from '@/lib/seed-data';
import { formatPrice } from '@/lib/utils';
import { Search, X, ArrowUpRight, Dumbbell, Wallet, FileText, UserCheck } from 'lucide-react';

export default function CommandSearchModal() {
  const router = useRouter();
  const { isSearchOpen, setSearchOpen, currency } = useStore();
  const [query, setQuery] = useState('');

  if (!isSearchOpen) return null;

  const q = query.trim().toLowerCase();

  const matchedWallets = SEED_WALLETS.filter(
    (w) =>
      w.name.toLowerCase().includes(q) ||
      w.category.toLowerCase().includes(q) ||
      w.shortDesc.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchedMachinery = SEED_MACHINERY.filter(
    (m) =>
      m.name.toLowerCase().includes(q) ||
      m.category.toLowerCase().includes(q) ||
      m.shortDesc.toLowerCase().includes(q)
  ).slice(0, 4);

  const matchedTrainers = SEED_TRAINERS.filter(
    (t) =>
      t.name.toLowerCase().includes(q) || t.specialty.toLowerCase().includes(q)
  ).slice(0, 2);

  const matchedBlogs = SEED_BLOG_POSTS.filter(
    (b) =>
      b.title.toLowerCase().includes(q) || b.category.toLowerCase().includes(q)
  ).slice(0, 3);

  const go = (href: string) => {
    setSearchOpen(false);
    setQuery('');
    router.push(href);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      <div
        onClick={() => setSearchOpen(false)}
        className="fixed inset-0 bg-black/80 backdrop-blur-md"
      />
      <div className="relative z-10 w-full max-w-2xl rounded-2xl bg-graphite border border-white/15 shadow-2xl overflow-hidden">
        {/* Search Input Bar */}
        <div className="flex items-center gap-3 px-5 py-4 bg-obsidian border-b border-white/10">
          <Search className="w-5 h-5 text-volt shrink-0" />
          <input
            type="text"
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search wallets, power racks, StairMaster, trainers, articles..."
            className="w-full bg-transparent text-bone placeholder:text-muted text-sm focus:outline-none"
          />
          <button
            onClick={() => setSearchOpen(false)}
            className="p-1.5 rounded-lg bg-graphite text-muted hover:text-bone"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Results */}
        <div className="max-h-[65vh] overflow-y-auto p-4 space-y-5">
          {matchedMachinery.length > 0 && (
            <div>
              <p className="px-2 font-mono text-[11px] text-ember uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Dumbbell className="w-3.5 h-3.5" /> Gym Machinery
              </p>
              <div className="space-y-1">
                {matchedMachinery.map((m) => (
                  <button
                    key={m.slug}
                    onClick={() => go(`/product/${m.slug}`)}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-obsidian/80 flex items-center justify-between text-left transition group"
                  >
                    <div>
                      <p className="text-sm font-medium text-bone group-hover:text-volt">
                        {m.name}
                      </p>
                      <span className="text-xs text-muted">{m.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-volt">
                        {formatPrice(m.price, currency)}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-volt" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedWallets.length > 0 && (
            <div>
              <p className="px-2 font-mono text-[11px] text-gold uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <Wallet className="w-3.5 h-3.5" /> Heritage Leather Wallets
              </p>
              <div className="space-y-1">
                {matchedWallets.map((w) => (
                  <button
                    key={w.slug}
                    onClick={() => go(`/product/${w.slug}`)}
                    className="w-full px-3 py-2.5 rounded-xl hover:bg-obsidian/80 flex items-center justify-between text-left transition group"
                  >
                    <div>
                      <p className="text-sm font-medium text-bone group-hover:text-gold">
                        {w.name}
                      </p>
                      <span className="text-xs text-muted">{w.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs text-gold">
                        {formatPrice(w.price, currency)}
                      </span>
                      <ArrowUpRight className="w-4 h-4 text-muted group-hover:text-gold" />
                    </div>
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedTrainers.length > 0 && (
            <div>
              <p className="px-2 font-mono text-[11px] text-volt uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <UserCheck className="w-3.5 h-3.5" /> Master Coaches
              </p>
              <div className="space-y-1">
                {matchedTrainers.map((t) => (
                  <button
                    key={t.slug}
                    onClick={() => go('/gym#trainers')}
                    className="w-full px-3 py-2 rounded-xl hover:bg-obsidian/80 flex items-center justify-between text-left"
                  >
                    <div>
                      <p className="text-sm font-medium text-bone">{t.name}</p>
                      <span className="text-xs text-muted">{t.specialty}</span>
                    </div>
                    <ArrowUpRight className="w-4 h-4 text-muted" />
                  </button>
                ))}
              </div>
            </div>
          )}

          {matchedBlogs.length > 0 && (
            <div>
              <p className="px-2 font-mono text-[11px] text-muted uppercase tracking-wider mb-2 flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Journal &amp; Buying Guides
              </p>
              <div className="space-y-1">
                {matchedBlogs.map((b) => (
                  <button
                    key={b.slug}
                    onClick={() => go(`/blog/${b.slug}`)}
                    className="w-full px-3 py-2 rounded-xl hover:bg-obsidian/80 flex items-center justify-between text-left"
                  >
                    <p className="text-sm text-bone truncate pr-4">{b.title}</p>
                    <span className="font-mono text-[10px] text-volt shrink-0">
                      {b.readTime}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
