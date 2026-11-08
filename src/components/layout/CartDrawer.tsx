'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import {
  X,
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  Tag,
  Gift,
  ArrowRight,
} from 'lucide-react';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setCartOpen,
    updateQty,
    removeFromCart,
    couponCode,
    discountPct,
    applyCoupon,
    currency,
  } = useStore();
  const [couponInput, setCouponInput] = useState('');

  if (!isCartOpen) return null;

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price + (item.giftPackaging ? 12 : 0)) * item.qty,
    0
  );
  const discountAmount = Math.round((subtotal * discountPct) / 100);
  const total = Math.max(0, subtotal - discountAmount);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      {/* Backdrop */}
      <div
        onClick={() => setCartOpen(false)}
        className="fixed inset-0 bg-black/75 backdrop-blur-sm"
      />

      {/* Slide-out Drawer */}
      <aside className="relative z-10 w-full max-w-md bg-graphite border-l border-white/10 h-full flex flex-col justify-between shadow-2xl">
        {/* Header */}
        <div className="p-5 border-b border-white/10 flex items-center justify-between bg-obsidian">
          <div className="flex items-center gap-2.5">
            <ShoppingBag className="w-5 h-5 text-volt" />
            <h2 className="font-display text-2xl text-bone tracking-wide">
              YOUR ARMORY BAG ({cart.reduce((a, b) => a + b.qty, 0)})
            </h2>
          </div>
          <button
            onClick={() => setCartOpen(false)}
            aria-label="Close Cart"
            className="p-2 rounded-lg bg-graphite text-muted hover:text-bone"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {cart.length === 0 ? (
            <div className="text-center py-16 space-y-4">
              <ShoppingBag className="w-12 h-12 text-muted mx-auto opacity-40" />
              <p className="font-display text-2xl text-bone">YOUR BAG IS EMPTY</p>
              <p className="text-sm text-muted max-w-xs mx-auto">
                Explore handcrafted full-grain leather wallets or commercial strength machinery.
              </p>
              <div className="flex justify-center gap-3 pt-2">
                <Link
                  href="/wallets"
                  onClick={() => setCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-gold text-obsidian font-mono font-bold text-xs"
                >
                  Shop Wallets
                </Link>
                <Link
                  href="/machinery"
                  onClick={() => setCartOpen(false)}
                  className="px-4 py-2 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs"
                >
                  Shop Machinery
                </Link>
              </div>
            </div>
          ) : (
            cart.map((item) => (
              <div
                key={item.id}
                className="p-3.5 rounded-2xl bg-obsidian/90 border border-white/10 flex gap-3.5 items-start"
              >
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-20 h-20 rounded-xl object-cover border border-white/10 shrink-0"
                />
                <div className="flex-1 min-w-0">
                  <span
                    className={`font-mono text-[10px] uppercase ${
                      item.pillar === 'WALLET' ? 'text-gold' : 'text-volt'
                    }`}
                  >
                    {item.pillar} • {item.selectedColor}
                  </span>
                  <h4 className="text-sm font-semibold text-bone truncate">
                    {item.name}
                  </h4>
                  {item.engravingText && (
                    <p className="text-xs font-mono text-gold mt-0.5">
                      Engraving: &ldquo;{item.engravingText}&rdquo;
                    </p>
                  )}
                  {item.giftPackaging && (
                    <p className="text-[11px] font-mono text-emerald-400 flex items-center gap-1 mt-0.5">
                      <Gift className="w-3 h-3" /> Luxury Wooden Gift Box (+$12)
                    </p>
                  )}
                  <div className="flex items-center justify-between mt-3">
                    <span className="font-mono font-bold text-sm text-bone">
                      {formatPrice(
                        (item.price + (item.giftPackaging ? 12 : 0)) * item.qty,
                        currency
                      )}
                    </span>
                    <div className="flex items-center gap-1.5">
                      <button
                        onClick={() => updateQty(item.id, -1)}
                        className="w-7 h-7 rounded-lg bg-graphite border border-white/10 flex items-center justify-center text-bone hover:border-volt"
                      >
                        <Minus className="w-3 h-3" />
                      </button>
                      <span className="w-6 text-center font-mono text-xs text-bone">
                        {item.qty}
                      </span>
                      <button
                        onClick={() => updateQty(item.id, 1)}
                        className="w-7 h-7 rounded-lg bg-graphite border border-white/10 flex items-center justify-center text-bone hover:border-volt"
                      >
                        <Plus className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.id)}
                        aria-label="Remove item"
                        className="p-1.5 text-muted hover:text-ember ml-1"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer Summary & Checkout */}
        {cart.length > 0 && (
          <div className="p-5 bg-obsidian border-t border-white/10 space-y-4">
            {/* Coupon Input */}
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Tag className="w-3.5 h-3.5 text-muted absolute left-3 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Promo code (e.g. IRON10)"
                  value={couponInput}
                  onChange={(e) => setCouponInput(e.target.value)}
                  className="w-full pl-8 pr-3 py-2 rounded-xl bg-graphite border border-white/10 text-xs font-mono text-bone uppercase"
                />
              </div>
              <button
                onClick={() => applyCoupon(couponInput)}
                className="px-3.5 py-2 rounded-xl bg-elevated hover:bg-volt hover:text-obsidian border border-white/10 font-mono text-xs font-bold text-bone transition"
              >
                APPLY
              </button>
            </div>

            <div className="space-y-1.5 text-sm">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal, currency)}</span>
              </div>
              {discountPct > 0 && (
                <div className="flex justify-between text-volt">
                  <span>Discount ({couponCode} - {discountPct}%)</span>
                  <span className="font-mono">-{formatPrice(discountAmount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-bone font-bold text-base pt-2 border-t border-white/10">
                <span>Estimated Total</span>
                <span className="font-mono text-xl text-volt">
                  {formatPrice(total, currency)}
                </span>
              </div>
            </div>

            <Link
              href="/checkout"
              onClick={() => setCartOpen(false)}
              className="w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-volt hover:brightness-110 transition"
            >
              PROCEED TO CHECKOUT <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        )}
      </aside>
    </div>
  );
}
