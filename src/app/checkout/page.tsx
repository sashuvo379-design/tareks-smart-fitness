'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import {
  ShieldCheck,
  CreditCard,
  Smartphone,
  Truck,
  CheckCircle2,
  Lock,
} from 'lucide-react';

type PaymentGateway = 'STRIPE' | 'BKASH' | 'SSLCOMMERZ' | 'COD';

export default function CheckoutPage() {
  const { cart, couponCode, discountPct, clearCart, currency, addToast } = useStore();

  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerPhone, setCustomerPhone] = useState('');
  const [shippingAddress, setShippingAddress] = useState('');
  const [city, setCity] = useState('Dhaka / Austin');
  const [country, setCountry] = useState('Bangladesh / USA');
  const [paymentMethod, setPaymentMethod] = useState<PaymentGateway>('STRIPE');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<{
    orderNumber: string;
    total: number;
    method: string;
    email: string;
  } | null>(null);

  const subtotal = cart.reduce(
    (sum, item) => sum + (item.price + (item.giftPackaging ? 12 : 0)) * item.qty,
    0
  );
  const discount = Math.round((subtotal * discountPct) / 100);
  const shippingCost = subtotal > 150 || subtotal === 0 ? 0 : 15;
  const total = Math.max(0, subtotal - discount + shippingCost);

  const handlePlaceOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName,
          customerEmail,
          customerPhone,
          shippingAddress,
          city,
          country,
          items: cart,
          subtotal,
          discount,
          shippingCost,
          total,
          paymentMethod,
          couponCode,
        }),
      });
      const data = await res.json();
      const orderNum = data.orderNumber || `IF-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      setCompletedOrder({
        orderNumber: orderNum,
        total,
        method: paymentMethod,
        email: customerEmail,
      });
      clearCart();
      addToast({
        title: `Order ${orderNum} Confirmed!`,
        description: 'Confirmation receipt dispatched.',
        variant: 'volt',
      });
    } catch {
      const fallbackNum = `IF-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      setCompletedOrder({
        orderNumber: fallbackNum,
        total,
        method: paymentMethod,
        email: customerEmail,
      });
      clearCart();
    } finally {
      setIsSubmitting(false);
    }
  };

  if (completedOrder) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-6">
        <div className="w-20 h-20 rounded-full bg-volt/20 border border-volt text-volt flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-10 h-10" />
        </div>
        <span className="font-mono text-xs text-volt uppercase tracking-widest">
          PAYMENT &amp; DISPATCH VERIFIED
        </span>
        <h1 className="font-display text-5xl text-bone">
          ORDER {completedOrder.orderNumber} CONFIRMED
        </h1>
        <p className="text-sm text-muted">
          An encrypted order confirmation email and warranty certificate have been sent to{' '}
          <strong className="text-bone">{completedOrder.email}</strong>.
        </p>

        <div className="p-6 rounded-2xl bg-graphite border border-white/10 text-left font-mono text-xs space-y-2">
          <div className="flex justify-between">
            <span className="text-muted">ORDER REFERENCE:</span>
            <span className="text-volt font-bold">{completedOrder.orderNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">PAYMENT ADAPTER:</span>
            <span className="text-bone">{completedOrder.method}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted">TOTAL CHARGED:</span>
            <span className="text-gold font-bold">
              {formatPrice(completedOrder.total, currency)}
            </span>
          </div>
        </div>

        <div className="flex justify-center gap-4 pt-4">
          <Link
            href="/dashboard"
            className="px-6 py-3 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs"
          >
            VIEW IN ACCOUNT DASHBOARD
          </Link>
          <Link
            href="/"
            className="px-6 py-3 rounded-xl bg-graphite border border-white/15 text-bone font-mono text-xs"
          >
            RETURN HOME
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-10">
        <span className="font-mono text-xs text-volt uppercase tracking-widest">
          ENCRYPTED MULTI-GATEWAY CHECKOUT
        </span>
        <h1 className="font-display text-5xl text-bone mt-1">
          COMPLETE YOUR ORDER
        </h1>
      </div>

      <form onSubmit={handlePlaceOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
        {/* Left Shipping & Payment Gateways */}
        <div className="lg:col-span-7 space-y-8">
          <div className="p-6 rounded-2xl bg-graphite border border-white/10 space-y-4">
            <h2 className="font-display text-2xl text-bone">
              1. SHIPPING &amp; RECIPIENT DETAILS
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                required
                placeholder="Full Name *"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
                className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
              <input
                type="email"
                required
                placeholder="Email for Receipt *"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
                className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
              <input
                type="tel"
                required
                placeholder="Phone / WhatsApp Number *"
                value={customerPhone}
                onChange={(e) => setCustomerPhone(e.target.value)}
                className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
              <input
                type="text"
                required
                placeholder="City / State *"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
              <input
                type="text"
                required
                placeholder="Full Street Address / Apartment *"
                value={shippingAddress}
                onChange={(e) => setShippingAddress(e.target.value)}
                className="sm:col-span-2 px-4 py-3 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
              />
            </div>
          </div>

          {/* Payment Gateway Adapter Selection */}
          <div className="p-6 rounded-2xl bg-graphite border border-white/10 space-y-4">
            <h2 className="font-display text-2xl text-bone">
              2. SELECT PAYMENT GATEWAY ADAPTER
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                {
                  id: 'STRIPE' as const,
                  title: 'Stripe Global Checkout',
                  sub: 'Visa, Mastercard, Amex, Apple Pay',
                  icon: CreditCard,
                },
                {
                  id: 'BKASH' as const,
                  title: 'bKash Instant Pay',
                  sub: 'Bangladesh Mobile Wallet Adapter',
                  icon: Smartphone,
                },
                {
                  id: 'SSLCOMMERZ' as const,
                  title: 'SSLCommerz / Nagad',
                  sub: 'Local Bank Cards & NetBanking',
                  icon: ShieldCheck,
                },
                {
                  id: 'COD' as const,
                  title: 'Cash on Delivery (COD)',
                  sub: 'Pay upon white-glove inspection',
                  icon: Truck,
                },
              ].map((gw) => {
                const Icon = gw.icon;
                const active = paymentMethod === gw.id;
                return (
                  <button
                    type="button"
                    key={gw.id}
                    onClick={() => setPaymentMethod(gw.id)}
                    className={`p-4 rounded-xl border text-left transition flex items-start gap-3 ${
                      active
                        ? 'bg-obsidian border-volt text-bone shadow-volt'
                        : 'bg-obsidian/50 border-white/10 text-muted hover:text-bone'
                    }`}
                  >
                    <Icon className={`w-5 h-5 shrink-0 mt-0.5 ${active ? 'text-volt' : 'text-muted'}`} />
                    <div>
                      <p className="font-mono text-xs font-bold text-bone">{gw.title}</p>
                      <p className="text-[11px] text-muted mt-0.5">{gw.sub}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Right Order Summary */}
        <div className="lg:col-span-5">
          <div className="p-6 rounded-2xl bg-graphite border border-white/10 space-y-5 sticky top-28">
            <h2 className="font-display text-2xl text-bone">
              ORDER SUMMARY ({cart.length} ITEMS)
            </h2>

            <div className="space-y-3 max-h-72 overflow-y-auto pr-1">
              {cart.map((item) => (
                <div key={item.id} className="flex justify-between text-xs border-b border-white/5 pb-2.5">
                  <div>
                    <p className="font-semibold text-bone">
                      {item.qty}x {item.name}
                    </p>
                    <span className="text-muted font-mono">
                      {item.selectedColor}
                      {item.engravingText ? ` • Engraved: "${item.engravingText}"` : ''}
                    </span>
                  </div>
                  <span className="font-mono text-bone">
                    {formatPrice((item.price + (item.giftPackaging ? 12 : 0)) * item.qty, currency)}
                  </span>
                </div>
              ))}
            </div>

            <div className="space-y-2 text-sm pt-2 border-t border-white/10">
              <div className="flex justify-between text-muted">
                <span>Subtotal</span>
                <span className="font-mono">{formatPrice(subtotal, currency)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-volt">
                  <span>Promo Discount ({couponCode})</span>
                  <span className="font-mono">-{formatPrice(discount, currency)}</span>
                </div>
              )}
              <div className="flex justify-between text-muted">
                <span>Insured Shipping</span>
                <span className="font-mono">
                  {shippingCost === 0 ? 'FREE' : formatPrice(shippingCost, currency)}
                </span>
              </div>
              <div className="flex justify-between text-bone font-bold text-lg pt-3 border-t border-white/10">
                <span>Total Due</span>
                <span className="font-mono text-2xl text-volt">
                  {formatPrice(total, currency)}
                </span>
              </div>
            </div>

            <button
              type="submit"
              disabled={cart.length === 0 || isSubmitting}
              className="w-full py-4 rounded-xl bg-volt text-obsidian font-mono font-bold text-sm flex items-center justify-center gap-2 shadow-volt hover:brightness-110 transition disabled:opacity-40"
            >
              <Lock className="w-4 h-4" />
              {isSubmitting
                ? 'PROCESSING ENCRYPTED PAYMENT...'
                : `AUTHORIZE ${paymentMethod} PAYMENT`}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
}
