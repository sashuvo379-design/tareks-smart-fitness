import React from 'react';
import Link from 'next/link';
import { SEED_BLOG_POSTS } from '@/lib/seed-data';
import { ArrowLeft, Clock, User } from 'lucide-react';

export default function BlogPostDetailPage({
  params,
}: {
  params: { slug: string };
}) {
  const post =
    SEED_BLOG_POSTS.find((p) => p.slug === params.slug) || SEED_BLOG_POSTS[0];

  return (
    <article className="max-w-3xl mx-auto px-4 sm:px-6 py-12 space-y-8">
      <Link
        href="/blog"
        className="inline-flex items-center gap-2 font-mono text-xs text-volt hover:underline"
      >
        <ArrowLeft className="w-4 h-4" /> BACK TO FORGE JOURNAL
      </Link>

      <div className="space-y-4">
        <span className="px-3 py-1 rounded-full bg-volt/15 text-volt font-mono text-xs">
          {post.category}
        </span>
        <h1 className="font-display text-5xl text-bone leading-tight">
          {post.title}
        </h1>
        <div className="flex items-center gap-4 text-xs font-mono text-muted">
          <span className="flex items-center gap-1.5 text-gold">
            <User className="w-3.5 h-3.5" /> {post.author}
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" /> {post.readTime}
          </span>
        </div>
      </div>

      <img
        src={post.coverImage}
        alt={post.title}
        className="w-full h-80 object-cover rounded-2xl border border-white/10"
      />

      <div className="p-8 rounded-2xl bg-graphite border border-white/10 space-y-4 text-base text-bone/90 leading-relaxed whitespace-pre-line">
        {post.content}
      </div>
    </article>
  );
}
