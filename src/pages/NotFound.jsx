import React from 'react';
import { Link } from 'react-router-dom';
import logoImg from '../assets/logo/avm-logo.png';
import { ArrowLeft, Compass } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const NotFound = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-28 pb-20 px-4 text-center">
      <div className="max-w-md mx-auto p-8 rounded-3xl bg-theme-surface border border-theme-gold shadow-2xl">
        <img
          src={logoImg}
          alt="AVM Talks"
          className="w-20 h-20 rounded-full mx-auto mb-6 object-cover shadow-sm"
        />
        <span className="text-4xl sm:text-6xl font-serif font-extrabold text-gold-gradient block mb-2">
          404
        </span>
        <h2 className="text-xl font-serif font-bold text-theme-primary mb-3">
          {isHindi ? 'यह पृष्ठ उपलब्ध नहीं है' : 'Corridor Route Uncharted'}
        </h2>
        <p className="text-xs text-theme-muted mb-8 leading-relaxed">
          {isHindi
            ? 'अनुरोधित फाइल अथवा पृष्ठ एवीएम टॉक्स रजिस्ट्री अभिलेखागार में मौजूद नहीं है।'
            : 'The requested dossier or page does not exist within the AVM Talks registry archive.'}
        </p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-semibold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{isHindi ? 'मुख्य पृष्ठ पर लौटें' : 'Return to Headquarters'}</span>
        </Link>
      </div>
    </div>
  );
};
