import React, { useEffect, useRef, useState } from 'react';
import { AlertCircle, MapPin } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import ProviderMap from '../components/ProviderMap';
import { supabase } from '../lib/supabase';
import { useTranslation } from '../i18n/I18nContext';

const LOCATION_PERSIST_INTERVAL_MS = 10000;

const FindMe = () => {
  const { user } = useOutletContext();
  const { t } = useTranslation();
  const [isFindMeActive, setIsFindMeActive] = useState(false);
  const [locationError, setLocationError] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const watchIdRef = useRef(null);
  const lastPersistRef = useRef(0);

  useEffect(() => {
    if (!user) return undefined;
    let isCurrent = true;
    (async () => {
      const { data } = await supabase
        .from('provider_profiles')
        .select('is_searchable, last_latitude, last_longitude')
        .eq('user_id', user.id)
        .maybeSingle();
      if (!isCurrent || !data) return;
      setIsFindMeActive(Boolean(data.is_searchable));
    })();
    return () => {
      isCurrent = false;
    };
  }, [user]);

  const stopWatching = () => {
    if (watchIdRef.current != null) {
      navigator.geolocation.clearWatch(watchIdRef.current);
      watchIdRef.current = null;
    }
  };

  useEffect(() => stopWatching, []);

  const persist = async (visible, position, { silent = false } = {}) => {
    if (!user) return false;
    if (!silent) setIsSaving(true);
    const updates = { is_searchable: visible };
    if (position) {
      updates.last_latitude = position[0];
      updates.last_longitude = position[1];
      updates.last_location_at = new Date().toISOString();
    }
    const { error } = await supabase
      .from('provider_profiles')
      .upsert({ user_id: user.id, ...updates }, { onConflict: 'user_id' });
    if (!silent) setIsSaving(false);
    if (error) {
      if (!silent) {
        setLocationError(t('find_me.error_save'));
      }
      return false;
    }
    return true;
  };

  const handleToggle = async () => {
    setLocationError('');
    const nextState = !isFindMeActive;

    if (!nextState) {
      stopWatching();
      setIsFindMeActive(false);
      await persist(false, null);
      return;
    }

    if (!navigator.geolocation) {
      setLocationError(t('find_me.error_no_geo'));
      return;
    }

    setIsFindMeActive(true);
    const ok = await persist(true, null);
    if (!ok) {
      setIsFindMeActive(false);
      return;
    }

    watchIdRef.current = navigator.geolocation.watchPosition(
      (position) => {
        const next = [position.coords.latitude, position.coords.longitude];
        if (Date.now() - lastPersistRef.current >= LOCATION_PERSIST_INTERVAL_MS) {
          persist(true, next, { silent: true });
        }
      },
      (error) => {
        if (error.code === error.PERMISSION_DENIED) {
          setLocationError(t('find_me.error_denied'));
          stopWatching();
          setIsFindMeActive(false);
          persist(false, null, { silent: true });
        } else {
          setLocationError(t('find_me.error_retry'));
        }
      },
      { enableHighAccuracy: true, maximumAge: 10000, timeout: 15000 },
    );
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-brand-green">{t('find_me.section')}</p>
          <h1 className="mt-2 text-3xl font-extrabold text-brand-navy">{t('nav.find_me')}</h1>
          <p className="mt-2 max-w-2xl text-slate-500">{t('find_me.desc')}</p>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={handleToggle}
            disabled={isSaving}
            className={`inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold transition-all shadow-sm disabled:opacity-60 ${
              isFindMeActive 
                ? 'bg-brand-green text-white shadow-md shadow-brand-green/30 ring-2 ring-brand-green ring-offset-2' 
                : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-50 hover:text-slate-900'
            }`}
          >
            <MapPin className="h-5 w-5" />
            {isSaving ? t('settings.updating') : isFindMeActive ? t('find_me.active') : t('find_me.activate')}
          </button>
        </div>
      </div>

      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-brand-navy">{t('find_me.map_heading')}</h2>
            <p className="text-sm text-slate-500 mt-1">
              {isFindMeActive 
                ? t('find_me.status_active') 
                : t('find_me.status_inactive')}
            </p>
          </div>
        </div>

        {locationError && (
          <div className="mb-4 flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800">
            <AlertCircle className="h-4 w-4 shrink-0" />
            <span>{locationError}</span>
          </div>
        )}

        <div className="h-[450px] w-full overflow-hidden rounded-xl border border-slate-200">
          <ProviderMap showFindMe={isFindMeActive} />
        </div>
      </div>
    </div>
  );
};

export default FindMe;
