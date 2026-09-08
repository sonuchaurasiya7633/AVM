import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import logoImg from '../assets/logo/avm-logo.png';
import dronePlotsHeroImg from '../assets/images/drone-plots-hero.jpg';
import { Shield, BookOpen, Compass, Award, CheckCircle2, ArrowRight, Quote, Landmark, Scale, Users } from 'lucide-react';
import { Link } from 'react-router-dom';

export const About = () => {
  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Intro */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <span>The Institutional Manifesto</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          The Voice of Unvarnished Truth in <br />
          <span className="text-gold-gradient italic">Indian Real Estate & Land Banking.</span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          Founded and anchored by Avnish, <strong className="text-theme-primary font-bold">AVM TALKS</strong> is an independent media house, real estate think-tank, and due diligence advisory created to safeguard capital from predatory marketing and unapproved developments.
        </p>
      </div>

      {/* Founder Profile & Comprehensive Story Leather Desk Blotter */}
      <div className="leather-badge-container rounded-3xl p-8 sm:p-12 lg:p-16 border-2 border-luxury-gold shadow-2xl mb-20 relative overflow-hidden leather-stitch-outline">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          <div className="lg:col-span-5 flex flex-col items-center">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden border-2 border-luxury-gold shadow-luxury-gold group">
              <img
                src={logoImg}
                alt="Avnish — Founder of AVM Talks"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="font-serif font-bold text-lg text-white">Avnish</p>
                <p className="text-xs uppercase tracking-widest text-luxury-gold">Founder & Principal Host, AVM Talks</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-luxury-gold">
              <Quote className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-theme-primary leading-snug">
              "Buying land is an act of generational faith. You must never let marketing urgency blind your legal scrutiny."
            </h3>
            
            <div className="space-y-4 text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
              <p>
                Over the past decade of North India's rapid infrastructure expansion, Avnish observed a dangerous pattern: ordinary families, corporate professionals, and HNIs were committing lifetime savings to suburban layouts based on glossy 3D renders, deceptive verbal promises of future metro connectivity, and unverified broker claims.
              </p>
              <p>
                Thousands of buyers only realized months after handing over token money that their plot sat on unconverted agricultural land without Section 90-A clearance, possessed unrecorded legal disputes, or was reserved under high-tension power grid alignments or future master-plan green belts.
              </p>
              <p>
                <strong className="text-theme-primary font-medium">AVM Talks by Avnish</strong> was founded as the ultimate shield. By bringing high-definition drone audits, revenue law specialists, and ground realities directly to the screen across 21+ video masterclasses, Avnish created an unapologetic benchmark for institutional land due diligence.
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 text-center">
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-gold-gradient">180K+</span>
                <span className="text-[10px] uppercase tracking-wider text-theme-muted">Informed Investors</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 text-center">
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-gold-gradient">52+</span>
                <span className="text-[10px] uppercase tracking-wider text-theme-muted">Field Coordinators</span>
              </div>
              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 text-center">
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-gold-gradient">₹0</span>
                <span className="text-[10px] uppercase tracking-wider text-theme-muted">Brokerage Commission</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Drone Audit Showcase */}
      <div className="rounded-3xl overflow-hidden border border-theme-gold shadow-2xl mb-20 relative group">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={dronePlotsHeroImg}
            alt="AVM Talks 4K Drone Audits of Plotted Townships"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#021710] via-[#021710]/50 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-luxury-emerald/90 text-luxury-goldLight border border-luxury-gold/40 mb-2">
                <span>✦ Forensic Aerial Drone Audits</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                Verifying Ground Reality Beyond Paper Promises
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl mt-1">
                Every township featured on AVM Talks is audited via 4K drone flyovers, inspecting road widths, boundary demarcations, transformer positions, and live JDA work progress.
              </p>
            </div>
            <Link
              to="/plots"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all self-start sm:self-auto"
            >
              <span>View Verified Plots</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* The 4 Foundational Pillars */}
      <SectionHeading
        badge="Core Credo"
        title="The Four Non-Negotiable Pillars of AVM Talks"
        subtitle="Every recommendation, plotted scheme audit, and video masterclass follows these strict institutional standards."
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div className="p-7 rounded-3xl leather-folio-card border border-luxury-gold/40 shadow-theme-card space-y-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <Scale className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-serif font-bold text-theme-primary">
            1. Title Precedes Topology
          </h4>
          <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            A scenic landscape with an unverified paper lineage is a legal liability. We demand complete 30-year continuous title chains, official Non-Encumbrance Certificates, and verified revenue Jamabandi before evaluating any parcel.
          </p>
        </div>

        <div className="p-7 rounded-3xl leather-folio-card border border-luxury-gold/40 shadow-theme-card space-y-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <Compass className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-serif font-bold text-theme-primary">
            2. Tarmac Over Teasers
          </h4>
          <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            We price in only operational bitumen under tires, delivered electrical transformers, and sanctioned master-plan sector roads. We never advise paying premiums for speculative broker brochures.
          </p>
        </div>

        <div className="p-7 rounded-3xl leather-folio-card border border-luxury-gold/40 shadow-theme-card space-y-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <Landmark className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-serif font-bold text-theme-primary">
            3. Zero Speculative Guarantees
          </h4>
          <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            Real estate builds multi-generational family security when purchased with zero leverage and held across macroeconomic cycles. We do not promote unrealistic short-term flips or speculative bubbles.
          </p>
        </div>

        <div className="p-7 rounded-3xl leather-folio-card border border-luxury-gold/40 shadow-theme-card space-y-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <Shield className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-serif font-bold text-theme-primary">
            4. Absolute Fiduciary Independence
          </h4>
          <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            We operate with zero developer underwriting and zero sales commissions. Our field inspections and masterclass investigations remain 100% accountable to our buyer community.
          </p>
        </div>
      </div>

      {/* The Covenant Leather Banner */}
      <div className="rounded-3xl p-8 sm:p-12 leather-badge-container border-2 border-luxury-gold shadow-2xl text-white text-center flex flex-col items-center relative overflow-hidden leather-stitch-outline">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        <h3 className="text-2xl sm:text-3xl font-serif font-bold mb-4">
          Have Questions About a Plotted Deal?
        </h3>
        <p className="max-w-xl text-xs sm:text-sm text-white/80 font-light mb-8">
          Reach out to our network of 52+ authorized ground coordinators or book a confidential due diligence review session directly with Avnish’s team.
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
          >
            Connect with Advisory Desk
          </Link>
          <Link
            to="/plots"
            className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider border border-luxury-gold/50 bg-black/40 text-luxury-goldLight hover:border-luxury-gold"
          >
            Browse Verified Plots
          </Link>
        </div>
      </div>
    </div>
  );
};
