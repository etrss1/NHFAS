import React from 'react';
import { Search, ClipboardList, Shield, MapPin, CheckCircle } from 'lucide-react';
import { useTranslation } from '../i18n/I18nContext';

const heroImage = '/illustrations/workflow.svg';

const HowItWorks = () => {
  const { t } = useTranslation();

  const steps = [
    {
      icon: <Search className="w-6 h-6" />,
      title: t('hiw.step1_title'),
      desc: t('hiw.step1_desc'),
      color: 'text-brand-green',
      bg: 'bg-green-100'
    },
    {
      icon: <ClipboardList className="w-6 h-6" />,
      title: t('hiw.step2_title'),
      desc: t('hiw.step2_desc'),
      color: 'text-blue-500',
      bg: 'bg-blue-100'
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: t('hiw.step3_title'),
      desc: t('hiw.step3_desc'),
      color: 'text-amber-500',
      bg: 'bg-amber-100'
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: t('hiw.step4_title'),
      desc: t('hiw.step4_desc'),
      color: 'text-brand-purple',
      bg: 'bg-purple-100'
    },
    {
      icon: <CheckCircle className="w-6 h-6 text-white" />,
      title: t('hiw.step5_title'),
      desc: t('hiw.step5_desc'),
      color: 'text-white',
      bg: 'bg-brand-green',
      isFinal: true
    }
  ];

  return (
    <section id="how-it-works" className="scroll-mt-24 py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Content */}
          <div className="w-full lg:w-3/5">
            <div className="flex items-center gap-4 mb-3">
              <div className="h-0.5 w-12 bg-brand-green"></div>
              <span className="text-brand-green font-semibold text-sm uppercase tracking-wider">{t('hiw.tag')}</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-brand-navy mb-4">
              {t('hiw.title_line1')}<br />{t('hiw.title_line2')}
            </h2>
            <p className="text-slate-500 text-lg mb-12">
              {t('hiw.step1_desc')}
            </p>

            <div className="space-y-6">
              {steps.map((step, idx) => (
                <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors">
                  <div className={`flex-shrink-0 w-12 h-12 rounded-xl ${step.bg} ${step.color} flex items-center justify-center font-bold`}>
                    {step.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-brand-navy">{step.title}</h3>
                    <p className="text-slate-500 text-sm mt-1">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Illustration */}
          <div className="w-full lg:w-2/5">
            <div className="relative rounded-3xl overflow-hidden border border-slate-100 shadow-xl bg-slate-50 p-6">
              <img src={heroImage} alt="How NHFAS Works" className="w-full h-auto" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
