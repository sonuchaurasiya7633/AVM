import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Shield, Scale, FileText, AlertTriangle } from 'lucide-react';

export const Legal = () => {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-luxury-gold/50 bg-luxury-emerald/30 text-luxury-goldLight mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>Regulatory Governance</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary leading-tight mb-4">
          Disclaimers & Governance
        </h1>
        <p className="text-xs sm:text-sm text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light">
          Last Updated: September 2026 • Official Standards of AVM TALKS BY AVNISH
        </p>
      </div>

      <div className="space-y-12">
        {/* Section 1: Non-Promotional Editorial Disclaimer Leather Folio */}
        <div className="p-8 sm:p-10 rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-luxury-emerald/40 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
              <Shield className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary">
              1. Non-Promotional Editorial Disclaimer
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
            <p>
              The content published on <strong className="text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary">AVM TALKS BY AVNISH</strong> (including website articles, YouTube video masterclasses, podcast audio episodes, downloadable checklists, and social media reels) is created strictly for educational, research, and analytical purposes.
            </p>
            <p>
              Neither Avnish nor AVM Talks acts as a registered real estate broker, financial adviser, or underwriting syndicate. None of the materials or discussions should be construed as an offer to sell, a solicitation of an offer to buy, or a recommendation of any specific property parcel, scheme, or developer.
            </p>
            <p>
              Past performance, infrastructure announcements, and estimated appreciation timelines discussed in our media are subject to regulatory, legal, and macroeconomic fluctuations. Real estate acquisitions carry inherent legal and illiquidity risks. Always retain qualified independent legal counsel and government revenue auditors prior to executing binding deeds.
            </p>
          </div>
        </div>

        {/* Section 2: Statutory RERA Advisory Leather Folio */}
        <div className="p-8 sm:p-10 rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-luxury-emerald/40 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
              <AlertTriangle className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary">
              2. RERA & Regulatory Advisory
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
            <p>
              In accordance with the Real Estate (Regulation and Development) Act (RERA), 2016, buyers are strongly encouraged to independently verify all project registration numbers, sanctioned layout plans, completion milestones, and promoter disclosures directly on the official state RERA portal (e.g., <span className="text-luxury-gold">rera.rajasthan.gov.in</span>).
            </p>
            <p>
              AVM Talks does not represent or endorse any third-party real estate development mentioned as case studies. We advocate absolute adherence to Section 90-A conversion rules under the Rajasthan Land Revenue Act.
            </p>
          </div>
        </div>

        {/* Section 3: Privacy & Data Protection Leather Folio */}
        <div className="p-8 sm:p-10 rounded-3xl leather-badge-container border-2 border-luxury-gold shadow-2xl relative overflow-hidden leather-stitch-outline">
          {/* 4 Corner Brass Screws */}
          <div className="brass-screw absolute top-3.5 left-3.5" />
          <div className="brass-screw absolute top-3.5 right-3.5" />
          <div className="brass-screw absolute bottom-3.5 left-3.5" />
          <div className="brass-screw absolute bottom-3.5 right-3.5" />

          <div className="flex items-center gap-3 mb-6">
            <div className="w-10 h-10 rounded-xl bg-luxury-emerald/40 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
              <FileText className="w-5 h-5" />
            </div>
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-luxury-ivory dark:text-luxury-ivory light:text-lightBg-textPrimary">
              3. Privacy Policy & Intellectual Property
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-luxury-muted dark:text-luxury-muted light:text-lightBg-textSecondary font-light leading-relaxed">
            <p>
              We respect your confidentiality. Personal information submitted through our Executive Dispatch newsletter or consultation booking form is used exclusively to facilitate communication with Avnish’s editorial desk. We never sell, rent, or trade your contact records to commercial lead-generation syndicates or external developers.
            </p>
            <p>
              All trademarks, crest designs, video productions, audio masterclasses, and written frameworks appearing on this website are the proprietary intellectual property of <strong>AVM TALKS BY AVNISH</strong>. Unauthorized reproduction, rebroadcasting, or commercial republishing without written consent is strictly prohibited.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
