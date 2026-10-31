import React from 'react';
import { 
  ShieldCheck, 
  Lock, 
  AlertTriangle, 
  FileCheck2, 
  PhoneCall, 
  CheckCircle2, 
  Eye, 
  UserCheck, 
  CreditCard, 
  ArrowRight,
  LifeBuoy
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '../components/Button';

const safetyPillars = [
  {
    icon: UserCheck,
    title: 'Multi-Tier Identity Verification',
    desc: 'Every service provider is required to submit verified Kebele ID or National Passport along with certified municipal trade or TVET accreditation before accepting client bookings.',
  },
  {
    icon: Lock,
    title: 'Protected Escrow Payments',
    desc: 'Clients never pay cash directly to strangers. Payments are held in secure escrow ledgers and released exclusively upon milestone confirmation or completed delivery signoff.',
  },
  {
    icon: AlertTriangle,
    title: 'SOS Emergency & Dispute Freeze',
    desc: 'In the rare event of safety concerns, damage, or unauthorized conduct, our real-time SOS trigger freezes the escrow release immediately and notifies safety response personnel.',
  },
  {
    icon: Eye,
    title: 'Live GPS Tracking & Route Audits',
    desc: 'Heavy haulage transport, machinery rentals, and en-route artisans transmit live telemetry, enabling clients and fleet controllers to monitor transit in real time.',
  },
];

const clientGuidelines = [
  'Keep all job coordination and quote revisions inside the official NHFAS chat so records are preserved.',
  'Never release escrow payments before inspecting completed work or receiving shipment receipts.',
  'Confirm the provider matches the verified photo and credentials shown on their digital profile.',
  'Report unsafe conduct or contract breach immediately via the job detail screen.',
];

const providerGuidelines = [
  'Upload valid municipal trade licenses or TVET certification to maintain your Verified Provider badge.',
  'Always submit milestone photos or handover signatures before requesting escrow funds disbursement.',
  'Adhere strictly to permitted axle-weight limits and weigh-station regulations on heavy cargo corridors.',
  'Treat client premises, safety protocols, and personal property with strict professionalism.',
];

export default function TrustSafetyPage() {
  return (
    <div className="flex-1 bg-slate-50 font-sans text-slate-800">
      {/* Hero Section */}
      <section className="bg-brand-navy py-16 lg:py-24 text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <span className="inline-flex items-center gap-2 rounded-full bg-brand-green/20 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-brand-green">
            <ShieldCheck className="h-4 w-4" /> Platform Integrity & Security
          </span>
          <h1 className="mt-6 text-4xl sm:text-5xl font-extrabold tracking-tight">
            Trust & Safety at NHFAS
          </h1>
          <p className="mt-5 max-w-2xl mx-auto text-base sm:text-lg text-slate-300 leading-relaxed">
            Our mission is to establish uncompromising safety, accountability, and financial transparency for every artisan job, heavy haulage route, and equipment hire.
          </p>
          <div className="mt-8 flex justify-center gap-4">
            <Button as={Link} to="/dashboard/verification" size="lg" className="gap-2">
              Check Verification Status <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </section>

      {/* Safety Pillars */}
      <section className="py-16 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extrabold text-brand-navy">How We Protect Our Community</h2>
          <p className="mt-2 text-slate-500 max-w-xl mx-auto">
            Layered technology, regulatory compliance, and active operational oversight built into every interaction.
          </p>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {safetyPillars.map((p) => {
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

      {/* Standards & Guidelines Grid */}
      <section className="py-16 bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-extrabold text-brand-navy">Community Safety Standards</h2>
            <p className="mt-2 text-slate-500">Mutual responsibilities that make our platform safe for everyone.</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* For Clients */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-sky-800 font-bold">
                  1
                </span>
                <h3 className="text-xl font-bold text-brand-navy">Guidelines for Clients</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-700">
                {clientGuidelines.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* For Providers */}
            <div className="rounded-3xl border border-slate-200 bg-slate-50 p-8">
              <div className="flex items-center gap-3 mb-6">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-100 text-emerald-800 font-bold">
                  2
                </span>
                <h3 className="text-xl font-bold text-brand-navy">Guidelines for Providers</h3>
              </div>
              <ul className="space-y-4 text-sm text-slate-700">
                {providerGuidelines.map((item, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-brand-green shrink-0 mt-0.5" />
                    <span className="leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Incident Escalation Banner */}
      <section className="py-16 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-3xl bg-brand-navy text-white p-8 sm:p-12 text-center space-y-6">
          <div className="inline-flex rounded-full bg-red-500/20 p-4 text-red-400">
            <LifeBuoy className="h-8 w-8" />
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold">Need to Report a Safety Incident?</h2>
          <p className="text-slate-300 text-sm max-w-xl mx-auto leading-relaxed">
            If you encounter unsafe conditions, harassment, or financial misconduct, report it immediately through your active booking details page or contact our rapid incident response line.
          </p>
          <div className="flex flex-wrap justify-center gap-4 pt-2">
            <Button as={Link} to="/contact" size="lg" className="gap-2">
              <PhoneCall className="h-4 w-4" /> Incident Escalation Team
            </Button>
            <Button as={Link} to="/terms" variant="outline" size="lg" className="border-slate-600 text-white hover:bg-slate-800">
              Review Terms of Service
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

