'use client';

import React, { useState } from 'react';
import {
  SEED_WALLETS,
  SEED_MACHINERY,
  SEED_COUPONS,
  SeedProduct,
} from '@/lib/seed-data';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import {
  ShieldCheck,
  TrendingUp,
  Package,
  Users,
  DollarSign,
  Plus,
  Trash2,
  Tag,
} from 'lucide-react';

export default function AdminDashboardPage() {
  const { currency, addToast } = useStore();
  const [tab, setTab] = useState<'analytics' | 'products' | 'orders' | 'coupons'>('analytics');

  const [products, setProducts] = useState<SeedProduct[]>([
    ...SEED_WALLETS.slice(0, 6),
    ...SEED_MACHINERY.slice(0, 6),
  ]);

  const [newName, setNewName] = useState('');
  const [newPillar, setNewPillar] = useState<'WALLET' | 'MACHINERY'>('WALLET');
  const [newCategory, setNewCategory] = useState('Bifold');
  const [newPrice, setNewPrice] = useState(115);
  const [newStock, setNewStock] = useState(20);

  const [orders, setOrders] = useState([
    {
      orderNumber: 'IF-ORD-90488',
      customer: 'Apex Strength Club',
      pillar: 'MACHINERY',
      total: 7701,
      method: 'BKASH',
      status: 'PROCESSING',
    },
    {
      orderNumber: 'IF-ORD-90412',
      customer: 'Alex Mercer',
      pillar: 'MIXED',
      total: 775,
      method: 'STRIPE',
      status: 'DELIVERED',
    },
    {
      orderNumber: 'IF-ORD-90501',
      customer: 'Tanvir Ahmed',
      pillar: 'WALLET',
      total: 220,
      method: 'SSLCOMMERZ',
      status: 'SHIPPED',
    },
  ]);

  const handleCreateProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName) return;
    const created: SeedProduct = {
      slug: newName.toLowerCase().replace(/\s+/g, '-'),
      name: newName,
      pillar: newPillar,
      category: newCategory,
      price: newPrice,
      rating: 5.0,
      reviewCount: 1,
      stock: newStock,
      sku: `IF-ADM-${Math.floor(100 + Math.random() * 900)}`,
      shortDesc: 'Custom Admin Created Catalog Item.',
      description: 'Created via IRONFORGE Admin Command Center.',
      image:
        newPillar === 'WALLET'
          ? '/assets/wallets/wallet-01.svg'
          : '/assets/machinery/machine-01.svg',
      gallery: [],
      colors: [{ name: 'Obsidian Black', hex: '#141417' }],
      materials: ['Premium Spec'],
      specs: { Warranty: 'Lifetime' },
      model3dType: newPillar === 'WALLET' ? 'bifold' : 'rack',
      featured: true,
      allowEngraving: newPillar === 'WALLET',
    };
    setProducts([created, ...products]);
    setNewName('');
    addToast({
      title: `Created Product: ${created.name}`,
      description: `SKU: ${created.sku} • Stock: ${created.stock}`,
      variant: 'volt',
    });
  };

  const handleDeleteProduct = (slug: string) => {
    setProducts(products.filter((p) => p.slug !== slug));
    addToast({
      title: 'Product Removed from Active Catalog',
      variant: 'ember',
    });
  };

  const updateOrderStatus = (orderNumber: string, status: string) => {
    setOrders(
      orders.map((o) => (o.orderNumber === orderNumber ? { ...o, status } : o))
    );
    addToast({
      title: `Order ${orderNumber} Updated`,
      description: `New Status: ${status}`,
      variant: 'volt',
    });
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10">
        <div>
          <span className="px-3 py-1 rounded-full bg-ember/15 border border-ember/40 text-ember font-mono text-xs">
            ROLE-PROTECTED // ADMIN COMMAND CENTER
          </span>
          <h1 className="font-display text-5xl text-bone mt-2">
            TAREK&apos;S SMART FITNESS GYM — OPERATIONS &amp; ANALYTICS
          </h1>
        </div>

        <div className="flex flex-wrap gap-2">
          {(
            [
              { id: 'analytics', label: 'Analytics & KPIs' },
              { id: 'products', label: 'Products CRUD' },
              { id: 'orders', label: 'Orders & Dispatch' },
              { id: 'coupons', label: 'Coupons & Memberships' },
            ] as const
          ).map((item) => (
            <button
              key={item.id}
              onClick={() => setTab(item.id)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs border transition ${
                tab === item.id
                  ? 'bg-volt text-obsidian border-volt font-bold'
                  : 'bg-graphite text-muted border-white/10 hover:text-bone'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <div className="p-6 rounded-2xl bg-graphite border border-white/10">
          <div className="flex justify-between text-muted text-xs font-mono">
            <span>MONTHLY REVENUE</span>
            <DollarSign className="w-4 h-4 text-volt" />
          </div>
          <p className="font-mono text-3xl font-bold text-bone mt-2">
            {formatPrice(84920, currency)}
          </p>
          <span className="text-xs font-mono text-volt">+24.8% vs last month</span>
        </div>

        <div className="p-6 rounded-2xl bg-graphite border border-white/10">
          <div className="flex justify-between text-muted text-xs font-mono">
            <span>ACTIVE GYM MEMBERS</span>
            <Users className="w-4 h-4 text-gold" />
          </div>
          <p className="font-mono text-3xl font-bold text-bone mt-2">542</p>
          <span className="text-xs font-mono text-gold">94.2% Retention Rate</span>
        </div>

        <div className="p-6 rounded-2xl bg-graphite border border-white/10">
          <div className="flex justify-between text-muted text-xs font-mono">
            <span>WALLET &amp; RIG SKUs</span>
            <Package className="w-4 h-4 text-ember" />
          </div>
          <p className="font-mono text-3xl font-bold text-bone mt-2">
            {SEED_WALLETS.length + SEED_MACHINERY.length}
          </p>
          <span className="text-xs font-mono text-muted">24 Wallets • 16 Machines</span>
        </div>

        <div className="p-6 rounded-2xl bg-graphite border border-white/10">
          <div className="flex justify-between text-muted text-xs font-mono">
            <span>3D VIEWER CONVERSION</span>
            <TrendingUp className="w-4 h-4 text-volt" />
          </div>
          <p className="font-mono text-3xl font-bold text-bone mt-2">6.8%</p>
          <span className="text-xs font-mono text-volt">2.3x higher with 3D Engraving</span>
        </div>
      </div>

      {/* Tab 1: Revenue Analytics Chart */}
      {tab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-8 p-6 rounded-2xl bg-graphite border border-white/10 space-y-6">
            <h3 className="font-display text-3xl text-bone">
              REVENUE BY PILLAR (LAST 6 MONTHS)
            </h3>
            <div className="space-y-4">
              {[
                { label: 'Pillar 03 // Commercial & Home Machinery', pct: 54, amount: '$45,850', color: 'bg-ember' },
                { label: 'Pillar 01 // Gym Memberships & PT Coaching', pct: 28, amount: '$23,780', color: 'bg-volt' },
                { label: 'Pillar 02 // Heritage Leather Wallets', pct: 18, amount: '$15,290', color: 'bg-gold' },
              ].map((bar) => (
                <div key={bar.label} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-mono">
                    <span className="text-bone">{bar.label}</span>
                    <span className="text-volt">
                      {bar.amount} ({bar.pct}%)
                    </span>
                  </div>
                  <div className="w-full h-3 rounded-full bg-obsidian overflow-hidden">
                    <div
                      className={`h-full ${bar.color} rounded-full`}
                      style={{ width: `${bar.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-4 p-6 rounded-2xl bg-graphite border border-white/10 space-y-4">
            <h3 className="font-display text-3xl text-bone">LOW STOCK ALERTS</h3>
            {[
              { name: 'Titan Commercial Studio Bundle', stock: 2, sku: 'IF-MCH-016' },
              { name: 'Ascent Pro X1 Stair Climber', stock: 4, sku: 'IF-MCH-004' },
              { name: 'Monarch Shell Cordovan Bifold', stock: 7, sku: 'IF-WLT-006' },
            ].map((item) => (
              <div
                key={item.sku}
                className="p-3.5 rounded-xl bg-obsidian border border-ember/30 flex items-center justify-between"
              >
                <div>
                  <p className="text-xs font-semibold text-bone">{item.name}</p>
                  <span className="font-mono text-[10px] text-muted">{item.sku}</span>
                </div>
                <span className="px-2.5 py-1 rounded bg-ember/20 text-ember font-mono text-xs font-bold">
                  {item.stock} left
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 2: Products CRUD */}
      {tab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form
            onSubmit={handleCreateProduct}
            className="lg:col-span-4 p-6 rounded-2xl bg-graphite border border-white/10 space-y-4 h-fit"
          >
            <h3 className="font-display text-2xl text-bone">CREATE NEW PRODUCT</h3>
            <input
              type="text"
              required
              placeholder="Product Title *"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-white/15 text-sm text-bone"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value as 'WALLET' | 'MACHINERY')}
                className="px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-xs font-mono text-bone"
              >
                <option value="WALLET">WALLET</option>
                <option value="MACHINERY">MACHINERY</option>
              </select>
              <input
                type="text"
                placeholder="Category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                className="px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-xs font-mono text-bone"
              />
            </div>
            <div className="grid grid-cols-2 gap-3">
              <input
                type="number"
                placeholder="Price (USD)"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-xs font-mono text-bone"
              />
              <input
                type="number"
                placeholder="Stock Qty"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-xs font-mono text-bone"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-1.5"
            >
              <Plus className="w-4 h-4" /> PUBLISH TO CATALOG
            </button>
          </form>

          <div className="lg:col-span-8 space-y-3">
            {products.map((p) => (
              <div
                key={p.slug}
                className="p-4 rounded-2xl bg-graphite border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3">
                  <img
                    src={p.image}
                    alt={p.name}
                    className="w-14 h-14 rounded-xl object-cover border border-white/10"
                  />
                  <div>
                    <span className="font-mono text-[10px] text-volt">
                      {p.pillar} • {p.sku}
                    </span>
                    <p className="font-semibold text-sm text-bone">{p.name}</p>
                    <span className="font-mono text-xs text-muted">
                      Stock: {p.stock} units • {formatPrice(p.price, currency)}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => handleDeleteProduct(p.slug)}
                  className="p-2 rounded-lg bg-obsidian text-muted hover:text-ember"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Orders Management */}
      {tab === 'orders' && (
        <div className="space-y-4">
          {orders.map((ord) => (
            <div
              key={ord.orderNumber}
              className="p-5 rounded-2xl bg-graphite border border-white/10 flex flex-wrap items-center justify-between gap-4"
            >
              <div>
                <span className="font-mono text-xs text-volt font-bold">
                  {ord.orderNumber} • {ord.method}
                </span>
                <p className="text-base font-semibold text-bone">{ord.customer}</p>
                <span className="font-mono text-xs text-gold">
                  Total: {formatPrice(ord.total, currency)}
                </span>
              </div>

              <div className="flex items-center gap-2">
                {['PROCESSING', 'SHIPPED', 'DELIVERED'].map((st) => (
                  <button
                    key={st}
                    onClick={() => updateOrderStatus(ord.orderNumber, st)}
                    className={`px-3 py-1.5 rounded-lg font-mono text-xs border ${
                      ord.status === st
                        ? 'bg-volt text-obsidian border-volt font-bold'
                        : 'bg-obsidian text-muted border-white/10'
                    }`}
                  >
                    {st}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Tab 4: Coupons */}
      {tab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SEED_COUPONS.map((cp) => (
            <div
              key={cp.code}
              className="p-6 rounded-2xl bg-graphite border border-volt/30 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded bg-volt text-obsidian font-mono font-bold text-xs">
                  {cp.code}
                </span>
                <Tag className="w-4 h-4 text-volt" />
              </div>
              <p className="font-display text-3xl text-bone">
                {cp.discountPct}% OFF
              </p>
              <p className="text-xs text-muted">{cp.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
