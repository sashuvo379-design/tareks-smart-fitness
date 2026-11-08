import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { BRAND_CONFIG } from './brand';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPrice(
  usdAmount: number,
  currency: keyof typeof BRAND_CONFIG.currencies = 'USD'
): string {
  const cfg = BRAND_CONFIG.currencies[currency] || BRAND_CONFIG.currencies.USD;
  const converted = Math.round(usdAmount * cfg.rate);
  return `${cfg.symbol}${converted.toLocaleString()}`;
}
