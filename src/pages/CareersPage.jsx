import React, { useState } from 'react';
import { 
  Briefcase, 
  MapPin, 
  Clock, 
  ArrowRight, 
  Heart, 
  Zap, 
  ShieldCheck, 
  Users, 
  GraduationCap, 
  CheckCircle2, 
  Sparkles,
  Send
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

const openPositions = [
  {
    id: 'fe-eng',
    title: 'Senior Frontend Engineer (React / PWA)',
    department: 'Engineering',
    location: 'Addis Ababa / Hybrid',
    type: 'Full-time',
    description: 'Lead the frontend architecture of our offline-first PWA, bringing reliable service matching to millions of artisans and logistics operators across East Africa.',
    tags: ['React', 'TailwindCSS', 'PWA', 'IndexedDB'],
  },
  {
    id: 'be-eng',
    title: 'Backend Systems Engineer',
    department: 'Engineering',
    location: 'Addis Ababa / Remote',
    type: 'Full-time',
    description: 'Scale our real-time matching, escrow settlement, and multi-tenant telemetry pipelines with PostgreSQL and edge microservices.',
    tags: ['PostgreSQL', 'Node.js', 'Redis', 'FinTech'],
  },
  {
    id: 'ops-lead',
    title: 'Provider Operations & Verification Lead',
    department: 'Operations',
    location: 'Addis Ababa',
    type: 'Full-time',
    description: 'Scale our artisan credentialing, background checks, and compliance network to ensure trustworthy service delivery nationwide.',
    tags: ['Operations', 'Trust & Safety', 'Field Work'],
  },
  {
    id: 'fleet-mgr',
    title: 'Heavy Haulage Partner Specialist',
    department: 'Logistics',
    location: 'Addis Ababa / Adama',
    type: 'Full-time',
    description: 'Build strategic relationships with fleet owners, machinery rental businesses, and transport cooperatives.',
    tags: ['Logistics', 'Fleet Management', 'Partnerships'],
  },
  {
    id: 'product-designer',
    title: 'Product Designer (Low-Literacy & Multilingual UX)',
    department: 'Design',
    location: 'Remote (East Africa)',
    type: 'Full-time',
    description: 'Design intuitive, accessible voice- and visual-first flows for artisans across Amharic, Afaan Oromo, Swahili, and English.',
    tags: ['Figma', 'Accessibility', 'Multilingual UX', 'Research'],
  },
];

const perks = [
  {
    icon: Zap,
    title: 'Real Impact',
    desc: 'Empower independent artisans and fleet drivers to grow their livelihoods through technology and formal banking.',
  },
  {
    icon: ShieldCheck,
    title: 'Competitive Compensation',
    desc: 'Market-leading salaries, equity opportunities, and comprehensive health coverage for you and your dependents.',
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    desc: 'Work with passionate, pragmatic operators and technologists who value clarity, ownership, and inclusion.',
  },
  {
    icon: GraduationCap,
    title: 'Continuous Learning',
    desc: 'Generous learning budgets, technical mentorship, and regular field research expeditions.',
  },
];

export default function CareersPage() {
  const [selectedDept, setSelectedDept] = useState('All');
  const [applicationSent, setApplicationSent] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);

  const departments = ['All', 'Engineering', 'Operations', 'Logistics', 'Design'];

  const filteredJobs = selectedDept === 'All' 
    ? openPositions 
    : openPositions.filter((job) => job.department === selectedDept);

  return (
    <div className="flex-1 bg-slate-50 font-sans text-slate-800">
      {/* Hero Section */}
      <section className="bg-brand-navy py-16 lg:py-24 text-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
            <Sparkles className="h-4 w-4" /> We are hiring
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
            Build the Future of Skilled Trade and Logistics
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg text-slate-300 leading-relaxed">
            Join the team connecting millions of skilled artisans, heavy machinery operators, and clients across East Africa with secure escrow, offline tracking, and transparent matching.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <a href="#positions">
              <Button size="lg" className="gap-2">
                View Open Roles <ArrowRight className="h-4 w-4" />
              </Button>
            </a>
          </div>
        </div>
      </section>

      {/* Perks Grid */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-brand-navy">Why Join NHFAS?</h2>
          <p className="mt-2 text-slate-500">We care about building enduring tools that solve real everyday problems.</p>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {perks.map((p) => {
            const Icon = p.icon;
            return (
              <div key={p.title} className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                <div className="inline-flex rounded-xl bg-emerald-50 p-3 text-brand-green mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="font-bold text-brand-navy text-lg">{p.title}</h3>
                <p className="mt-2 text-sm text-slate-600 leading-relaxed">{p.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Open Roles Section */}
      <section id="positions" className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <h2 className="text-3xl font-extrabold text-brand-navy">Open Opportunities</h2>
              <p className="mt-2 text-slate-500">Find the role where you can do your best work.</p>
            </div>
            {/* Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {departments.map((dept) => (
                <button
                  key={dept}
                  onClick={() => setSelectedDept(dept)}
                  className={`rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                    selectedDept === dept
                      ? 'bg-brand-navy text-white shadow-sm'
                      : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                  }`}
                >
                  {dept}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-4">
            {filteredJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl border border-slate-200 p-6 hover:border-brand-green/60 hover:shadow-md transition-all flex flex-col md:flex-row md:items-center justify-between gap-6"
              >
                <div className="space-y-2">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-bold uppercase tracking-wider text-brand-green bg-brand-green/10 px-2.5 py-0.5 rounded-full">
                      {job.department}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">·</span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <MapPin className="h-3.5 w-3.5" /> {job.location}
                    </span>
                    <span className="text-xs font-semibold text-slate-400">·</span>
                    <span className="inline-flex items-center gap-1 text-xs text-slate-500">
                      <Clock className="h-3.5 w-3.5" /> {job.type}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-brand-navy">{job.title}</h3>
                  <p className="text-sm text-slate-600 max-w-3xl">{job.description}</p>
                  <div className="flex flex-wrap gap-1.5 pt-2">
                    {job.tags.map((tag) => (
                      <span key={tag} className="text-[11px] font-medium bg-slate-100 text-slate-600 px-2.5 py-0.5 rounded-md">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="shrink-0">
                  <Button
                    onClick={() => {
                      setSelectedJob(job);
                      window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
                    }}
                    className="w-full md:w-auto"
                  >
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application / General Inquiries Section */}
      <section className="py-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm text-center">
          <div className="inline-flex rounded-full bg-emerald-50 p-4 text-brand-green mb-4">
            <Send className="h-6 w-6" />
          </div>
          <h2 className="text-2xl font-bold text-brand-navy">
            {selectedJob ? `Apply for ${selectedJob.title}` : "Don't see your specific role?"}
          </h2>
          <p className="mt-2 text-sm text-slate-500 max-w-lg mx-auto">
            We are constantly looking for mission-driven engineers, operators, and growth leaders. Send your resume and portfolio to our talent team.
          </p>

          {applicationSent ? (
            <div className="mt-6 rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 text-sm font-semibold flex items-center justify-center gap-2">
              <CheckCircle2 className="h-5 w-5 text-brand-green" />
              Thank you! Your application has been received. Our recruiting team will review and be in touch.
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setApplicationSent(true);
              }}
              className="mt-8 space-y-4 text-left"
            >
              <div className="grid sm:grid-cols-2 gap-4">
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Full Name
                  <input required placeholder="Your name" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20" />
                </label>
                <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                  Email Address
                  <input type="email" required placeholder="you@example.com" className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20" />
                </label>
              </div>

              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                LinkedIn / Portfolio / Resume Link
                <input required placeholder="https://..." className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20" />
              </label>

              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Brief Introduction
                <textarea rows={4} placeholder="Tell us why you are interested in NHFAS..." className="mt-1 block w-full rounded-lg border border-slate-300 px-3 py-2 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20" />
              </label>

              <Button type="submit" className="w-full justify-center">
                Submit Application
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}

