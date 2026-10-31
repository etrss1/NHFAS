import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useOutletContext } from 'react-router-dom';
import { Check, LogOut, Save, ShieldCheck } from 'lucide-react';
import { Button } from '../components/Button';
import { supabase } from '../lib/supabase';
import { useTranslation, normalizeLangCode } from '../i18n/I18nContext';

const SettingsPage = () => {
  const navigate = useNavigate();
  const { t, lang, setLang, languages } = useTranslation();
  const { user, profile, setProfile, profileError, isProfileLoading, isClientMode, toggleMode } = useOutletContext();
  const [formData, setFormData] = useState({
    full_name: '',
    phone: '',
    preferred_language: lang || 'en',
    low_literacy_mode: false,
  });
  const [isSaving, setIsSaving] = useState(false);
  const [feedback, setFeedback] = useState({ type: '', message: '' });
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  useEffect(() => {
    if (!profile) return;
    setFormData({
      full_name: profile.full_name || '',
      phone: profile.phone || '',
      preferred_language: normalizeLangCode(profile.preferred_language || lang || 'en'),
      low_literacy_mode: Boolean(profile.low_literacy_mode),
    });
  }, [profile, lang]);

  const handleLanguageSelect = (e) => {
    const newLang = normalizeLangCode(e.target.value);
    setFormData((prev) => ({ ...prev, preferred_language: newLang }));
    // Immediately update UI translations when user changes selection
    setLang(newLang);
  };

  const handleSaveProfile = async (event) => {
    event.preventDefault();
    setFeedback({ type: '', message: '' });

    if (!user) {
      setFeedback({ type: 'error', message: t('settings.error_sign_in') });
      return;
    }

    setIsSaving(true);
    const updates = {
      full_name: formData.full_name.trim(),
      phone: formData.phone.trim() || null,
      preferred_language: formData.preferred_language,
      low_literacy_mode: formData.low_literacy_mode,
    };

    const { data, error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id)
      .select('full_name, phone, role, preferred_language, low_literacy_mode, avatar_url')
      .single();

    setIsSaving(false);
    if (error) {
      setFeedback({ type: 'error', message: t('settings.error_save') });
      return;
    }

    setLang(formData.preferred_language);
    setProfile((currentProfile) => ({ ...currentProfile, ...data, email: user.email || '' }));
    setFeedback({ type: 'success', message: t('settings.profile_saved') });
  };

  const handleChangePassword = async (event) => {
    event.preventDefault();
    setFeedback({ type: '', message: '' });

    if (password.length < 8) {
      setFeedback({ type: 'error', message: t('settings.error_password') });
      return;
    }
    if (password !== confirmPassword) {
      setFeedback({ type: 'error', message: t('settings.error_password_match') });
      return;
    }

    setIsChangingPassword(true);
    const { error } = await supabase.auth.updateUser({ password });
    setIsChangingPassword(false);

    if (error) {
      setFeedback({ type: 'error', message: error.message || t('common.error') });
      return;
    }

    setPassword('');
    setConfirmPassword('');
    setFeedback({ type: 'success', message: t('common.save') });
  };

  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      setFeedback({ type: 'error', message: error.message || t('common.error') });
      return;
    }
    navigate('/login');
  };

  if (isProfileLoading) {
    return <div className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-8 text-sm text-slate-500" role="status">{t('common.loading')}</div>;
  }

  if (!user) {
    return (
      <div className="mx-auto max-w-4xl rounded-lg border border-slate-200 bg-white p-8 text-center">
        <h1 className="text-2xl font-bold text-brand-navy">{t('common.sign_in')}</h1>
        <p className="mt-2 text-sm text-slate-500">{t('settings.profile_desc')}</p>
        <Button as={Link} to="/login" variant="primary" className="mt-5">{t('common.sign_in')}</Button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-4xl space-y-8">
      <header>
        <p className="text-sm font-semibold uppercase tracking-[0.16em] text-brand-green">{t('section.account')}</p>
        <h1 className="mt-2 text-3xl font-extrabold text-brand-navy">{t('nav.settings')}</h1>
        <p className="mt-2 text-slate-500">{t('common.general_settings') || 'Manage your profile, dashboard, and account security.'}</p>
      </header>

      {profileError && (
        <p className="rounded-lg border border-amber-200 bg-amber-50 p-4 text-sm text-amber-900" role="status">
          {profileError}
        </p>
      )}
      {feedback.message && (
        <p className={`rounded-lg border p-4 text-sm ${feedback.type === 'error' ? 'border-red-200 bg-red-50 text-red-800' : 'border-emerald-200 bg-emerald-50 text-emerald-800'}`} role={feedback.type === 'error' ? 'alert' : 'status'}>
          {feedback.message}
        </p>
      )}

      <section aria-labelledby="profile-settings-heading" className="rounded-lg border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6">
          <h2 id="profile-settings-heading" className="text-lg font-bold text-brand-navy">{t('settings.profile_info')}</h2>
          <p className="mt-1 text-sm text-slate-500">{t('settings.profile_desc')}</p>
        </div>
        <form onSubmit={handleSaveProfile} className="space-y-5">
          <div className="grid gap-5 sm:grid-cols-2">
            <label className="block text-sm font-medium text-slate-700">
              {t('common.full_name')}
              <input
                required
                maxLength={120}
                value={formData.full_name}
                onChange={(event) => setFormData({ ...formData, full_name: event.target.value })}
                className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700">
              {t('common.phone')}
              <input
                type="tel"
                autoComplete="tel"
                value={formData.phone}
                onChange={(event) => setFormData({ ...formData, phone: event.target.value })}
                className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
              />
            </label>
            <label className="block text-sm font-medium text-slate-700 sm:col-span-2">
              {t('common.email')}
              <input
                type="email"
                value={user.email || ''}
                readOnly
                className="mt-2 block w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-500"
              />
            </label>
          </div>

          <label className="block max-w-sm text-sm font-medium text-slate-700">
            {t('settings.preferred_language')}
            <select
              value={formData.preferred_language}
              onChange={handleLanguageSelect}
              className="mt-2 block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            >
              {languages.map((l) => (
                <option key={l.code} value={l.code}>
                  {l.label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-start gap-3 border-t border-slate-100 pt-5 text-sm">
            <input
              type="checkbox"
              checked={formData.low_literacy_mode}
              onChange={(event) => setFormData({ ...formData, low_literacy_mode: event.target.checked })}
              className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-green focus:ring-brand-green"
            />
            <span>
              <span className="block font-semibold text-slate-800">{t('settings.use_simplified')}</span>
              <span className="mt-1 block text-slate-500">{t('settings.simplified_desc')}</span>
            </span>
          </label>

          <div className="flex justify-end border-t border-slate-100 pt-5">
            <Button type="submit" disabled={isSaving} className="inline-flex items-center gap-2">
              {isSaving ? (t('settings.updating') || 'Saving...') : (t('common.save') || 'Save profile')}
              {isSaving ? <Check className="h-4 w-4 opacity-60" /> : <Save className="h-4 w-4" />}
            </Button>
          </div>
        </form>
      </section>

      <section aria-labelledby="workspace-settings-heading" className="rounded-lg border border-slate-200 bg-white p-5 sm:p-7">
        <div>
          <h2 id="workspace-settings-heading" className="text-lg font-bold text-brand-navy">{t('nav.client_workspace')} / {t('nav.provider_workspace')}</h2>
          <p className="mt-1 text-sm text-slate-500">{t('settings.profile_desc')}</p>
        </div>
        <div className="mt-5 inline-flex rounded-lg border border-slate-200 bg-slate-50 p-1" role="group" aria-label="Dashboard workspace">
          <button
            type="button"
            aria-pressed={!isClientMode}
            onClick={() => isClientMode && toggleMode()}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${!isClientMode ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-white'}`}
          >
            {t('settings.provider')}
          </button>
          <button
            type="button"
            aria-pressed={isClientMode}
            onClick={() => !isClientMode && toggleMode()}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${isClientMode ? 'bg-brand-navy text-white' : 'text-slate-600 hover:bg-white'}`}
          >
            {t('settings.client')}
          </button>
        </div>
      </section>

      <section aria-labelledby="security-settings-heading" className="rounded-lg border border-slate-200 bg-white p-5 sm:p-7">
        <div className="mb-6 flex items-center gap-3">
          <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
            <ShieldCheck className="h-5 w-5" />
          </span>
          <div>
            <h2 id="security-settings-heading" className="text-lg font-bold text-brand-navy">{t('settings.account_security')}</h2>
            <p className="mt-1 text-sm text-slate-500">{t('settings.security_desc')}</p>
          </div>
        </div>
        <form onSubmit={handleChangePassword} className="grid gap-4 sm:grid-cols-2">
          <label className="block text-sm font-medium text-slate-700">
            {t('common.new_password')}
            <input
              type="password"
              minLength={8}
              autoComplete="new-password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              placeholder={t('settings.password_min_length')}
              className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
          </label>
          <label className="block text-sm font-medium text-slate-700">
            {t('common.confirm_password')}
            <input
              type="password"
              minLength={8}
              autoComplete="new-password"
              value={confirmPassword}
              onChange={(event) => setConfirmPassword(event.target.value)}
              placeholder={t('settings.reenter_password')}
              className="mt-2 block w-full rounded-lg border border-slate-300 px-3 py-2.5 text-sm focus:border-brand-green focus:outline-none focus:ring-2 focus:ring-brand-green/20"
            />
          </label>
          <div className="flex flex-wrap justify-between gap-3 border-t border-slate-100 pt-5 sm:col-span-2">
            <button type="button" onClick={handleSignOut} className="inline-flex h-10 items-center gap-2 rounded-lg px-3 text-sm font-semibold text-slate-600 transition-colors hover:bg-slate-100 hover:text-brand-navy">
              <LogOut className="h-4 w-4" />
              {t('settings.sign_out')}
            </button>
            <Button type="submit" disabled={isChangingPassword || !password || !confirmPassword} className="inline-flex items-center gap-2">
              {isChangingPassword ? t('settings.updating') : t('settings.update_password')}
              <ShieldCheck className="h-4 w-4" />
            </Button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default SettingsPage;
