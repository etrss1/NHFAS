import React, { useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '../../lib/utils';
import { useTranslation } from '../../i18n/I18nContext';
import { 
  LayoutDashboard, 
  Calendar, 
  Briefcase, 
  DollarSign, 
  Star, 
  Settings,
  MapPin,
  Wrench,
  BadgeCheck,
  PlusCircle,
  MessageSquareText,
  Calculator,
  Bell,
  Wallet,
  User,
  Truck,
  ShieldCheck,
  FileText,
  CreditCard,
  Leaf,
  Gavel,
} from 'lucide-react';

const Sidebar = ({ fullName, isClientMode, role, open, onClose }) => {
  const location = useLocation();
  const { t } = useTranslation();

  // Any navigation closes the mobile drawer.
  useEffect(() => {
    onClose?.();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname]);

  const providerSections = [
    {
      label: t('section.work'),
      items: [
        { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard },
        { name: t('nav.bookings'), href: '/dashboard/bookings', icon: Calendar },
        { name: t('nav.messages'), href: '/dashboard/messages', icon: MessageSquareText },
        { name: t('nav.find_me'), href: '/dashboard/find-me', icon: MapPin },
      ],
    },
    {
      label: t('section.grow'),
      items: [
        { name: t('nav.services'), href: '/dashboard/services', icon: Briefcase },
        { name: t('nav.earnings'), href: '/dashboard/earnings', icon: DollarSign },
        { name: t('nav.payments'), href: '/dashboard/payouts', icon: CreditCard },
        { name: t('nav.marketplace'), href: '/dashboard/auctions', icon: Gavel },
        { name: t('nav.reviews'), href: '/dashboard/reviews', icon: Star },
        { name: t('nav.verification'), href: '/dashboard/verification', icon: BadgeCheck },
        { name: t('nav.fleet'), href: '/dashboard/fleet', icon: Truck },
        { name: t('nav.cost_estimator'), href: '/dashboard/emissions', icon: Leaf },
        { name: t('nav.certificates'), href: '/dashboard/certificates', icon: ShieldCheck },
      ],
    },
    {
      label: t('section.account'),
      items: [
        { name: t('nav.notifications'), href: '/dashboard/notifications', icon: Bell },
        { name: t('nav.settings'), href: '/dashboard/settings', icon: Settings },
      ],
    },
  ];

  const clientSections = [
    {
      label: t('section.hire'),
      items: [
        { name: t('nav.dashboard'), href: '/dashboard', icon: LayoutDashboard },
        { name: t('nav.post_job'), href: '/dashboard/post-job', icon: PlusCircle },
        { name: t('nav.marketplace'), href: '/dashboard/auctions', icon: Gavel },
        { name: t('nav.bookings'), href: '/dashboard/bookings', icon: Calendar },
        { name: t('nav.marketplace'), href: '/dashboard/marketplace', icon: Wrench },
      ],
    },
    {
      label: t('section.tools'),
      items: [
        { name: t('nav.notifications'), href: '/dashboard/notifications', icon: Bell },
        { name: t('nav.cost_estimator'), href: '/dashboard/cost-estimator', icon: Calculator },
        { name: t('common.contingency'), href: '/dashboard/insurance', icon: FileText },
        { name: t('common.live_tracking'), href: '/dashboard/emissions', icon: Leaf },
        { name: t('nav.payments'), href: '/dashboard/payments', icon: Wallet },
      ],
    },
    {
      label: t('section.account'),
      items: [
        { name: t('nav.profile'), href: '/dashboard/profile', icon: User },
        { name: t('nav.certificates'), href: '/dashboard/certificates', icon: ShieldCheck },
        { name: t('nav.settings'), href: '/dashboard/settings', icon: Settings },
      ],
    },
  ];

  const sections = isClientMode ? clientSections : providerSections;
  const initials = fullName
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0])
    .join('')
    .toUpperCase();

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close menu"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-900/40 lg:hidden"
        />
      )}
      <aside className={cn(
        'fixed inset-y-0 left-0 z-50 flex h-screen w-64 shrink-0 flex-col overflow-y-auto border-r border-slate-200 bg-white transition-transform duration-200 lg:static lg:z-auto lg:translate-x-0 lg:transition-none',
        open ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
      )}>
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2 cursor-pointer">
          <img src="/brand/logo.svg" alt="NHFAS Logo" className="h-10 w-auto object-contain" />
          <span className="font-extrabold text-xl text-brand-navy tracking-tight">NHFAS</span>
        </Link>
      </div>

      <div className="px-6 pb-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-brand-green/20 text-brand-green flex items-center justify-center font-bold">
            {initials || '?'}
          </div>
          <div>
            <h3 className="font-bold text-sm text-brand-navy">{fullName}</h3>
            <p className="text-xs text-slate-500 font-medium transition-all">{isClientMode ? t('nav.client_workspace') : t('nav.provider_workspace')}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 space-y-5 overflow-y-auto px-4 pb-6">
        {sections.map((section, idx) => (
          <div key={`${section.label}-${idx}`}>
            <p className="px-2 text-xs font-semibold uppercase tracking-[0.2em] text-slate-400">{section.label}</p>
            <div className="mt-2 space-y-1">
              {section.items.map((link, linkIdx) => {
                const isActive = location.pathname === link.href || (link.href !== '/dashboard' && location.pathname.startsWith(link.href));
                const Icon = link.icon;
                return (
                  <Link
                    key={`${link.href}-${linkIdx}`}
                    to={link.href}
                    className={cn(
                      "flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200",
                      isActive
                        ? "bg-brand-navy text-white shadow-sm"
                        : "text-slate-600 hover:bg-slate-100 hover:text-brand-navy"
                    )}
                  >
                    <Icon className={cn("h-5 w-5", isActive ? "text-brand-green" : "text-slate-400")} />
                    {link.name}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
      </aside>
    </>
  );
};

export default Sidebar;
