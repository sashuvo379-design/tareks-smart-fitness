'use client';

import React from 'react';
import Link from 'next/link';
import { SeedProduct } from '@/lib/seed-data';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import {
  Heart,
  Scale,
  ShoppingBag,
  Star,
  Box,
  Sparkles,
} from 'lucide-react';

export default function ProductCard({ product }: { product: SeedProduct }) {
  const {
    addToCart,
    wishlist,
    toggleWishlist,
    compareList,
    toggleCompare,
    currency,
  } = useStore();

  const isWishlisted = wishlist.includes(product.slug);
  const isCompared = compareList.some((p) => p.slug === product.slug);
  const isWallet = product.pillar === 'WALLET';

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart({
      slug: product.slug,
      name: product.name,
      pillar: product.pillar,
      price: product.price,
      image: product.image,
      sku: product.sku,
      qty: 1,
      selectedColor: product.colors[0]?.name || 'Standard',
    });
  };

  return (
    <div
      className={`group rounded-2xl bg-graphite border transition-all duration-300 flex flex-col overflow-hidden shadow-lg ${
        isWallet
          ? 'border-white/15 hover:border-gold hover:shadow-gold'
          : 'border-white/15 hover:border-volt hover:shadow-volt'
      }`}
    >
      {/* High-Clarity Studio Image Container */}
      <div className="relative aspect-[4/3] bg-elevated overflow-hidden border-b border-white/10">
        <Link href={`/product/${product.slug}`} className="block w-full h-full">
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="w-full h-full object-cover brightness-105 contrast-105 group-hover:scale-105 transition duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-obsidian/70 via-transparent to-transparent opacity-60 group-hover:opacity-30 transition" />
        </Link>

        <div className="absolute top-3 left-3 flex flex-col gap-1.5 pointer-events-none">
          <span
            className={`px-2.5 py-1 rounded-md font-mono text-[10px] font-bold uppercase flex items-center gap-1 shadow-md backdrop-blur-md ${
              isWallet
                ? 'bg-obsidian/90 border border-gold/60 text-gold'
                : 'bg-obsidian/90 border border-volt/60 text-volt'
            }`}
          >
            <Box className="w-3 h-3" /> {product.category}
          </span>
          {product.allowEngraving && (
            <span className="px-2.5 py-0.5 rounded-md bg-gold text-obsidian font-mono text-[10px] font-bold flex items-center gap-1 shadow-md">
              <Sparkles className="w-2.5 h-2.5" /> Custom Engraving
            </span>
          )}
        </div>

        {/* Wishlist & Compare Quick Actions */}
        <div className="absolute top-3 right-3 flex flex-col gap-1.5">
          <button
            onClick={() => toggleWishlist(product.slug)}
            aria-label="Toggle Wishlist"
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition shadow-md ${
              isWishlisted
                ? 'bg-ember text-obsidian border-ember'
                : 'bg-obsidian/90 text-bone border-white/20 hover:border-volt hover:text-volt'
            }`}
            title="Save to Wishlist"
          >
            <Heart className="w-4 h-4 fill-current" />
          </button>
          <button
            onClick={() => toggleCompare(product)}
            aria-label="Compare Product"
            className={`w-8 h-8 rounded-lg flex items-center justify-center border transition shadow-md ${
              isCompared
                ? 'bg-volt text-obsidian border-volt'
                : 'bg-obsidian/90 text-bone border-white/20 hover:border-volt hover:text-volt'
            }`}
            title="Compare Specifications (up to 3)"
          >
            <Scale className="w-4 h-4" />
          </button>
        </div>

        {/* SKU Bottom Tag */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between pointer-events-none">
          <span className="px-2 py-0.5 rounded bg-obsidian/85 border border-white/15 font-mono text-[10px] text-bone">
            {product.sku}
          </span>
          <span className="px-2 py-0.5 rounded bg-obsidian/85 border border-white/15 font-mono text-[10px] text-volt">
            {product.stock} in stock
          </span>
        </div>
      </div>

      {/* Info Body */}
      <div className="p-5 flex-1 flex flex-col justify-between bg-gradient-to-b from-graphite to-obsidian">
        <div>
          <div className="flex items-center justify-between text-xs font-mono mb-2">
            <span
              className={`font-semibold tracking-wider uppercase ${
                isWallet ? 'text-gold' : 'text-volt'
              }`}
            >
              {product.category}
            </span>
            <span className="flex items-center gap-1 text-bone font-semibold">
              <Star className="w-3.5 h-3.5 text-gold fill-gold" />
              {product.rating.toFixed(1)}{' '}
              <span className="text-muted">({product.reviewCount})</span>
            </span>
          </div>

          <Link
            href={`/product/${product.slug}`}
            className="font-display text-2xl text-bone group-hover:text-volt transition block leading-tight tracking-wide"
          >
            {product.name}
          </Link>

          <p className="text-xs text-muted mt-2 line-clamp-2 leading-relaxed">
            {product.shortDesc}
          </p>
        </div>

        <div className="pt-4 mt-4 border-t border-white/15 flex items-center justify-between gap-2">
          <div>
            <span className="font-mono text-lg font-bold text-bone">
              {formatPrice(product.price, currency)}
            </span>
            {product.compareAtPrice && (
              <span className="font-mono text-xs text-muted line-through ml-2">
                {formatPrice(product.compareAtPrice, currency)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className={`px-4 py-2 rounded-xl font-mono font-bold text-xs flex items-center gap-1.5 transition shadow-md ${
              isWallet
                ? 'bg-gold text-obsidian hover:brightness-110'
                : 'bg-volt text-obsidian hover:brightness-110'
            }`}
          >
            <ShoppingBag className="w-3.5 h-3.5" /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}
