'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { SEED_BLOG_POSTS } from '@/lib/seed-data';
import { ArrowUpRight, Clock, User } from 'lucide-react';

export default function BlogIndexPage() {
  const [cat, setCat] = useState('ALL');
  const categories = ['ALL', 'TRAINING', 'NUTRITION', 'WALLET_CARE', 'EQUIPMENT_GUIDE'];

  const filtered =
    cat === 'ALL'
      ? SEED_BLOG_POSTS
      : SEED_BLOG_POSTS.filter((b) => b.category === cat);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="px-3.5 py-1.5 rounded-full bg-volt/15 border border-volt/30 text-volt font-mono text-xs uppercase tracking-widest">
          IRONFORGE R&amp;D DISPATCH
        </span>
        <h1 className="font-display text-6xl text-bone leading-none">
          THE <span className="text-volt">FORGE JOURNAL</span>
        </h1>
        <p className="text-muted text-base">
          Biomechanics research, peri-workout nutrition math, vegetable-tanned leather patina guides, and commercial gym architecture blueprints.
        </p>

        <div className="flex flex-wrap justify-center gap-2 pt-2">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setCat(c)}
              className={`px-4 py-2 rounded-xl font-mono text-xs border transition ${
                cat === c
                  ? 'bg-volt text-obsidian border-volt font-bold'
                  : 'bg-graphite text-muted border-white/10 hover:text-bone'
              }`}
            >
              {c.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="rounded-2xl bg-graphite border border-white/10 hover:border-volt/50 overflow-hidden flex flex-col justify-between group transition"
          >
            <div>
              <img
                src={post.coverImage}
                alt={post.title}
                className="w-full h-52 object-cover group-hover:scale-105 transition duration-500"
              />
              <div className="p-6">
                <div className="flex items-center justify-between text-xs font-mono text-volt mb-2">
                  <span>{post.category}</span>
                  <span className="flex items-center gap-1 text-muted">
                    <Clock className="w-3 h-3" /> {post.readTime}
                  </span>
                </div>
                <h2 className="font-display text-2xl text-bone group-hover:text-volt transition leading-snug">
                  {post.title}
                </h2>
                <p className="text-xs text-muted mt-3 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-3 border-t border-white/5 flex items-center justify-between text-xs font-mono text-muted">
              <span className="flex items-center gap-1.5">
                <User className="w-3.5 h-3.5 text-gold" /> {post.author}
              </span>
              <ArrowUpRight className="w-4 h-4 text-volt" />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
