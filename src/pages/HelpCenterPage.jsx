import React, { useState } from 'react';
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  ShieldCheck, 
  CreditCard, 
  Wrench, 
  Truck, 
  FileQuestion, 
  MessageSquare, 
  ChevronDown, 
  ChevronUp, 
  PhoneCall, 
  ArrowRight,
  ExternalLink
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

const supportCategories = [
  {
    icon: CreditCard,
    title: 'Payments & Escrow',
    desc: 'How deposits, Telebirr, milestone payouts, and refunds work.',
    link: '#payments',
  },
  {
    icon: Wrench,
    title: 'Posting & Booking Jobs',
    desc: 'Creating requests, selecting trades, and reviewing bids.',
    link: '#booking',
  },
  {
    icon: ShieldCheck,
    title: 'Verification & Safety',
    desc: 'Government ID verification, background checks, and SOS.',
    link: '#safety',
  },
  {
    icon: Truck,
    title: 'Fleet & Heavy Haulage',
    desc: 'Axle-load limits, machinery transport, and route logs.',
    link: '#fleet',
  },
];

const faqs = [
  {
    category: 'payments',
    q: 'How does escrow protection work on NHFAS?',
    a: 'When you accept a provider quote or bid, your payment is held securely in an isolated escrow account. Funds are only released to the provider when you verify milestone completion or approve final delivery. If an issue arises, you can pause disbursement with a single click.',
  },
  {
    category: 'payments',
    q: 'Which payment methods are supported in Ethiopia?',
    a: 'NHFAS natively integrates with Telebirr, CBE Birr, and Awash Bank, as well as international cards for diaspora and corporate clients. Payouts to providers can be routed instantly upon milestone clearance.',
  },
  {
    category: 'booking',
    q: 'How do I request a custom build or specialized artisan?',
    a: 'Navigate to Post a Job from your dashboard, select the Artisan or Custom Build category, and upload your specifications or reference sketches. Qualified providers in your zone will submit binding cost estimates with material breakdown.',
  },
  {
    category: 'booking',
    q: 'What if a provider does not show up on time?',
    a: 'All jobs track provider status ("en route", "on site"). If a provider is unresponsive or fails to arrive within the scheduled window, you can cancel the request without penalty, and 100% of your escrow balance is refunded immediately.',
  },
  {
    category: 'safety',
    q: 'How are service providers verified before they take jobs?',
    a: 'Providers must submit valid government identification (Kebele ID, National ID, or Passport), trade certifications (TVET certificates or municipal licenses), and pass our automated facial match verification. Providers with verified badges carry higher platform trust ratings.',
  },
  {
    category: 'safety',
    q: 'What should I do in an emergency during an active job?',
    a: 'Every active job screen features an emergency SOS button. Tapping it freezes the escrow account immediately, logs the GPS coordinates, and alerts both our 24/7 trust escalation team and emergency responders.',
  },
  {
    category: 'fleet',
    q: 'How are axle loads and transit weight validated for haulage?',
    a: 'Logistics operators must register their vehicle specs and permitted axle ratings. When accepting heavy loads, the platform automatically cross-references total mass against route weigh-station regulations to prevent impoundment and fines.',
  },
];

export default function HelpCenterPage() {
  const [search, setSearch] = useState('');
  const [openFaq, setOpenFaq] = useState(0);

  const filteredFaqs = faqs.filter(
    (f) =>
      f.q.toLowerCase().includes(search.toLowerCase()) ||
      f.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="flex-1 bg-slate-50 font-sans text-slate-800">
      {/* Header */}
      <section className="bg-brand-navy py-16 lg:py-20 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
            <HelpCircle className="h-4 w-4" /> 24/7 Support & Help Center
          </span>
          <h1 className="mt-5 text-4xl sm:text-5xl font-extrabold tracking-tight">
            How can we help you today?
          </h1>
          <p className="mt-4 text-slate-300 max-w-xl mx-auto text-base">
            Search our knowledge base for instant answers on payments, bookings, verification, and safety.
          </p>

          <div className="mt-8 max-w-xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search help articles (e.g., escrow, refunds, cancel job)..."
              className="w-full rounded-full border border-slate-700 bg-slate-800/80 py-3.5 pl-12 pr-4 text-sm text-white placeholder-slate-400 focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/40 shadow-inner"
            />
          </div>
        </div>
      </section>

      {/* Category Cards */}
      <section className="py-12 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {supportCategories.map((cat) => {
            const Icon = cat.icon;
            return (
              <a
                key={cat.title}
                href={cat.link}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:border-brand-green hover:shadow-md transition-all group"
              >
                <div className="inline-flex rounded-xl bg-emerald-50 p-3 text-brand-green mb-4 group-hover:scale-105 transition-transform">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-brand-navy text-lg group-hover:text-brand-green transition-colors">
                  {cat.title}
                </h3>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">{cat.desc}</p>
              </a>
            );
          })}
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-12 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-extrabold text-brand-navy">Frequently Asked Questions</h2>
          <p className="mt-2 text-slate-500">Quick answers to common questions about the NHFAS platform.</p>
        </div>

        <div className="space-y-4">
          {filteredFaqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 bg-white overflow-hidden shadow-sm transition-all"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : index)}
                  className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 font-bold text-brand-navy hover:text-brand-green transition-colors"
                >
                  <span className="text-base sm:text-lg">{faq.q}</span>
                  {isOpen ? <ChevronUp className="h-5 w-5 shrink-0 text-brand-green" /> : <ChevronDown className="h-5 w-5 shrink-0 text-slate-400" />}
                </button>
                {isOpen && (
                  <div className="px-6 pb-6 pt-1 text-sm sm:text-base text-slate-600 leading-relaxed border-t border-slate-50">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Direct Contact Banner */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex rounded-full bg-sky-50 p-4 text-sky-700">
            <MessageSquare className="h-7 w-7" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-navy">Still need assistance?</h2>
          <p className="text-slate-500 max-w-md mx-auto text-sm leading-relaxed">
            Our customer success and safety operations team is available 24/7 to review bookings, verify payments, and resolve disputes.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-4">
            <Button as={Link} to="/contact" size="lg" className="gap-2">
              <PhoneCall className="h-4 w-4" /> Contact Support Team
            </Button>
            <Button as={Link} to="/dashboard/bookings" variant="outline" size="lg">
              Check Booking Status
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

