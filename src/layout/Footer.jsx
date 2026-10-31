import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from '../i18n/I18nContext';

const Footer = () => {
  const { t } = useTranslation();

  return (
    <footer className="bg-slate-900 text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <img src="/brand/logo.svg" alt="NHFAS Logo" className="h-10 w-auto" />
              <span className="font-extrabold text-2xl tracking-tight text-white">NHFAS</span>
            </div>
            <p className="text-slate-400 text-sm max-w-xs">
              {t('footer.tagline')}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.company')}</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/about" className="hover:text-white transition-colors">{t('footer.about_us')}</Link></li>
              <li><Link to="/careers" className="hover:text-white transition-colors">{t('footer.careers')}</Link></li>
              <li><Link to="/blog" className="hover:text-white transition-colors">{t('footer.blog')}</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">{t('footer.contact')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.services')}</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/services/handyman" className="hover:text-white transition-colors">{t('footer.handyman')}</Link></li>
              <li><Link to="/services/artisans" className="hover:text-white transition-colors">{t('footer.artisans')}</Link></li>
              <li><Link to="/services/heavy-haulage" className="hover:text-white transition-colors">{t('footer.heavy_haulage')}</Link></li>
              <li><Link to="/services/equipment" className="hover:text-white transition-colors">{t('footer.equipment')}</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold text-lg mb-4">{t('footer.support')}</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              <li><Link to="/faq" className="hover:text-white transition-colors">{t('footer.faq')}</Link></li>
              <li><Link to="/help-center" className="hover:text-white transition-colors">{t('footer.help_center')}</Link></li>
              <li><Link to="/terms" className="hover:text-white transition-colors">{t('footer.terms')}</Link></li>
              <li><Link to="/privacy" className="hover:text-white transition-colors">{t('footer.privacy')}</Link></li>
              <li><Link to="/cookies" className="hover:text-white transition-colors">{t('footer.cookies')}</Link></li>
              <li><Link to="/trust-safety" className="hover:text-white transition-colors">{t('footer.trust_safety')}</Link></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-500 text-xs">
          <p>© {new Date().getFullYear()} NHFAS. {t('footer.rights')}</p>
          <div className="flex gap-6">
            <Link to="/terms" className="hover:text-slate-400">{t('footer.terms')}</Link>
            <Link to="/privacy" className="hover:text-slate-400">{t('footer.privacy')}</Link>
            <Link to="/cookies" className="hover:text-slate-400">{t('footer.cookies')}</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
