import React, { useState } from 'react';
import { 
  BookOpen, 
  Search, 
  Calendar, 
  User, 
  ArrowRight, 
  Tag, 
  Share2, 
  TrendingUp, 
  ShieldCheck, 
  Truck, 
  Wrench,
  Check
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

const blogPosts = [
  {
    id: 'fair-pricing-east-africa',
    title: 'How Algorithmic Price Guarantees Protect Clients and Artisans',
    slug: 'fair-pricing-east-africa',
    excerpt: 'Fluctuating material costs and opaque labor pricing have long strained trust in informal services. Here is how NHFAS uses verifiable market indices and fair escrow.',
    category: 'Marketplace & Economy',
    author: 'Tewodros Assefa',
    role: 'Head of Economics & Pricing',
    date: 'Oct 28, 2026',
    readTime: '5 min read',
    featured: true,
    tags: ['Fair Pricing', 'Escrow', 'FinTech'],
  },
  {
    id: 'heavy-haulage-axle-load',
    title: 'Navigating Axle-Load Regulations & Multi-Stop Transport in Ethiopia',
    slug: 'heavy-haulage-axle-load',
    excerpt: 'Transporting oversized machinery between regional hubs requires strict route verification and weight compliance. We review how our digital fleet logs simplify transit.',
    category: 'Logistics',
    author: 'Mulugeta Bekele',
    role: 'Logistics Compliance Lead',
    date: 'Oct 22, 2026',
    readTime: '7 min read',
    featured: false,
    tags: ['Heavy Haulage', 'Compliance', 'Fleet'],
  },
  {
    id: 'offline-pwa-engineering',
    title: 'Building Offline-First Architecture for Low-Connectivity Corridors',
    slug: 'offline-pwa-engineering',
    excerpt: 'Field workers frequently encounter remote work sites with zero cellular data. A deep dive into our Service Worker and IndexedDB two-way sync strategy.',
    category: 'Engineering',
    author: 'Bethlehem Tadesse',
    role: 'Principal Engineer',
    date: 'Oct 15, 2026',
    readTime: '6 min read',
    featured: false,
    tags: ['Architecture', 'PWA', 'Offline DB'],
  },
  {
    id: 'artisan-certification-trust',
    title: 'Why Verified Artisan Credentials Transform Job Completion Rates',
    slug: 'artisan-certification-trust',
    excerpt: 'Examining the empirical impact of government-backed TVET certifications and platform background vetting on dispute mitigation and project satisfaction.',
    category: 'Trust & Safety',
    author: 'Samrawit Girma',
    role: 'Trust & Verification Director',
    date: 'Oct 09, 2026',
    readTime: '4 min read',
    featured: false,
    tags: ['Certificates', 'Trust', 'Artisans'],
  },
  {
    id: 'multilingual-voice-accessibility',
    title: 'Designing for Voice and Multilingual Accessibility Across 4 Languages',
    slug: 'multilingual-voice-accessibility',
    excerpt: 'How we engineered voice note messaging, speech synthesis, and low-literacy interfaces across Amharic, Afaan Oromo, Swahili, and English.',
    category: 'Product Design',
    author: 'Kibrom Haile',
    role: 'Lead UX Researcher',
    date: 'Sep 29, 2026',
    readTime: '6 min read',
    featured: false,
    tags: ['Accessibility', 'UX', 'Voice'],
  },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [copiedId, setCopiedId] = useState(null);

  const categories = ['All', 'Marketplace & Economy', 'Logistics', 'Engineering', 'Trust & Safety', 'Product Design'];

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCat = selectedCategory === 'All' || post.category === selectedCategory;
    const matchesQuery = 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCat && matchesQuery;
  });

  const featuredPost = blogPosts.find((p) => p.featured) || blogPosts[0];

  const handleShare = (id) => {
    setCopiedId(id);
    navigator.clipboard?.writeText(window.location.href);
    setTimeout(() => setCopiedId(null), 2000);
  };

  return (
    <div className="flex-1 bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <section className="bg-brand-navy py-16 lg:py-20 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
            <BookOpen className="h-4 w-4" /> NHFAS Insights & Engineering
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Knowledge, Stories & Updates
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-base sm:text-lg text-slate-300">
            Insights on marketplace economics, logistics technology, offline engineering, and skilled trade empowerment.
          </p>

          {/* Search bar */}
          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search articles by topic, title, or tag..."
              className="w-full rounded-full border border-slate-700 bg-slate-800/80 py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/40 shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-12">
        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`rounded-full px-4 py-2 text-xs font-bold uppercase tracking-wider whitespace-nowrap transition-colors ${
                selectedCategory === cat
                  ? 'bg-brand-navy text-white shadow-sm'
                  : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Featured Story */}
        {selectedCategory === 'All' && !searchQuery && (
          <div className="rounded-3xl border border-slate-200 bg-white p-6 sm:p-10 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row gap-8 items-start justify-between">
              <div className="space-y-4 max-w-2xl">
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-50 text-brand-green px-3 py-1 text-xs font-bold uppercase tracking-wider">
                    Featured Insight
                  </span>
                  <span className="text-xs text-slate-400">·</span>
                  <span className="text-xs font-semibold text-slate-500">{featuredPost.category}</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-brand-navy leading-snug">
                  {featuredPost.title}
                </h2>
                <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                  {featuredPost.excerpt}
                </p>
                <div className="flex flex-wrap items-center gap-4 pt-2 text-xs text-slate-500">
                  <span className="font-semibold text-slate-800">{featuredPost.author}</span>
                  <span>·</span>
                  <span>{featuredPost.date}</span>
                  <span>·</span>
                  <span>{featuredPost.readTime}</span>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row lg:flex-col gap-3 w-full lg:w-auto shrink-0">
                <Button as={Link} to="/services/handyman" className="gap-2 justify-center">
                  Explore Platform <ArrowRight className="h-4 w-4" />
                </Button>
                <button
                  onClick={() => handleShare(featuredPost.id)}
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50"
                >
                  {copiedId === featuredPost.id ? <Check className="h-4 w-4 text-brand-green" /> : <Share2 className="h-4 w-4" />}
                  {copiedId === featuredPost.id ? 'Link copied' : 'Share'}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Article Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md hover:border-brand-green/50 transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-center justify-between text-xs text-slate-400">
                  <span className="font-bold uppercase tracking-wider text-brand-green">{post.category}</span>
                  <span>{post.readTime}</span>
                </div>
                <h3 className="text-lg font-bold text-brand-navy line-clamp-2">
                  {post.title}
                </h3>
                <p className="text-sm text-slate-600 line-clamp-3 leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="flex flex-wrap gap-1.5 pt-2">
                  {post.tags.map((t) => (
                    <span key={t} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2 py-0.5 rounded">
                      #{t}
                    </span>
                  ))}
                </div>
              </div>

              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center justify-between text-xs">
                <div>
                  <p className="font-bold text-brand-navy">{post.author}</p>
                  <p className="text-slate-400">{post.date}</p>
                </div>
                <button
                  onClick={() => handleShare(post.id)}
                  aria-label="Share post"
                  className="rounded-full p-2 text-slate-400 hover:bg-slate-100 hover:text-brand-navy transition-colors"
                >
                  {copiedId === post.id ? <Check className="h-4 w-4 text-brand-green" /> : <Share2 className="h-4 w-4" />}
                </button>
              </div>
            </article>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-16 bg-white rounded-2xl border border-slate-200">
            <BookOpen className="h-10 w-10 text-slate-300 mx-auto mb-3" />
            <h3 className="text-lg font-bold text-brand-navy">No articles found</h3>
            <p className="text-sm text-slate-500 mt-1">Try adjusting your search query or switching categories.</p>
          </div>
        )}
      </div>
    </div>
  );
}

