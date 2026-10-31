import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, BriefcaseBusiness, CalendarDays, CheckCircle2, DollarSign, MapPin, Settings2, Star, Truck, Wrench } from 'lucide-react';
import { Link, useOutletContext } from 'react-router-dom';
import { Button } from '../components/Button';
import StatCard from '../components/dashboard/StatCard';
import { supabase } from '../lib/supabase';
import { useTranslation } from '../i18n/I18nContext';

const Dashboard = () => {
  const { user, profile, isClientMode } = useOutletContext();
  const { t, lang } = useTranslation();
  const [stats, setStats] = useState({ open: null, active: 0, completed: 0, earnings: 0, rating: null, inEscrow: null });
  const [recentJobs, setRecentJobs] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loadError, setLoadError] = useState('');
  
  const today = new Intl.DateTimeFormat(lang === 'om' ? 'en' : lang, {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  }).format(new Date());

  const firstName = profile?.full_name?.trim().split(/\s+/)[0] || 'there';

  const serviceCategories = [
    {
      title: t('dashboard.cat_home_repairs'),
      description: t('dashboard.cat_home_repairs_desc'),
      href: '/dashboard/search?q=handyman',
      icon: Wrench,
      iconClass: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: t('dashboard.cat_artisans'),
      description: t('dashboard.cat_artisans_desc'),
      href: '/dashboard/search?q=artisans',
      icon: Wrench,
      iconClass: 'bg-orange-50 text-orange-700',
    },
    {
      title: t('dashboard.cat_haulage'),
      description: t('dashboard.cat_haulage_desc'),
      href: '/dashboard/search?q=haulage',
      icon: Truck,
      iconClass: 'bg-sky-50 text-sky-700',
    },
    {
      title: t('dashboard.cat_equipment'),
      description: t('dashboard.cat_equipment_desc'),
      href: '/dashboard/search?q=equipment',
      icon: Settings2,
      iconClass: 'bg-amber-50 text-amber-700',
    },
  ];

  const providerTools = [
    {
      title: t('dashboard.tool_manage_services'),
      description: t('dashboard.tool_manage_services_desc'),
      href: '/dashboard/services',
      icon: Wrench,
      iconClass: 'bg-emerald-50 text-emerald-700',
    },
    {
      title: t('dashboard.tool_location'),
      description: t('dashboard.tool_location_desc'),
      href: '/dashboard/find-me',
      icon: MapPin,
      iconClass: 'bg-sky-50 text-sky-700',
    },
    {
      title: t('nav.reviews'),
      description: t('dashboard.tool_reviews_desc'),
      href: '/dashboard/reviews',
      icon: Star,
      iconClass: 'bg-purple-50 text-purple-700',
    },
  ];

  useEffect(() => {
    let isCurrent = true;
    const loadDashboard = async () => {
      if (!user) return;
      setIsLoading(true);
      setLoadError('');

      const [{ data: jobs, error: jobsError }, { data: escrowRows, error: escrowError }, { data: ratingRows, error: ratingsError }, { data: myEscrowRows, error: myEscrowError }] = await Promise.all([
        supabase.from('jobs')
          .select('id, job_number, title, job_type, status, created_at')
          .or(`client_id.eq.${user.id},provider_id.eq.${user.id}`)
          .order('created_at', { ascending: false })
          .limit(30),
        supabase.from('escrow_accounts')
          .select('released_amount')
          .eq('payee_id', user.id)
          .eq('status', 'released'),
        supabase.from('ratings')
          .select('stars')
          .eq('ratee_id', user.id),
        supabase.from('escrow_accounts')
          .select('funded_amount, released_amount')
          .eq('payer_id', user.id)
          .in('status', ['funded', 'partially_released', 'disputed']),
      ]);

      if (!isCurrent) return;
      const jobRows = jobs || [];
      const ratings = ratingRows || [];
      const escrowList = escrowRows || [];

      setStats({
        open: jobsError ? null : jobRows.filter((job) => ['posted', 'matching', 'offered'].includes(job.status)).length,
        active: jobsError ? null : jobRows.filter((job) => ['confirmed', 'en_route', 'in_progress'].includes(job.status)).length,
        completed: jobsError ? null : jobRows.filter((job) => job.status === 'completed').length,
        earnings: escrowError ? null : escrowList.reduce((sum, row) => sum + Number(row.released_amount || 0), 0),
        rating: ratingsError ? null : ratings.length ? ratings.reduce((sum, rating) => sum + Number(rating.stars), 0) / ratings.length : null,
        inEscrow: myEscrowError
          ? null
          : (myEscrowRows || []).reduce(
              (sum, row) => sum + Math.max(0, Number(row.funded_amount || 0) - Number(row.released_amount || 0)),
              0,
            ),
      });
      setRecentJobs(jobsError ? [] : jobRows.slice(0, 4));
      const queryError = jobsError || escrowError || ratingsError || myEscrowError;
      setLoadError(queryError ? `${t('common.error')}: ${queryError.message}` : '');
      setIsLoading(false);
    };

    loadDashboard();
    return () => { isCurrent = false; };
  }, [user, t]);

  return (
    <div className="mx-auto max-w-[1600px] space-y-8">
      <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-green">
            {isClientMode ? t('nav.client_workspace') : t('nav.provider_workspace')} · {today}
          </p>
          <h1 className="mt-2 text-3xl font-extrabold text-brand-navy">
            {t('dashboard.welcome')}, {firstName}
          </h1>
          <p className="mt-2 max-w-2xl text-slate-500">
            {isClientMode
              ? t('dashboard.client_desc')
              : t('dashboard.provider_desc')}
          </p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button as={Link} to={isClientMode ? '/dashboard/post-job' : '/dashboard/bookings'} variant="primary" className="inline-flex items-center gap-2">
            {isClientMode ? t('nav.post_job') : t('jobs.view_open_jobs')}
            <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </header>

      {loadError && (
        <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-700">
          {loadError}
        </div>
      )}

      {/* Metric Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title={isClientMode ? t('dashboard.stat_open_requests') : t('dashboard.stat_open_jobs')}
          value={isLoading ? '...' : (stats.open ?? '—')}
          subtext={isClientMode ? t('dashboard.stat_waiting_matching') : t('dashboard.stat_ready_to_take')}
          icon={CalendarDays}
          trend={null}
        />
        <StatCard
          title={t('dashboard.stat_in_progress')}
          value={isLoading ? '...' : (stats.active ?? '—')}
          subtext={t('dashboard.stat_currently_active')}
          icon={Truck}
          trend={null}
        />
        <StatCard
          title={t('dashboard.stat_completed')}
          value={isLoading ? '...' : (stats.completed ?? '—')}
          subtext={t('dashboard.stat_completed_sub')}
          icon={CheckCircle2}
          trend={null}
        />
        <StatCard
          title={isClientMode ? t('dashboard.stat_in_escrow') : t('nav.earnings')}
          value={isLoading ? '...' : (isClientMode ? `${stats.inEscrow ?? 0} ETB` : `${stats.earnings ?? 0} ETB`)}
          subtext={isClientMode ? t('common.escrow') : t('dashboard.stat_earnings_sub')}
          icon={DollarSign}
          trend={null}
        />
      </div>

      {/* Action / Navigation Blocks */}
      <section aria-labelledby="quick-actions-heading" className="space-y-4">
        <h2 id="quick-actions-heading" className="text-xl font-bold text-brand-navy">
          {isClientMode ? t('dashboard.explore_services') : t('dashboard.tools_title')}
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {(isClientMode ? serviceCategories : providerTools).map((item) => {
            const Icon = item.icon;
            return (
              <Link
                key={item.title}
                to={item.href}
                className="group relative flex flex-col justify-between rounded-xl border border-slate-200 bg-white p-5 transition-all hover:border-brand-green/50 hover:shadow-md"
              >
                <div>
                  <div className={`inline-flex rounded-lg p-2.5 ${item.iconClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="mt-3 font-bold text-brand-navy group-hover:text-brand-green">{item.title}</h3>
                  <p className="mt-1 text-xs text-slate-500">{item.description}</p>
                </div>
                <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-brand-green">
                  {t('common.view')} <ArrowUpRight className="h-3.5 w-3.5" />
                </span>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Recent Jobs */}
      <section aria-labelledby="recent-jobs-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 id="recent-jobs-heading" className="text-xl font-bold text-brand-navy">{t('dashboard.recent_activity')}</h2>
          <Link to="/dashboard/bookings" className="text-xs font-semibold text-brand-green hover:underline">
            {t('dashboard.view_all_bookings')} →
          </Link>
        </div>
        {recentJobs.length === 0 ? (
          <div className="rounded-xl border border-slate-200 bg-white p-8 text-center text-sm text-slate-400">
            {t('jobs.no_jobs_posted')}
          </div>
        ) : (
          <div className="space-y-2">
            {recentJobs.map((job) => (
              <div key={job.id} className="flex items-center justify-between rounded-xl border border-slate-200 bg-white p-4">
                <div>
                  <p className="font-semibold text-brand-navy">#{job.job_number} · {job.title}</p>
                  <p className="text-xs text-slate-400">{new Date(job.created_at).toLocaleDateString()}</p>
                </div>
                <Link to={`/dashboard/jobs/${job.id}`} className="text-xs font-semibold text-brand-green hover:underline">
                  {t('jobs.open_details')} →
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default Dashboard;
