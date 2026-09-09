import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import logoImg from '../assets/logo/avm-logo.png';
const CLOUDINARY_DRONE_IMAGE = "https://res.cloudinary.com/dqpbo1uho/image/upload/v1788952291/yzmkuehvawne25oas0lr.png";
import { Shield, BookOpen, Compass, Award, CheckCircle2, ArrowRight, Quote, Landmark, Scale, Users } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

export const About = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      {/* Hero Intro */}
      <div className="text-center max-w-4xl mx-auto mb-16 sm:mb-20">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-theme-gold bg-luxury-emerald/20 text-luxury-goldLight mb-4">
          <span>{isHindi ? 'संस्थागत घोषणापत्र' : 'The Institutional Manifesto'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-extrabold text-theme-primary leading-tight mb-6">
          {isHindi ? 'भारतीय रियल एस्टेट व लैंड बैंकिंग में' : 'The Voice of Unvarnished Truth in'} <br />
          <span className="text-gold-gradient italic">
            {isHindi ? 'सच्चाई और निष्पक्षता की आवाज।' : 'Indian Real Estate & Land Banking.'}
          </span>
        </h1>
        <p className="text-base sm:text-lg text-theme-secondary font-light leading-relaxed">
          {isHindi ? (
            <>
              अवनिष द्वारा स्थापित और संचालित, <strong className="text-theme-primary font-bold">AVM TALKS</strong> एक स्वतंत्र रियल एस्टेट मीडिया हाउस, थिंक-टैंक और ड्यू डिलिजेंस एडवाइजरी है, जो निवेशकों की गाढ़ी कमाई को भ्रामक प्रचार और गैर-अनुमोदित विकास से सुरक्षित रखने के लिए प्रतिबद्ध है।
            </>
          ) : (
            <>
              Founded and anchored by Avnish, <strong className="text-theme-primary font-bold">AVM TALKS</strong> is an independent media house, real estate think-tank, and due diligence advisory created to safeguard capital from predatory marketing and unapproved developments.
            </>
          )}
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
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-3xl overflow-hidden shadow-2xl group">
              <img
                src={logoImg}
                alt="Avnish — Founder of AVM Talks"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 text-center">
                <p className="font-serif font-bold text-lg text-white">Avnish</p>
                <p className="text-xs uppercase tracking-widest text-luxury-gold">
                  {isHindi ? 'संस्थापक एवं मुख्य प्रस्तोता, AVM Talks' : 'Founder & Principal Host, AVM Talks'}
                </p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="flex items-center gap-2 text-luxury-gold">
              <Quote className="w-8 h-8" />
            </div>
            <h3 className="text-2xl sm:text-3xl font-serif font-bold text-theme-primary leading-snug">
              {isHindi
                ? '"जमीन खरीदना पीढ़ियों के विश्वास का निर्णय है। मार्केटिंग के झूठे वादों को अपनी कानूनी जांच पर कभी हावी न होने दें।"'
                : '"Buying land is an act of generational faith. You must never let marketing urgency blind your legal scrutiny."'}
            </h3>
            
            <div className="space-y-4 text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
              <p>
                {isHindi
                  ? 'उत्तर भारत के तीव्र बुनियादी ढांचे के विस्तार के पिछले दशक में, अवनिष ने एक खतरनाक प्रवृत्ति देखी: सामान्य परिवार और निवेशक चमकदार 3D ब्रोशर, भविष्य के मेट्रो कनेक्टिविटी के मौखिक वादों और अपुष्ट दावों के आधार पर अपनी जीवन भर की जमा पूंजी लगा रहे थे।'
                  : "Over the past decade of North India's rapid infrastructure expansion, Avnish observed a dangerous pattern: ordinary families, corporate professionals, and HNIs were committing lifetime savings to suburban layouts based on glossy 3D renders, deceptive verbal promises of future metro connectivity, and unverified broker claims."}
              </p>
              <p>
                {isHindi
                  ? 'टोकन राशि देने के महीनों बाद खरीदारों को पता चलता था कि उनका प्लॉट बिना धारा 90-A रूपांतरण वाली कृषि भूमि पर है, उस पर पुराने कानूनी विवाद हैं, या वह हाई-टेंशन बिजली लाइन या ग्रीन बेल्ट के अधीन है।'
                  : 'Thousands of buyers only realized months after handing over token money that their plot sat on unconverted agricultural land without Section 90-A clearance, possessed unrecorded legal disputes, or was reserved under high-tension power grid alignments or future master-plan green belts.'}
              </p>
              <p>
                {isHindi ? (
                  <>
                    <strong className="text-theme-primary font-medium">AVM Talks by Avnish</strong> इसी सुरक्षा के संकल्प से स्थापित हुआ। 4K ड्रोन ऑडिट, राजस्व कानून विशेषज्ञों की राय और 21+ मास्टरक्लासेस के जरिए अवनिष ने प्लॉटेड रियल एस्टेट में निष्पक्ष कानूनी जांच का एक नया पैमाना स्थापित किया।
                  </>
                ) : (
                  <>
                    <strong className="text-theme-primary font-medium">AVM Talks by Avnish</strong> was founded as the ultimate shield. By bringing high-definition drone audits, revenue law specialists, and ground realities directly to the screen across 21+ video masterclasses, Avnish created an unapologetic benchmark for institutional land due diligence.
                  </>
                )}
              </p>
            </div>

            {/* Impact Metrics */}
            <div className="pt-4 grid grid-cols-3 gap-3">
              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 text-center">
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-gold-gradient">180K+</span>
                <span className="text-[10px] uppercase tracking-wider text-theme-muted">
                  {isHindi ? 'जागरूक निवेशक' : 'Informed Investors'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 text-center">
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-gold-gradient">52+</span>
                <span className="text-[10px] uppercase tracking-wider text-theme-muted">
                  {isHindi ? 'फील्ड कोऑर्डिनेटर्स' : 'Field Coordinators'}
                </span>
              </div>
              <div className="p-3.5 rounded-2xl bg-theme-card border border-theme-gold/30 text-center">
                <span className="block text-xl sm:text-2xl font-serif font-extrabold text-gold-gradient">₹0</span>
                <span className="text-[10px] uppercase tracking-wider text-theme-muted">
                  {isHindi ? 'ब्रोकरेज कमीशन' : 'Brokerage Commission'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Visual Drone Audit Showcase */}
      <div className="rounded-3xl overflow-hidden border border-theme-gold shadow-2xl mb-20 relative group">
        <div className="relative h-72 sm:h-96 w-full overflow-hidden">
          <img
            src={CLOUDINARY_DRONE_IMAGE}
            alt="AVM Talks 4K Drone Audits of Plotted Townships"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#030712] via-[#030712]/60 to-transparent" />
          <div className="absolute bottom-6 left-6 right-6 flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider bg-luxury-emerald/90 text-luxury-goldLight border border-luxury-gold/40 mb-2">
                <span>✦ {isHindi ? 'फोरेंसिक एरियल ड्रोन ऑडिट' : 'Forensic Aerial Drone Audits'}</span>
              </div>
              <h3 className="text-xl sm:text-2xl font-serif font-bold text-white">
                {isHindi ? 'कागजी दावों से परे जमीनी हकीकत की जांच' : 'Verifying Ground Reality Beyond Paper Promises'}
              </h3>
              <p className="text-xs sm:text-sm text-white/80 max-w-xl mt-1">
                {isHindi
                  ? 'AVM Talks पर प्रदर्शित प्रत्येक टाउनशिप का 4K ड्रोन वीडियो द्वारा ऑडिट किया जाता है, जिसमें सड़क की वास्तविक चौड़ाई, सीमांकन, बिजली ट्रांसफार्मर और जेडीए विकास कार्य की लाइव स्थिति जांची जाती है।'
                  : 'Every township featured on AVM Talks is audited via 4K drone flyovers, inspecting road widths, boundary demarcations, transformer positions, and live JDA work progress.'}
              </p>
            </div>
            <Link
              to="/plots"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all self-start sm:self-auto"
            >
              <span>{isHindi ? 'सत्यापित प्लॉट्स देखें' : 'View Verified Plots'}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>

      {/* The 4 Foundational Pillars */}
      <SectionHeading
        badge={isHindi ? 'मूल सिद्धांत' : 'Core Credo'}
        title={isHindi ? 'AVM Talks के चार अटल सिद्धांत' : 'The Four Non-Negotiable Pillars of AVM Talks'}
        subtitle={
          isHindi
            ? 'हमारा प्रत्येक विश्लेषण, प्लॉटेड स्कीम ऑडिट और वीडियो मास्टरक्लास इन कड़े संस्थागत मानकों का पालन करता है।'
            : 'Every recommendation, plotted scheme audit, and video masterclass follows these strict institutional standards.'
        }
      />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
        <div className="p-7 rounded-3xl leather-folio-card border border-luxury-gold/40 shadow-theme-card space-y-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <Scale className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-serif font-bold text-theme-primary">
            {isHindi ? '1. लोकेशन से पहले कानूनी टाइटल' : '1. Title Precedes Topology'}
          </h4>
          <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            {isHindi
              ? 'बिना स्पष्ट 30-वर्षीय मालिकाना हक वाली सुंदर जमीन केवल कानूनी सिरदर्द है। हम किसी भी प्लॉट के मूल्यांकन से पहले 30 साल की जमाबंदी और भारमुक्त प्रमाण पत्र अनिवार्य रूप से जांचते हैं।'
              : 'A scenic landscape with an unverified paper lineage is a legal liability. We demand complete 30-year continuous title chains, official Non-Encumbrance Certificates, and verified revenue Jamabandi before evaluating any parcel.'}
          </p>
        </div>

        <div className="p-7 rounded-3xl leather-folio-card border border-luxury-gold/40 shadow-theme-card space-y-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <Compass className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-serif font-bold text-theme-primary">
            {isHindi ? '2. ब्रोशर नहीं, मौके पर डामर' : '2. Tarmac Over Teasers'}
          </h4>
          <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            {isHindi
              ? 'हम केवल मौके पर मौजूद डामर की पक्की सड़कों, बिजली के ट्रांसफार्मरों और स्वीकृत मास्टर प्लान सेक्टर रोड्स को महत्व देते हैं। हम कभी भी काल्पनिक वादों पर प्रीमियम देने की सलाह नहीं देते।'
              : 'We price in only operational bitumen under tires, delivered electrical transformers, and sanctioned master-plan sector roads. We never advise paying premiums for speculative broker brochures.'}
          </p>
        </div>

        <div className="p-7 rounded-3xl leather-folio-card border border-luxury-gold/40 shadow-theme-card space-y-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <Landmark className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-serif font-bold text-theme-primary">
            {isHindi ? '3. कोई काल्पनिक गारंटी नहीं' : '3. Zero Speculative Guarantees'}
          </h4>
          <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            {isHindi
              ? 'जमीन पीढ़ियों की वित्तीय सुरक्षा तभी बनाती है जब वह पूरी कानूनी जांच के साथ खरीदी जाए। हम किसी भी प्रकार के शॉर्ट-टर्म सट्टेबाजी या अवास्तविक वादों को बढ़ावा नहीं देते।'
              : 'Real estate builds multi-generational family security when purchased with zero leverage and held across macroeconomic cycles. We do not promote unrealistic short-term flips or speculative bubbles.'}
          </p>
        </div>

        <div className="p-7 rounded-3xl leather-folio-card border border-luxury-gold/40 shadow-theme-card space-y-4 relative">
          <div className="w-12 h-12 rounded-2xl bg-luxury-emerald/20 border border-luxury-gold/40 flex items-center justify-center text-luxury-gold">
            <Shield className="w-6 h-6" />
          </div>
          <h4 className="text-lg font-serif font-bold text-theme-primary">
            {isHindi ? '4. पूर्ण निष्पक्षता व स्वतंत्रता' : '4. Absolute Fiduciary Independence'}
          </h4>
          <p className="text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            {isHindi
              ? 'हम बिना किसी बिल्डर दबाव या बिक्री कमीशन के स्वतंत्र रूप से काम करते हैं। हमारे जमीनी निरीक्षण और मास्टरक्लास विश्लेषण 100% हमारे खरीदार समुदाय के प्रति जवाबदेह हैं।'
              : 'We operate with zero developer underwriting and zero sales commissions. Our field inspections and masterclass investigations remain 100% accountable to our buyer community.'}
          </p>
        </div>
      </div>

      {/* The Covenant Leather Banner */}
      <div className="rounded-3xl p-8 sm:p-12 leather-badge-container border-2 border-luxury-gold shadow-2xl text-theme-primary text-center flex flex-col items-center relative overflow-hidden leather-stitch-outline">
        {/* 4 Corner Brass Screws */}
        <div className="brass-screw absolute top-3.5 left-3.5" />
        <div className="brass-screw absolute top-3.5 right-3.5" />
        <div className="brass-screw absolute bottom-3.5 left-3.5" />
        <div className="brass-screw absolute bottom-3.5 right-3.5" />

        <h3 className="text-2xl sm:text-3xl font-serif font-bold text-theme-primary mb-4">
          {isHindi ? 'क्या आप किसी प्लॉटेड स्कीम की जांच कराना चाहते हैं?' : 'Have Questions About a Plotted Deal?'}
        </h3>
        <p className="max-w-xl text-xs sm:text-sm text-theme-secondary font-light mb-8">
          {isHindi
            ? 'हमारे 52+ अधिकृत फील्ड सलाहकारों से संपर्क करें या अवनिष की टीम के साथ गोपनीय टाइटल समीक्षा सत्र बुक करें।'
            : 'Reach out to our network of 52+ authorized ground coordinators or book a confidential due diligence review session directly with Avnish’s team.'}
        </p>
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/contact"
            className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-gold-gradient text-luxury-darker shadow-luxury-gold hover:scale-105 transition-all"
          >
            {isHindi ? 'सलाहकार डेस्क से जुड़ें' : 'Connect with Advisory Desk'}
          </Link>
          <Link
            to="/plots"
            className="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider border border-luxury-gold/50 bg-theme-surface text-theme-primary hover:border-luxury-gold"
          >
            {isHindi ? 'सत्यापित प्लॉट्स देखें' : 'Browse Verified Plots'}
          </Link>
        </div>
      </div>
    </div>
  );
};
