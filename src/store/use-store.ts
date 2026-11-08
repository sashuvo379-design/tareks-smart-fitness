'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SeedProduct } from '@/lib/seed-data';

export interface CartItem {
  id: string; // composite key: slug + color + engraving + giftWrap
  slug: string;
  name: string;
  pillar: 'WALLET' | 'MACHINERY';
  price: number;
  image: string;
  sku: string;
  qty: number;
  selectedColor: string;
  engravingText?: string;
  giftPackaging?: boolean;
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  variant?: 'default' | 'volt' | 'gold' | 'ember';
}

interface IronforgeState {
  // Cart
  cart: CartItem[];
  isCartOpen: boolean;
  couponCode: string | null;
  discountPct: number;
  setCartOpen: (open: boolean) => void;
  addToCart: (item: Omit<CartItem, 'id'>) => void;
  updateQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  applyCoupon: (code: string) => boolean;

  // Wishlist, Recently Viewed & Compare (up to 3)
  wishlist: string[];
  recentlyViewed: string[];
  compareList: SeedProduct[];
  isCompareModalOpen: boolean;
  toggleWishlist: (slug: string) => void;
  addRecentlyViewed: (slug: string) => void;
  toggleCompare: (product: SeedProduct) => void;
  clearCompare: () => void;
  setCompareModalOpen: (open: boolean) => void;

  // Localization & Preferences
  currency: 'USD' | 'BDT' | 'EUR';
  locale: 'en' | 'bn';
  soundEnabled: boolean;
  reduced3D: boolean;
  isSearchOpen: boolean;
  setCurrency: (c: 'USD' | 'BDT' | 'EUR') => void;
  setLocale: (l: 'en' | 'bn') => void;
  setSoundEnabled: (v: boolean) => void;
  setReduced3D: (v: boolean) => void;
  setSearchOpen: (v: boolean) => void;

  // Toasts
  toasts: ToastMessage[];
  addToast: (t: Omit<ToastMessage, 'id'>) => void;
  removeToast: (id: string) => void;
}

const VALID_COUPONS: Record<string, number> = {
  IRON10: 10,
  FORGE20: 20,
  LEGACY15: 15,
};

export const useStore = create<IronforgeState>()(
  persist(
    (set, get) => ({
      cart: [],
      isCartOpen: false,
      couponCode: null,
      discountPct: 0,

      setCartOpen: (open) => set({ isCartOpen: open }),

      addToCart: (item) => {
        const compositeId = `${item.slug}-${item.selectedColor}-${item.engravingText || 'none'}-${item.giftPackaging ? 'gift' : 'std'}`;
        const existing = get().cart.find((c) => c.id === compositeId);
        if (existing) {
          set({
            cart: get().cart.map((c) =>
              c.id === compositeId ? { ...c, qty: c.qty + item.qty } : c
            ),
            isCartOpen: true,
          });
        } else {
          set({
            cart: [...get().cart, { ...item, id: compositeId }],
            isCartOpen: true,
          });
        }
        get().addToast({
          title: `Added ${item.name}`,
          description: item.engravingText
            ? `Personalization: "${item.engravingText}"`
            : `${item.selectedColor} • Qty ${item.qty}`,
          variant: item.pillar === 'WALLET' ? 'gold' : 'volt',
        });
      },

      updateQty: (id, delta) => {
        const updated = get()
          .cart.map((c) => (c.id === id ? { ...c, qty: c.qty + delta } : c))
          .filter((c) => c.qty > 0);
        set({ cart: updated });
      },

      removeFromCart: (id) => {
        set({ cart: get().cart.filter((c) => c.id !== id) });
      },

      clearCart: () => set({ cart: [], couponCode: null, discountPct: 0 }),

      applyCoupon: (code) => {
        const upper = code.trim().toUpperCase();
        if (VALID_COUPONS[upper]) {
          set({ couponCode: upper, discountPct: VALID_COUPONS[upper] });
          get().addToast({
            title: `Coupon ${upper} Applied!`,
            description: `${VALID_COUPONS[upper]}% discount activated on your order.`,
            variant: 'volt',
          });
          return true;
        }
        get().addToast({
          title: 'Invalid Coupon Code',
          description: 'Try IRON10, FORGE20, or LEGACY15.',
          variant: 'ember',
        });
        return false;
      },

      wishlist: [],
      recentlyViewed: [],
      compareList: [],
      isCompareModalOpen: false,

      toggleWishlist: (slug) => {
        const exists = get().wishlist.includes(slug);
        set({
          wishlist: exists
            ? get().wishlist.filter((s) => s !== slug)
            : [...get().wishlist, slug],
        });
        get().addToast({
          title: exists ? 'Removed from Wishlist' : 'Saved to Wishlist',
          variant: 'default',
        });
      },

      addRecentlyViewed: (slug) => {
        const filtered = get().recentlyViewed.filter((s) => s !== slug);
        set({ recentlyViewed: [slug, ...filtered].slice(0, 8) });
      },

      toggleCompare: (product) => {
        const exists = get().compareList.some((p) => p.slug === product.slug);
        if (exists) {
          set({
            compareList: get().compareList.filter((p) => p.slug !== product.slug),
          });
          return;
        }
        if (get().compareList.length >= 3) {
          get().addToast({
            title: 'Compare Limit Reached (Max 3)',
            description: 'Remove an item before adding another to compare.',
            variant: 'ember',
          });
          return;
        }
        set({ compareList: [...get().compareList, product] });
        get().addToast({
          title: `Added to Compare (${get().compareList.length}/3)`,
          description: product.name,
          variant: 'volt',
        });
      },

      clearCompare: () => set({ compareList: [], isCompareModalOpen: false }),
      setCompareModalOpen: (open) => set({ isCompareModalOpen: open }),

      currency: 'USD',
      locale: 'en',
      soundEnabled: false,
      reduced3D: false,
      isSearchOpen: false,

      setCurrency: (currency) => set({ currency }),
      setLocale: (locale) => set({ locale }),
      setSoundEnabled: (soundEnabled) => set({ soundEnabled }),
      setReduced3D: (reduced3D) => set({ reduced3D }),
      setSearchOpen: (isSearchOpen) => set({ isSearchOpen }),

      toasts: [],
      addToast: (t) => {
        const id = Math.random().toString(36).slice(2, 9);
        set({ toasts: [...get().toasts, { ...t, id }] });
        setTimeout(() => {
          get().removeToast(id);
        }, 3800);
      },
      removeToast: (id) =>
        set({ toasts: get().toasts.filter((t) => t.id !== id) }),
    }),
    {
      name: 'tareks-smart-gym-storage-v2',
      partialize: (state) => ({
        cart: state.cart,
        wishlist: state.wishlist,
        recentlyViewed: state.recentlyViewed,
        currency: state.currency,
        locale: state.locale,
        reduced3D: state.reduced3D,
      }),
    }
  )
);
