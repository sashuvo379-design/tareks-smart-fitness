'use client';

import React, { useState, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { SEED_WALLETS } from '@/lib/seed-data';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/store/ProductCard';
import { Sparkles, Gift, Shield, SlidersHorizontal, ShoppingBag } from 'lucide-react';

const Product3DViewer = dynamic(
  () => import('@/components/three/Product3DViewer'),
  {
    ssr: false,
    loading: () => (
      <div className="h-[430px] rounded-2xl bg-graphite animate-pulse flex items-center justify-center font-mono text-xs text-gold">
        LOADING 3D LEATHER STUDIO...
      </div>
    ),
  }
);

const WALLET_CATEGORIES = ['All', 'Bifold', 'Slim', 'Cardholder', 'Travel', 'RFID-safe'];

export default function WalletStorePage() {
  const { addToCart, currency } = useStore();

  // Filter & Sort State
  const [category, setCategory] = useState('All');
  const [maxPrice, setMaxPrice] = useState(250);
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');

  // Interactive 3D Customizer & Engraving State
  const [selectedWallet, setSelectedWallet] = useState(SEED_WALLETS[0]);
  const [selectedColor, setSelectedColor] = useState(SEED_WALLETS[0].colors[1]);
  const [engravingText, setEngravingText] = useState('A.M. // VII');
  const [giftWrap, setGiftWrap] = useState(true);

  const filteredWallets = useMemo(() => {
    return SEED_WALLETS.filter((w) => {
      if (category !== 'All' && w.category !== category) return false;
      if (w.price > maxPrice) return false;
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return Number(b.featured) - Number(a.featured);
    });
  }, [category, maxPrice, sortBy]);

  const handleAddCustomWallet = () => {
    addToCart({
      slug: selectedWallet.slug,
      name: selectedWallet.name,
      pillar: 'WALLET',
      price: selectedWallet.price,
      image: selectedWallet.image,
      sku: selectedWallet.sku,
      qty: 1,
      selectedColor: selectedColor.name,
      engravingText: engravingText.trim() || undefined,
      giftPackaging: giftWrap,
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-gold/15 border border-gold/40 text-gold font-mono text-xs uppercase tracking-widest">
          PILLAR 02 // HERITAGE LEATHER ATELIER
        </span>
        <h1 className="font-display text-6xl sm:text-7xl text-bone leading-none">
          HANDCRAFTED <span className="text-gold">FULL-GRAIN WALLETS</span>
        </h1>
        <p className="text-muted text-base sm:text-lg">
          Vegetable-tanned Tuscan hides, Shell Cordovan, and CNC forged carbon. Inspect stitching in 360° 3D and preview your gold-foil monogram live.
        </p>
      </div>

      {/* 1. Interactive 3D Personalization & Engraving Studio */}
      <section className="rounded-3xl bg-gradient-to-br from-graphite via-obsidian to-[#18120B] border border-gold/35 p-6 lg:p-10 shadow-2xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-7">
            <Product3DViewer
              pillar="WALLET"
              modelType={selectedWallet.model3dType}
              colorHex={selectedColor.hex}
              colorName={selectedColor.name}
              engravingText={engravingText}
              productName={selectedWallet.name}
              dimensionsText={selectedWallet.specs.Dimensions}
              image={selectedWallet.image}
              gallery={selectedWallet.gallery}
            />
          </div>

          <div className="lg:col-span-5 space-y-5">
            <div>
              <span className="font-mono text-xs text-gold uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" /> LIVE 3D BESPOKE ATELIER
              </span>
              <h2 className="font-display text-4xl text-bone mt-1">
                {selectedWallet.name}
              </h2>
              <p className="font-mono text-2xl font-bold text-gold mt-1">
                {formatPrice(selectedWallet.price + (giftWrap ? 12 : 0), currency)}
              </p>
            </div>

            {/* Select Silhouette Model */}
            <div>
              <label className="font-mono text-xs text-muted uppercase block mb-2">
                1. Choose Silhouette Model:
              </label>
              <select
                value={selectedWallet.slug}
                onChange={(e) => {
                  const found = SEED_WALLETS.find((w) => w.slug === e.target.value);
                  if (found) setSelectedWallet(found);
                }}
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-gold/30 text-sm text-bone font-mono"
              >
                {SEED_WALLETS.slice(0, 8).map((w) => (
                  <option key={w.slug} value={w.slug}>
                    {w.name} ({w.category}) — ${w.price}
                  </option>
                ))}
              </select>
            </div>

            {/* Leather Hide Color Swatches */}
            <div>
              <label className="font-mono text-xs text-muted uppercase block mb-2">
                2. Select Hide Patina: <strong className="text-bone">{selectedColor.name}</strong>
              </label>
              <div className="flex flex-wrap gap-2.5">
                {selectedWallet.colors.map((c) => (
                  <button
                    key={c.name}
                    onClick={() => setSelectedColor(c)}
                    className={`px-3 py-1.5 rounded-xl font-mono text-xs flex items-center gap-2 border transition ${
                      selectedColor.name === c.name
                        ? 'border-gold bg-gold/20 text-gold font-bold'
                        : 'border-white/10 bg-obsidian text-muted hover:text-bone'
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

            {/* Live Monogram Engraving Input */}
            <div>
              <label className="font-mono text-xs text-muted uppercase block mb-1.5">
                3. Live Gold-Foil Engraving (Max 12 Chars — Renders on 3D Model):
              </label>
              <input
                type="text"
                maxLength={12}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="e.g. T.R. // 2026"
                className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-gold/40 text-gold font-mono text-sm uppercase tracking-widest"
              />
            </div>

            {/* Gift Packaging Add-on */}
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-obsidian/80 border border-white/10 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-gold" />
                <div>
                  <span className="text-xs font-semibold text-bone block">
                    Add Cedarwood Gift Box &amp; Wax Seal
                  </span>
                  <span className="text-[11px] text-muted">Includes horsehair conditioning brush</span>
                </div>
              </div>
              <input
                type="checkbox"
                checked={giftWrap}
                onChange={(e) => setGiftWrap(e.target.checked)}
                className="accent-[#D4AF37] w-4 h-4"
              />
            </label>

            <button
              onClick={handleAddCustomWallet}
              className="w-full py-4 rounded-xl bg-gold text-obsidian font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-gold hover:brightness-110 transition"
            >
              <ShoppingBag className="w-4 h-4" /> ADD CUSTOM WALLET TO BAG
            </button>
          </div>
        </div>
      </section>

      {/* 2. Filter & Sort Bar */}
      <section>
        <div className="p-5 rounded-2xl bg-graphite border border-white/10 flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {WALLET_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setCategory(cat)}
                className={`px-4 py-2 rounded-xl font-mono text-xs transition ${
                  category === cat
                    ? 'bg-gold text-obsidian font-bold shadow-gold'
                    : 'bg-obsidian text-muted hover:text-bone border border-white/10'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <div className="flex items-center gap-2 text-xs font-mono text-muted">
              <SlidersHorizontal className="w-3.5 h-3.5 text-gold" />
              <span>Max: {formatPrice(maxPrice, currency)}</span>
              <input
                type="range"
                min={50}
                max={250}
                step={10}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-24 accent-[#D4AF37]"
              />
            </div>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
              className="px-3.5 py-2 rounded-xl bg-obsidian border border-white/10 text-xs font-mono text-bone"
            >
              <option value="featured">Sort: Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* 24 Wallets Catalog Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredWallets.map((wallet) => (
            <ProductCard key={wallet.slug} product={wallet} />
          ))}
        </div>
      </section>
    </div>
  );
}
