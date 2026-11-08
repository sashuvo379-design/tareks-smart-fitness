'use client';

import React, { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import dynamic from 'next/dynamic';
import { SEED_WALLETS, SEED_MACHINERY } from '@/lib/seed-data';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import ProductCard from '@/components/store/ProductCard';
import {
  ShoppingBag,
  Heart,
  Scale,
  Star,
  Truck,
  ShieldCheck,
  CheckCircle2,
  Gift,
  MessageSquare,
} from 'lucide-react';

const Product3DViewer = dynamic(
  () => import('@/components/three/Product3DViewer'),
  { ssr: false }
);

export default function ProductDetailPage() {
  const params = useParams<{ slug: string }>();
  const allProducts = [...SEED_WALLETS, ...SEED_MACHINERY];
  const product =
    allProducts.find((p) => p.slug === params.slug) || SEED_WALLETS[0];

  const {
    addToCart,
    wishlist,
    toggleWishlist,
    toggleCompare,
    addRecentlyViewed,
    currency,
  } = useStore();

  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [engravingText, setEngravingText] = useState('');
  const [giftPackaging, setGiftPackaging] = useState(false);
  const [qty, setQty] = useState(1);
  const [viewMode, setViewMode] = useState<'3d' | 'gallery'>('3d');

  useEffect(() => {
    setSelectedColor(product.colors[0]);
    addRecentlyViewed(product.slug);
  }, [product, addRecentlyViewed]);

  const isWallet = product.pillar === 'WALLET';
  const related = allProducts
    .filter((p) => p.pillar === product.pillar && p.slug !== product.slug)
    .slice(0, 4);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    sku: product.sku,
    description: product.description,
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price,
      availability: 'https://schema.org/InStock',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: product.rating,
      reviewCount: product.reviewCount,
    },
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-20">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb */}
      <nav className="font-mono text-xs text-muted flex items-center gap-2">
        <Link href="/" className="hover:text-bone">Home</Link>
        <span>/</span>
        <Link
          href={isWallet ? '/wallets' : '/machinery'}
          className="hover:text-bone"
        >
          {isWallet ? 'Wallet Store' : 'Machinery Store'}
        </Link>
        <span>/</span>
        <span className="text-volt">{product.name}</span>
      </nav>

      {/* Main Product Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left: High-Res Product Photography & Interactive Inspector */}
        <div className="lg:col-span-7 space-y-4">
          <Product3DViewer
            pillar={product.pillar}
            modelType={product.model3dType}
            colorHex={selectedColor.hex}
            colorName={selectedColor.name}
            engravingText={engravingText}
            productName={product.name}
            dimensionsText={product.specs.Dimensions}
            image={product.image}
            gallery={product.gallery}
          />
        </div>

        {/* Right: Configuration & Purchase */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <div className="flex items-center justify-between">
              <span
                className={`font-mono text-xs uppercase tracking-widest ${
                  isWallet ? 'text-gold' : 'text-ember'
                }`}
              >
                {product.category} • SKU: {product.sku}
              </span>
              <span className="px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-400 font-mono text-xs flex items-center gap-1">
                <CheckCircle2 className="w-3.5 h-3.5" /> {product.stock} in Stock
              </span>
            </div>

            <h1 className="font-display text-4xl sm:text-5xl text-bone mt-2 leading-none">
              {product.name}
            </h1>

            <div className="flex items-center gap-4 mt-3">
              <span className="font-mono text-3xl font-bold text-volt">
                {formatPrice(product.price + (giftPackaging ? 12 : 0), currency)}
              </span>
              {product.compareAtPrice && (
                <span className="font-mono text-sm text-muted line-through">
                  {formatPrice(product.compareAtPrice, currency)}
                </span>
              )}
              <span className="flex items-center gap-1 text-xs font-mono text-gold ml-auto">
                <Star className="w-4 h-4 fill-gold" /> {product.rating} ({product.reviewCount} Reviews)
              </span>
            </div>
          </div>

          <p className="text-sm text-muted leading-relaxed">
            {product.description}
          </p>

          {/* Variant Color Selector */}
          <div>
            <label className="font-mono text-xs text-muted uppercase block mb-2">
              Finish / Hide Variant: <strong className="text-bone">{selectedColor.name}</strong>
            </label>
            <div className="flex flex-wrap gap-2">
              {product.colors.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setSelectedColor(c)}
                  className={`px-3.5 py-2 rounded-xl font-mono text-xs flex items-center gap-2 border transition ${
                    selectedColor.name === c.name
                      ? 'border-volt bg-volt/15 text-volt font-bold'
                      : 'border-white/10 bg-graphite text-muted hover:text-bone'
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

          {/* Optional Engraving for Wallets */}
          {product.allowEngraving && (
            <div>
              <label className="font-mono text-xs text-gold uppercase block mb-1.5">
                Complimentary Gold-Foil Engraving (Live on 3D Model):
              </label>
              <input
                type="text"
                maxLength={12}
                value={engravingText}
                onChange={(e) => setEngravingText(e.target.value)}
                placeholder="Enter initials (e.g. M.V. // IX)"
                className="w-full px-4 py-2.5 rounded-xl bg-graphite border border-gold/40 text-gold font-mono text-sm uppercase tracking-widest"
              />
            </div>
          )}

          {isWallet && (
            <label className="flex items-center justify-between p-3.5 rounded-xl bg-graphite border border-white/10 cursor-pointer">
              <div className="flex items-center gap-2.5">
                <Gift className="w-4 h-4 text-gold" />
                <span className="text-xs text-bone font-medium">
                  Add Luxury Cedarwood Gift Box (+$12)
                </span>
              </div>
              <input
                type="checkbox"
                checked={giftPackaging}
                onChange={(e) => setGiftPackaging(e.target.checked)}
                className="accent-[#D4AF37] w-4 h-4"
              />
            </label>
          )}

          {/* Add to Cart + Wishlist + Compare */}
          <div className="flex gap-3 pt-2">
            <div className="flex items-center rounded-xl bg-graphite border border-white/15 px-2">
              <button
                onClick={() => setQty(Math.max(1, qty - 1))}
                className="px-3 py-2 text-bone font-mono"
              >
                -
              </button>
              <span className="px-3 font-mono text-sm text-bone">{qty}</span>
              <button
                onClick={() => setQty(qty + 1)}
                className="px-3 py-2 text-bone font-mono"
              >
                +
              </button>
            </div>

            <button
              onClick={() =>
                addToCart({
                  slug: product.slug,
                  name: product.name,
                  pillar: product.pillar,
                  price: product.price,
                  image: product.image,
                  sku: product.sku,
                  qty,
                  selectedColor: selectedColor.name,
                  engravingText: engravingText.trim() || undefined,
                  giftPackaging,
                })
              }
              className="flex-1 py-4 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-volt hover:brightness-110 transition"
            >
              <ShoppingBag className="w-4 h-4" /> ADD TO ARMORY BAG
            </button>

            <button
              onClick={() => toggleWishlist(product.slug)}
              aria-label="Wishlist"
              className={`p-4 rounded-xl border transition ${
                wishlist.includes(product.slug)
                  ? 'bg-ember text-obsidian border-ember'
                  : 'bg-graphite text-bone border-white/15'
              }`}
            >
              <Heart className="w-4 h-4 fill-current" />
            </button>

            <button
              onClick={() => toggleCompare(product)}
              aria-label="Compare"
              className="p-4 rounded-xl bg-graphite text-bone border border-white/15 hover:border-volt"
            >
              <Scale className="w-4 h-4" />
            </button>
          </div>

          {/* Delivery Estimator */}
          <div className="p-4 rounded-2xl bg-graphite/70 border border-white/10 space-y-2 text-xs text-muted">
            <p className="flex items-center gap-2 text-bone">
              <Truck className="w-4 h-4 text-volt" />
              <span>
                Estimated Dispatch: <strong>Within 24 Hours</strong> (Express Insured Courier)
              </span>
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 text-gold" />
              <span>
                Backed by IRONFORGE {product.specs.Warranty || 'Lifetime Warranty'}
              </span>
            </p>
          </div>
        </div>
      </div>

      {/* Technical Specification Matrix & Verified Reviews */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-8 border-t border-white/10">
        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-display text-3xl text-bone">
            TECHNICAL SPECIFICATIONS
          </h3>
          <div className="rounded-2xl bg-graphite border border-white/10 divide-y divide-white/10">
            {Object.entries(product.specs).map(([key, val]) => (
              <div key={key} className="p-4 flex justify-between text-sm">
                <span className="font-mono text-muted">{key}</span>
                <span className="font-mono text-bone font-semibold">{val}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="lg:col-span-6 space-y-4">
          <h3 className="font-display text-3xl text-bone">
            VERIFIED OWNER REVIEWS ({product.reviewCount})
          </h3>
          <div className="space-y-3">
            {[
              {
                author: 'Tariqul H. • Verified Buyer',
                comment:
                  'Unbelievable build quality. You can feel the weight and precision tolerances immediately out of the crate.',
                rating: 5,
              },
              {
                author: 'Ryan K. • Strength Club Director',
                comment:
                  'Zero corners cut. The 3D viewer on the site matched the actual finish 100%.',
                rating: 5,
              },
            ].map((rev) => (
              <div
                key={rev.author}
                className="p-5 rounded-2xl bg-graphite border border-white/10"
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-mono text-xs text-gold font-bold">
                    {rev.author}
                  </span>
                  <span className="text-gold text-xs">★★★★★</span>
                </div>
                <p className="text-sm text-muted">{rev.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Related Products */}
      <div>
        <h3 className="font-display text-4xl text-bone mb-6">
          RELATED {isWallet ? 'HERITAGE WALLETS' : 'ARMORY MACHINERY'}
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
