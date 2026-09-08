import React, { useState } from 'react';
import { Mail, CheckCircle2, ArrowRight, Shield } from 'lucide-react';
import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';

export const Newsletter = () => {
  const { t, isHindi } = useLanguage();
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | success | error

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !email.includes('@')) {
      setStatus('error');
      return;
    }
    // Static simulation: store in local storage
    try {
      const subs = JSON.parse(localStorage.getItem('avm_subscribers') || '[]');
      subs.push({ email, date: new Date().toISOString() });
      localStorage.setItem('avm_subscribers', JSON.stringify(subs));
    } catch (e) {
      // ignore
    }

    setStatus('success');
    setEmail('');
  };

  return (
    <section className="relative py-20 overflow-hidden">
      {/* Background Decorative Rings */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl p-8 sm:p-12 lg:p-16 leather-badge-container border-2 border-luxury-gold shadow-2xl overflow-hidden leather-stitch-outline">
          {/* 4 Corner Solid Brass Screws */}
          <div className="brass-screw absolute top-4 left-4" />
          <div className="brass-screw absolute top-4 right-4" />
          <div className="brass-screw absolute bottom-4 left-4" />
          <div className="brass-screw absolute bottom-4 right-4" />

          {/* Ambient Lighting */}
          <div className="absolute -right-20 -top-20 w-96 h-96 rounded-full bg-luxury-gold/15 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl mx-auto text-center">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-luxury-gold/50 bg-luxury-dark/60 text-luxury-goldLight mb-4 backdrop-blur-md">
              <Mail className="w-3.5 h-3.5 text-luxury-gold" />
              {t('footer.dispatchBadge', 'Executive Dispatch')}
            </span>

            <h2 className="text-2xl sm:text-4xl lg:text-5xl font-serif font-bold text-luxury-ivory tracking-tight mb-4">
              {t('footer.dispatchTitle', 'The Sunday Capital Dispatch')}
            </h2>

            <p className="text-sm sm:text-base text-luxury-ivory/80 font-light leading-relaxed mb-8 max-w-2xl mx-auto">
              {t('footer.dispatchDesc', 'Join 18,500+ HNWIs, family offices, and discerning land investors. Every Sunday morning, Avnish shares unvarnished corridor reports, title forensic case studies, and infrastructure intelligence.')}
            </p>

            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-5 rounded-2xl bg-luxury-dark/90 border border-luxury-gold flex items-center justify-center gap-3 text-luxury-ivory"
              >
                <CheckCircle2 className="w-6 h-6 text-luxury-gold flex-shrink-0" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-luxury-goldLight">
                    {isHindi ? 'इनर सर्किल में आपका स्वागत है।' : 'Welcome to the Inner Circle.'}
                  </p>
                  <p className="text-xs text-luxury-muted">
                    {isHindi ? 'आपकी सदस्यता की पुष्टि हो गई है। रविवार को विशेष रिपोर्ट प्राप्त करें।' : 'Your subscription is confirmed. Look for our executive briefing this Sunday.'}
                  </p>
                </div>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-lg mx-auto">
                <div className="relative flex-1">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (status === 'error') setStatus('idle');
                    }}
                    placeholder={t('footer.newsletterPlaceholder', 'Enter your corporate or personal email...')}
                    required
                    className="w-full px-5 py-3.5 rounded-full bg-luxury-dark/80 border border-luxury-gold/40 text-sm text-luxury-ivory placeholder-luxury-muted focus:outline-none focus:border-luxury-gold focus:ring-2 focus:ring-luxury-gold/20 shadow-inner"
                  />
                </div>
                <button
                  type="submit"
                  className="px-7 py-3.5 rounded-full bg-gold-gradient text-luxury-darker font-semibold text-xs uppercase tracking-wider shadow-luxury-gold hover:scale-[1.03] transition-all duration-300 flex items-center justify-center gap-2 flex-shrink-0"
                >
                  <span>{t('footer.btnSubscribe', 'Request Access')}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </form>
            )}

            {status === 'error' && (
              <p className="text-xs text-rose-400 mt-2">
                Please enter a valid email address.
              </p>
            )}

            <div className="mt-6 flex items-center justify-center gap-2 text-xs text-luxury-muted font-light">
              <Shield className="w-3.5 h-3.5 text-luxury-gold/70" />
              <span>Strictly zero spam. We never share your contact details. Unsubscribe anytime.</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
