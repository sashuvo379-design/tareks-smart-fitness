'use client';

import React, { useState, useEffect, useRef } from 'react';
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
  RefreshCw,
  RotateCcw,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  Phone,
  Mail,
  MapPin,
  Flame,
} from 'lucide-react';

interface DbOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: string;
  city: string;
  country: string;
  items: string;
  subtotal: number;
  discount: number;
  shippingCost: number;
  total: number;
  paymentMethod: string;
  paymentStatus: string;
  orderStatus: string;
  couponCode?: string | null;
  createdAt: string;
}

interface DbBooking {
  id: string;
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  bookingType: string;
  notes?: string | null;
  status: string;
  createdAt: string;
}

export default function AdminDashboardPage() {
  const { currency, addToast } = useStore();
  const [tab, setTab] = useState<'analytics' | 'orders' | 'bookings' | 'products' | 'coupons'>('analytics');

  // Real-time synchronization state initialized to 0
  const [orders, setOrders] = useState<DbOrder[]>([]);
  const [bookings, setBookings] = useState<DbBooking[]>([]);
  const [stats, setStats] = useState({
    totalRevenue: 0,
    totalOrders: 0,
    totalBookings: 0,
    todayOrders: 0,
    todayRevenue: 0,
    revenueByMethod: { BKASH: 0, SSLCOMMERZ: 0, STRIPE: 0, COD: 0 } as Record<string, number>,
    revenueByPillar: { MACHINERY: 0, WALLET: 0 },
  });

  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastSyncTime, setLastSyncTime] = useState<string>('Connecting...');
  const [isResetting, setIsResetting] = useState(false);

  // References to detect incoming live events
  const prevOrderCountRef = useRef<number>(0);
  const prevBookingCountRef = useRef<number>(0);
  const isInitialLoadRef = useRef<boolean>(true);

  // Products CRUD State
  const [products, setProducts] = useState<SeedProduct[]>([
    ...SEED_MACHINERY,
    ...SEED_WALLETS.slice(0, 8),
  ]);
  const [newName, setNewName] = useState('');
  const [newPillar, setNewPillar] = useState<'WALLET' | 'MACHINERY'>('MACHINERY');
  const [newCategory, setNewCategory] = useState('Racks');
  const [newPrice, setNewPrice] = useState(2450);
  const [newStock, setNewStock] = useState(10);

  // Fetch data from real backend database
  const fetchData = async (showToastOnNew = true) => {
    try {
      setIsRefreshing(true);
      const res = await fetch('/api/admin/data', { cache: 'no-store' });
      const data = await res.json();

      if (data.ok) {
        setOrders(data.orders || []);
        setBookings(data.bookings || []);
        setStats(data.stats);
        setLastSyncTime(new Date().toLocaleTimeString());

        // Check if new actions occurred in real-time
        if (!isInitialLoadRef.current && showToastOnNew) {
          const newOrdersCount = (data.orders || []).length - prevOrderCountRef.current;
          const newBookingsCount = (data.bookings || []).length - prevBookingCountRef.current;

          if (newOrdersCount > 0) {
            const latest = data.orders[0];
            addToast({
              title: `🔔 Real-Time Order Received!`,
              description: `Order ${latest.orderNumber} placed by ${latest.customerName} for ${formatPrice(
                latest.total,
                currency
              )} (${latest.paymentMethod}).`,
              variant: 'volt',
            });
          }

          if (newBookingsCount > 0) {
            const latest = data.bookings[0];
            addToast({
              title: `🔔 Real-Time Gym Member Action!`,
              description: `${latest.guestName} submitted a ${latest.bookingType.replace('_', ' ')}.`,
              variant: 'gold',
            });
          }
        }

        prevOrderCountRef.current = (data.orders || []).length;
        prevBookingCountRef.current = (data.bookings || []).length;
        isInitialLoadRef.current = false;
      }
    } catch (err) {
      console.error('Failed to sync admin portal data:', err);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  // Poll real-time backend every 3 seconds
  useEffect(() => {
    fetchData(false);
    const interval = setInterval(() => {
      fetchData(true);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  // Reset all orders, revenues, and bookings back to 0
  const handleResetToZero = async () => {
    if (!window.confirm('Are you sure you want to initialize all Orders, Revenue, and Member Bookings to 0?')) {
      return;
    }
    setIsResetting(true);
    try {
      const res = await fetch('/api/admin/reset', { method: 'POST' });
      const data = await res.json();
      if (data.ok) {
        setOrders([]);
        setBookings([]);
        setStats({
          totalRevenue: 0,
          totalOrders: 0,
          totalBookings: 0,
          todayOrders: 0,
          todayRevenue: 0,
          revenueByMethod: { BKASH: 0, SSLCOMMERZ: 0, STRIPE: 0, COD: 0 },
          revenueByPillar: { MACHINERY: 0, WALLET: 0 },
        });
        prevOrderCountRef.current = 0;
        prevBookingCountRef.current = 0;
        addToast({
          title: 'All Metrics Initialized to 0!',
          description: 'Orders, revenue, and active bookings have been reset to a clean slate.',
          variant: 'volt',
        });
      }
    } catch {
      addToast({
        title: 'Reset Failed',
        description: 'Could not contact database reset endpoint.',
        variant: 'ember',
      });
    } finally {
      setIsResetting(false);
    }
  };

  // Simulate a live user checkout order to test real-time connection
  const handleSimulateUserOrder = async () => {
    try {
      const demoNames = ['Tanvir Chowdhury', 'Rahim Uddin', 'Dr. Farhana', 'Shahriar Khan', 'Nusrat Jahan'];
      const demoCities = ['Brahmanbaria', 'Dhaka', 'Chittagong', 'Sylhet', 'Comilla'];
      const randomName = demoNames[Math.floor(Math.random() * demoNames.length)];
      const randomCity = demoCities[Math.floor(Math.random() * demoCities.length)];
      const methods: ('BKASH' | 'SSLCOMMERZ' | 'STRIPE' | 'COD')[] = ['BKASH', 'SSLCOMMERZ', 'COD', 'STRIPE'];
      const randomMethod = methods[Math.floor(Math.random() * methods.length)];

      const sampleItem = SEED_MACHINERY[Math.floor(Math.random() * 4)];
      const itemPrice = sampleItem.price;

      await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          customerName: randomName,
          customerEmail: `${randomName.toLowerCase().replace(/\s+/g, '.')}@gmail.com`,
          customerPhone: '01782226189',
          shippingAddress: 'Boarding Field Area, Holding 42',
          city: randomCity,
          country: 'Bangladesh',
          items: [{ name: sampleItem.name, sku: sampleItem.sku, price: itemPrice, qty: 1 }],
          subtotal: itemPrice,
          discount: 0,
          shippingCost: 0,
          total: itemPrice,
          paymentMethod: randomMethod,
        }),
      });

      // Instantly trigger re-sync
      await fetchData(true);
    } catch {
      addToast({ title: 'Simulation Error', variant: 'ember' });
    }
  };

  // Simulate a live user trial pass booking
  const handleSimulateUserPass = async () => {
    try {
      const demoAthletes = ['Sabbir Ahmed', 'Arif Hossain', 'Mahinur Rahman', 'Joy Das'];
      const randomAthlete = demoAthletes[Math.floor(Math.random() * demoAthletes.length)];
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          guestName: randomAthlete,
          guestEmail: `${randomAthlete.toLowerCase().replace(/\s+/g, '')}@gmail.com`,
          guestPhone: '01782226189',
          bookingType: 'FREE_TRIAL',
          notes: 'Ascent StairMaster & 11-Gauge Rack Conditioning',
        }),
      });
      await fetchData(true);
    } catch {
      addToast({ title: 'Simulation Error', variant: 'ember' });
    }
  };

  // Update order status live
  const updateOrderStatus = async (orderNumber: string, status: string) => {
    try {
      const res = await fetch('/api/orders', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderNumber, orderStatus: status }),
      });
      if (res.ok) {
        setOrders((prev) =>
          prev.map((o) => (o.orderNumber === orderNumber ? { ...o, orderStatus: status } : o))
        );
        addToast({
          title: `Order ${orderNumber} Updated`,
          description: `Status changed to ${status}`,
          variant: 'volt',
        });
      }
    } catch {
      addToast({ title: 'Update Failed', variant: 'ember' });
    }
  };

  // Update booking status live
  const updateBookingStatus = async (id: string, status: string) => {
    try {
      const res = await fetch('/api/bookings', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (res.ok) {
        setBookings((prev) =>
          prev.map((b) => (b.id === id ? { ...b, status } : b))
        );
        addToast({
          title: 'Member Pass Updated',
          description: `Status changed to ${status}`,
          variant: 'volt',
        });
      }
    } catch {
      addToast({ title: 'Update Failed', variant: 'ember' });
    }
  };

  // Handle local products CRUD
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
      sku: `TSF-${newPillar === 'MACHINERY' ? 'MCH' : 'WLT'}-${Math.floor(100 + Math.random() * 900)}`,
      shortDesc: 'Custom Admin Created Catalog Item.',
      description: 'Created via Tarek’s Smart Fitness Admin Command Center.',
      image:
        newPillar === 'WALLET'
          ? '/assets/wallets/wallet-01.jpg'
          : '/assets/machinery/machine-01.jpg',
      gallery: [],
      colors: [{ name: 'Obsidian Black', hex: '#141417' }],
      materials: ['Commercial Club Spec Steel'],
      specs: { Warranty: 'Lifetime Structural' },
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Real-time Header & Live Status Bar */}
      <div className="p-6 sm:p-8 rounded-3xl bg-graphite border border-white/10 shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-2">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 font-mono text-xs font-bold">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              LIVE REALTIME SYNC ACTIVE (3S)
            </span>
            <span className="font-mono text-xs text-muted">
              Last Synced: <strong className="text-bone">{lastSyncTime}</strong>
            </span>
          </div>
          <h1 className="font-display text-3xl sm:text-4xl text-bone">
            TAREK&apos;S SMART FITNESS // ADMIN COMMAND CENTER
          </h1>
          <p className="text-sm text-muted mt-1 max-w-2xl">
            Connected to user checkouts, 3-day trial QR passes, and coaching inquiries in real-time.
          </p>
        </div>

        {/* Live Controls */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={() => fetchData(false)}
            disabled={isRefreshing}
            className="px-4 py-2.5 rounded-xl bg-obsidian border border-white/15 text-bone font-mono text-xs flex items-center gap-2 hover:border-volt transition disabled:opacity-50"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${isRefreshing ? 'animate-spin text-volt' : ''}`} />
            REFRESH
          </button>

          <button
            onClick={handleSimulateUserOrder}
            className="px-4 py-2.5 rounded-xl bg-volt/15 border border-volt/40 text-volt hover:bg-volt hover:text-obsidian font-mono text-xs font-bold flex items-center gap-1.5 transition"
            title="Simulate a real user checkout order to test live sync"
          >
            <Sparkles className="w-3.5 h-3.5" />
            + TEST USER ORDER
          </button>

          <button
            onClick={handleSimulateUserPass}
            className="px-4 py-2.5 rounded-xl bg-gold/15 border border-gold/40 text-gold hover:bg-gold hover:text-obsidian font-mono text-xs font-bold flex items-center gap-1.5 transition"
            title="Simulate a real user registering a 3-Day Free Trial pass"
          >
            <Users className="w-3.5 h-3.5" />
            + TEST USER PASS
          </button>

          <button
            onClick={handleResetToZero}
            disabled={isResetting}
            className="px-4 py-2.5 rounded-xl bg-rose-500/15 border border-rose-500/40 text-rose-400 hover:bg-rose-500 hover:text-white font-mono text-xs font-bold flex items-center gap-1.5 transition"
            title="Wipe all orders and bookings, resetting revenue and counters to 0"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            INITIALIZE TO 0
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none border-b border-white/10">
        {[
          { id: 'analytics', label: 'Live Analytics & KPIs' },
          { id: 'orders', label: `Live Orders (${orders.length})` },
          { id: 'bookings', label: `Member Passes & Inquiries (${bookings.length})` },
          { id: 'products', label: `Products Catalog (${products.length})` },
          { id: 'coupons', label: 'Membership Coupons' },
        ].map((item) => (
          <button
            key={item.id}
            onClick={() => setTab(item.id as typeof tab)}
            className={`px-5 py-3 rounded-2xl font-mono text-xs whitespace-nowrap border transition ${
              tab === item.id
                ? 'bg-volt text-obsidian border-volt font-bold shadow-volt'
                : 'bg-graphite text-muted border-white/10 hover:text-bone'
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* KPI Metric Cards (Initialized to 0 and connected to live database) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {/* Total Revenue */}
        <div className="p-6 rounded-3xl bg-graphite border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center text-muted text-xs font-mono">
            <span>TOTAL REVENUE</span>
            <DollarSign className="w-4 h-4 text-volt" />
          </div>
          <p className="font-mono text-4xl font-bold text-bone mt-3">
            {formatPrice(stats.totalRevenue, currency)}
          </p>
          <span className="text-xs font-mono text-volt mt-1 block">
            {stats.totalRevenue === 0 ? 'Initialized to ৳0.00' : 'Live sum of confirmed orders'}
          </span>
        </div>

        {/* Total Orders */}
        <div className="p-6 rounded-3xl bg-graphite border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center text-muted text-xs font-mono">
            <span>TOTAL USER ORDERS</span>
            <Package className="w-4 h-4 text-gold" />
          </div>
          <p className="font-mono text-4xl font-bold text-bone mt-3">
            {stats.totalOrders}
          </p>
          <span className="text-xs font-mono text-gold mt-1 block">
            {stats.todayOrders > 0 ? `${stats.todayOrders} order(s) placed today` : '0 orders pending'}
          </span>
        </div>

        {/* Member Passes & Inquiries */}
        <div className="p-6 rounded-3xl bg-graphite border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center text-muted text-xs font-mono">
            <span>MEMBER PASSES &amp; INQUIRIES</span>
            <Users className="w-4 h-4 text-cyan-400" />
          </div>
          <p className="font-mono text-4xl font-bold text-bone mt-3">
            {stats.totalBookings}
          </p>
          <span className="text-xs font-mono text-cyan-400 mt-1 block">
            {stats.totalBookings === 0 ? 'Initialized to 0 active passes' : 'Real-time registered users'}
          </span>
        </div>

        {/* Active Catalog SKUs */}
        <div className="p-6 rounded-3xl bg-graphite border border-white/10 relative overflow-hidden">
          <div className="flex justify-between items-center text-muted text-xs font-mono">
            <span>ACTIVE STORE SKUS</span>
            <TrendingUp className="w-4 h-4 text-ember" />
          </div>
          <p className="font-mono text-4xl font-bold text-bone mt-3">
            {products.length}
          </p>
          <span className="text-xs font-mono text-muted mt-1 block">
            16 Machines • {SEED_WALLETS.length} Wallets
          </span>
        </div>
      </div>

      {/* =====================================================================
          TAB 1: LIVE ANALYTICS & BREAKDOWNS
         ===================================================================== */}
      {tab === 'analytics' && (
        <div className="space-y-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Revenue by Method */}
            <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl bg-graphite border border-white/10 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-display text-2xl text-bone">REVENUE BY PAYMENT METHOD</h3>
                  <p className="text-xs text-muted mt-0.5">Live breakdown from user checkout transactions.</p>
                </div>
                <span className="px-2.5 py-1 rounded bg-obsidian text-volt font-mono text-xs font-bold">
                  TOTAL: {formatPrice(stats.totalRevenue, currency)}
                </span>
              </div>

              <div className="space-y-4 pt-2">
                {[
                  { label: 'bKash Merchant Payment (Bangladesh)', method: 'BKASH', color: 'bg-pink-500' },
                  { label: 'SSLCommerz Gateway (Cards & Net Banking)', method: 'SSLCOMMERZ', color: 'bg-volt' },
                  { label: 'Stripe International Credit / Debit Card', method: 'STRIPE', color: 'bg-cyan-400' },
                  { label: 'Cash on Delivery (COD) / Reception Pay', method: 'COD', color: 'bg-gold' },
                ].map((item) => {
                  const amount = stats.revenueByMethod[item.method] || 0;
                  const pct = stats.totalRevenue > 0 ? Math.round((amount / stats.totalRevenue) * 100) : 0;
                  return (
                    <div key={item.method} className="space-y-1.5">
                      <div className="flex justify-between text-xs font-mono">
                        <span className="text-bone">{item.label}</span>
                        <span className="text-volt font-bold">
                          {formatPrice(amount, currency)} ({pct}%)
                        </span>
                      </div>
                      <div className="w-full h-2.5 rounded-full bg-obsidian overflow-hidden">
                        <div
                          className={`h-full ${item.color} rounded-full transition-all duration-500`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Quick Live Actions & Status */}
            <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl bg-graphite border border-white/10 space-y-5 flex flex-col justify-between">
              <div>
                <h3 className="font-display text-2xl text-bone">REAL-TIME PORTAL BRIDGE</h3>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  The admin portal is directly linked to the user portal. When someone books a trial pass or completes checkout, it reflects here instantaneously without page refresh.
                </p>

                <div className="mt-5 space-y-3">
                  <div className="p-3.5 rounded-2xl bg-obsidian border border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-bone">Database Connection:</span>
                    <span className="text-xs font-mono text-emerald-400 font-bold flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-emerald-400" />
                      SQLite / Prisma Active
                    </span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-obsidian border border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-bone">Auto-Polling Cadence:</span>
                    <span className="text-xs font-mono text-volt font-bold">Every 3,000ms</span>
                  </div>
                  <div className="p-3.5 rounded-2xl bg-obsidian border border-white/5 flex items-center justify-between">
                    <span className="text-xs font-mono text-bone">Today&apos;s Revenue:</span>
                    <span className="text-xs font-mono text-gold font-bold">
                      {formatPrice(stats.todayRevenue, currency)}
                    </span>
                  </div>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={handleSimulateUserOrder}
                  className="w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs shadow-volt hover:brightness-110 transition flex items-center justify-center gap-2"
                >
                  <Sparkles className="w-4 h-4" />
                  SIMULATE REALTIME CUSTOMER PURCHASE
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 2: REAL-TIME USER ORDERS & DISPATCH
         ===================================================================== */}
      {tab === 'orders' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-3xl text-bone">CUSTOMER ORDERS ({orders.length})</h3>
              <p className="text-xs text-muted mt-0.5">Live orders submitted via checkout portal.</p>
            </div>
            <button
              onClick={handleSimulateUserOrder}
              className="px-4 py-2 rounded-xl bg-volt text-obsidian font-mono text-xs font-bold self-start sm:self-auto hover:brightness-110 transition"
            >
              + Place Test Order
            </button>
          </div>

          {orders.length === 0 ? (
            <div className="p-12 rounded-3xl bg-graphite/60 border border-dashed border-white/15 text-center space-y-4">
              <Package className="w-12 h-12 text-muted mx-auto opacity-50" />
              <div className="max-w-md mx-auto">
                <h4 className="font-display text-2xl text-bone">NO ORDERS YET (INITIALIZED TO 0)</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  As soon as a customer completes checkout on the website, their order, address, phone number, and items will appear right here in real-time.
                </p>
                <button
                  onClick={handleSimulateUserOrder}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs shadow-volt hover:brightness-110 transition"
                >
                  Create Sample Order
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {orders.map((ord) => {
                let parsedItems: { name: string; qty?: number; price?: number }[] = [];
                try {
                  parsedItems = JSON.parse(ord.items || '[]');
                } catch {
                  parsedItems = [];
                }

                return (
                  <div
                    key={ord.orderNumber}
                    className="p-6 rounded-3xl bg-graphite border border-white/10 space-y-4 hover:border-volt/40 transition"
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-white/10 pb-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-sm font-bold text-volt">
                            {ord.orderNumber}
                          </span>
                          <span className="px-2 py-0.5 rounded bg-obsidian text-gold font-mono text-[10px] font-bold">
                            {ord.paymentMethod}
                          </span>
                          <span className="font-mono text-[11px] text-muted">
                            {new Date(ord.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <h4 className="text-lg font-bold text-bone mt-1">{ord.customerName}</h4>
                      </div>

                      <div className="flex flex-wrap items-center gap-2">
                        <span className="font-mono text-xl font-bold text-bone mr-2">
                          {formatPrice(ord.total, currency)}
                        </span>
                        {['PROCESSING', 'SHIPPED', 'DELIVERED', 'CANCELLED'].map((st) => (
                          <button
                            key={st}
                            onClick={() => updateOrderStatus(ord.orderNumber, st)}
                            className={`px-3 py-1.5 rounded-xl font-mono text-xs border transition ${
                              ord.orderStatus === st
                                ? 'bg-volt text-obsidian border-volt font-bold shadow-volt'
                                : 'bg-obsidian text-muted border-white/10 hover:text-bone'
                            }`}
                          >
                            {st}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-mono">
                      <div>
                        <span className="text-muted block">CONTACT:</span>
                        <p className="text-bone">{ord.customerEmail}</p>
                        <p className="text-gold">{ord.customerPhone}</p>
                      </div>
                      <div>
                        <span className="text-muted block">SHIPPING DESTINATION:</span>
                        <p className="text-bone">{ord.shippingAddress}</p>
                        <p className="text-muted">{ord.city}, {ord.country}</p>
                      </div>
                      <div>
                        <span className="text-muted block">ORDERED ITEMS:</span>
                        <ul className="text-bone space-y-0.5">
                          {parsedItems.map((it, idx) => (
                            <li key={idx}>
                              • {it.name} (x{it.qty || 1})
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      )}

      {/* =====================================================================
          TAB 3: REAL-TIME GYM MEMBER PASSES & INQUIRIES
         ===================================================================== */}
      {tab === 'bookings' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h3 className="font-display text-3xl text-bone">
                MEMBER PASSES &amp; INQUIRIES ({bookings.length})
              </h3>
              <p className="text-xs text-muted mt-0.5">
                Real-time 3-Day Free Trial QR pass registrations and web inquiries.
              </p>
            </div>
            <button
              onClick={handleSimulateUserPass}
              className="px-4 py-2 rounded-xl bg-gold text-obsidian font-mono text-xs font-bold self-start sm:self-auto hover:brightness-110 transition"
            >
              + Register Test Pass
            </button>
          </div>

          {bookings.length === 0 ? (
            <div className="p-12 rounded-3xl bg-graphite/60 border border-dashed border-white/15 text-center space-y-4">
              <Users className="w-12 h-12 text-muted mx-auto opacity-50" />
              <div className="max-w-md mx-auto">
                <h4 className="font-display text-2xl text-bone">NO REGISTRATIONS YET (INITIALIZED TO 0)</h4>
                <p className="text-xs text-muted mt-1 leading-relaxed">
                  When a visitor claims a 3-Day Free Trial QR pass at the gym portal or submits a consultation message, it will arrive here live.
                </p>
                <button
                  onClick={handleSimulateUserPass}
                  className="mt-5 px-5 py-2.5 rounded-xl bg-gold text-obsidian font-mono font-bold text-xs shadow-gold hover:brightness-110 transition"
                >
                  Generate Sample Pass
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {bookings.map((b) => (
                <div
                  key={b.id}
                  className="p-6 rounded-3xl bg-graphite border border-white/10 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:border-gold/40 transition"
                >
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="px-2.5 py-0.5 rounded bg-obsidian text-gold font-mono text-[10px] font-bold">
                        {b.bookingType}
                      </span>
                      <span className="font-mono text-xs text-muted">
                        {new Date(b.createdAt).toLocaleString()}
                      </span>
                    </div>
                    <h4 className="text-lg font-bold text-bone mt-1">{b.guestName}</h4>
                    <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-muted mt-1">
                      <span>Phone: <strong className="text-volt">{b.guestPhone}</strong></span>
                      <span>Email: <strong className="text-bone">{b.guestEmail}</strong></span>
                      {b.notes && <span>Goal/Notes: <strong className="text-gold">{b.notes}</strong></span>}
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    {['CONFIRMED', 'CHECKED_IN', 'CONTACTED', 'CANCELLED'].map((st) => (
                      <button
                        key={st}
                        onClick={() => updateBookingStatus(b.id, st)}
                        className={`px-3 py-1.5 rounded-xl font-mono text-xs border transition ${
                          b.status === st
                            ? 'bg-gold text-obsidian border-gold font-bold shadow-gold'
                            : 'bg-obsidian text-muted border-white/10 hover:text-bone'
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
        </div>
      )}

      {/* =====================================================================
          TAB 4: PRODUCTS CATALOG MANAGEMENT
         ===================================================================== */}
      {tab === 'products' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <form
            onSubmit={handleCreateProduct}
            className="lg:col-span-4 p-6 sm:p-8 rounded-3xl bg-graphite border border-white/10 space-y-4 h-fit"
          >
            <h3 className="font-display text-2xl text-bone">ADD NEW PRODUCT</h3>
            <input
              type="text"
              required
              placeholder="Product Name *"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl bg-obsidian border border-white/15 text-sm text-bone focus:outline-none focus:border-volt"
            />
            <div className="grid grid-cols-2 gap-3">
              <select
                value={newPillar}
                onChange={(e) => setNewPillar(e.target.value as 'WALLET' | 'MACHINERY')}
                className="px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-xs font-mono text-bone"
              >
                <option value="MACHINERY">MACHINERY</option>
                <option value="WALLET">WALLET</option>
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
                placeholder="Price"
                value={newPrice}
                onChange={(e) => setNewPrice(Number(e.target.value))}
                className="px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-xs font-mono text-bone"
              />
              <input
                type="number"
                placeholder="Stock"
                value={newStock}
                onChange={(e) => setNewStock(Number(e.target.value))}
                className="px-3 py-2.5 rounded-xl bg-obsidian border border-white/15 text-xs font-mono text-bone"
              />
            </div>
            <button
              type="submit"
              className="w-full py-3.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs flex items-center justify-center gap-1.5 shadow-volt hover:brightness-110 transition"
            >
              <Plus className="w-4 h-4" /> PUBLISH TO CATALOG
            </button>
          </form>

          <div className="lg:col-span-8 space-y-3.5">
            {products.map((p) => (
              <div
                key={p.slug}
                className="p-4 rounded-2xl bg-graphite border border-white/10 flex items-center justify-between gap-4"
              >
                <div className="flex items-center gap-3.5">
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
                  className="p-2 rounded-lg bg-obsidian text-muted hover:text-rose-400 transition"
                  title="Remove product"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* =====================================================================
          TAB 5: MEMBERSHIP COUPONS
         ===================================================================== */}
      {tab === 'coupons' && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {SEED_COUPONS.map((cp) => (
            <div
              key={cp.code}
              className="p-6 rounded-3xl bg-graphite border border-volt/30 space-y-2"
            >
              <div className="flex items-center justify-between">
                <span className="px-3 py-1 rounded-full bg-volt text-obsidian font-mono font-bold text-xs">
                  {cp.code}
                </span>
                <Tag className="w-4 h-4 text-volt" />
              </div>
              <p className="font-display text-3xl text-bone mt-2">
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
