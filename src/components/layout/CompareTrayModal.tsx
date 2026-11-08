'use client';

import React from 'react';
import Link from 'next/link';
import { useStore } from '@/store/use-store';
import { formatPrice } from '@/lib/utils';
import { Scale, X, Trash2 } from 'lucide-react';

export default function CompareTrayModal() {
  const {
    compareList,
    toggleCompare,
    clearCompare,
    isCompareModalOpen,
    setCompareModalOpen,
    currency,
  } = useStore();

  if (compareList.length === 0) return null;

  const allSpecKeys = Array.from(
    new Set(compareList.flatMap((p) => Object.keys(p.specs)))
  );

  return (
    <>
      {/* Floating Bottom Compare Bar */}
      <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 px-4 py-3 rounded-2xl bg-obsidian/95 backdrop-blur-xl border border-volt/50 shadow-2xl flex items-center gap-4 max-w-[95vw]">
        <div className="flex items-center gap-2 text-volt font-mono text-xs font-bold">
          <Scale className="w-4 h-4" />
          <span>COMPARE ({compareList.length}/3)</span>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          {compareList.map((item) => (
            <div
              key={item.slug}
              className="px-2.5 py-1 rounded-lg bg-graphite border border-white/10 text-xs text-bone flex items-center gap-2"
            >
              <span className="truncate max-w-[130px]">{item.name}</span>
              <button
                onClick={() => toggleCompare(item)}
                className="text-muted hover:text-ember"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={() => setCompareModalOpen(true)}
          className="px-4 py-1.5 rounded-xl bg-volt text-obsidian font-mono font-bold text-xs shadow-volt"
        >
          Compare Specs
        </button>

        <button
          onClick={clearCompare}
          aria-label="Clear compare list"
          className="p-1.5 text-muted hover:text-ember"
        >
          <Trash2 className="w-4 h-4" />
        </button>
      </div>

      {/* Side-by-Side Specification Modal */}
      {isCompareModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() => setCompareModalOpen(false)}
            className="fixed inset-0 bg-black/85 backdrop-blur-md"
          />
          <div className="relative z-10 w-full max-w-5xl max-h-[88vh] overflow-y-auto rounded-3xl bg-graphite border border-white/15 p-6 lg:p-8 shadow-2xl">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-6">
              <div>
                <span className="font-mono text-xs text-volt uppercase">
                  SIDE-BY-SIDE TECHNICAL MATRIX
                </span>
                <h3 className="font-display text-3xl text-bone">
                  PRODUCT COMPARISON ({compareList.length} ITEMS)
                </h3>
              </div>
              <button
                onClick={() => setCompareModalOpen(false)}
                className="p-2 rounded-xl bg-obsidian text-muted hover:text-bone"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="border-b border-white/10">
                    <th className="py-4 px-3 font-mono text-xs text-muted uppercase w-44">
                      Specification
                    </th>
                    {compareList.map((item) => (
                      <th key={item.slug} className="py-4 px-4 min-w-[220px]">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-32 object-cover rounded-xl border border-white/10 mb-3"
                        />
                        <Link
                          href={`/product/${item.slug}`}
                          onClick={() => setCompareModalOpen(false)}
                          className="font-display text-xl text-bone hover:text-volt block"
                        >
                          {item.name}
                        </Link>
                        <p className="font-mono text-volt text-sm mt-1">
                          {formatPrice(item.price, currency)}
                        </p>
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/10 text-sm">
                  <tr>
                    <td className="py-3 px-3 font-mono text-xs text-muted">Category</td>
                    {compareList.map((p) => (
                      <td key={p.slug} className="py-3 px-4 text-bone">
                        {p.category}
                      </td>
                    ))}
                  </tr>
                  <tr>
                    <td className="py-3 px-3 font-mono text-xs text-muted">Materials</td>
                    {compareList.map((p) => (
                      <td key={p.slug} className="py-3 px-4 text-bone">
                        {p.materials.join(', ')}
                      </td>
                    ))}
                  </tr>
                  {allSpecKeys.map((key) => (
                    <tr key={key}>
                      <td className="py-3 px-3 font-mono text-xs text-muted">{key}</td>
                      {compareList.map((p) => (
                        <td key={p.slug} className="py-3 px-4 text-bone font-mono text-xs">
                          {p.specs[key] || '—'}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
