import React from 'react';
import { SectionHeading } from '../components/SectionHeading';
import { Shield, Scale, FileText, AlertTriangle } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

export const Legal = () => {
  const { isHindi } = useLanguage();

  return (
    <div className="pt-28 pb-20 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full text-xs font-semibold uppercase tracking-[0.25em] border border-luxury-gold/50 bg-luxury-emerald/30 text-luxury-goldLight mb-4">
          <Scale className="w-3.5 h-3.5" />
          <span>{isHindi ? 'वैधानिक विनियामक शासन' : 'Regulatory Governance'}</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-serif font-extrabold text-theme-primary leading-tight mb-4">
          {isHindi ? 'कानूनी अस्वीकरण एवं दिशानिर्देश' : 'Disclaimers & Governance'}
        </h1>
        <p className="text-xs sm:text-sm text-theme-secondary font-light">
          {isHindi
            ? 'अंतिम अद्यतन: सितंबर 2026 • एवीएम टॉक्स बाय अवनीश के आधिकारिक मानक'
            : 'Last Updated: September 2026 • Official Standards of AVM TALKS BY AVNISH'}
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
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">
              {isHindi ? '1. गैर-प्रचारक संपादकीय अस्वीकरण' : '1. Non-Promotional Editorial Disclaimer'}
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            <p>
              {isHindi ? (
                <>
                  <strong className="text-theme-primary">AVM TALKS BY AVNISH</strong> पर प्रकाशित सामग्री (वेबसाइट लेख, यूट्यूब वीडियो मास्टरक्लास, पॉडकास्ट ऑडियो, डाउनलोड करने योग्य चेकलिस्ट और सोशल मीडिया पोस्ट) केवल शैक्षिक, शोध और विश्लेषणात्मक उद्देश्यों के लिए तैयार की जाती है।
                </>
              ) : (
                <>
                  The content published on <strong className="text-theme-primary">AVM TALKS BY AVNISH</strong> (including website articles, YouTube video masterclasses, podcast audio episodes, downloadable checklists, and social media reels) is created strictly for educational, research, and analytical purposes.
                </>
              )}
            </p>
            <p>
              {isHindi
                ? 'न तो अवनीश और न ही एवीएम टॉक्स एक पंजीकृत रियल एस्टेट ब्रोकर, वित्तीय सलाहकार या हामीदार सिंडिकेट के रूप में कार्य करते हैं। किसी भी सामग्री को किसी विशिष्ट भूखंड, टाउनशिप योजना या बिल्डर के क्रय-विक्रय के प्रस्ताव या अनुशंसा के रूप में नहीं माना जाना चाहिए।'
                : 'Neither Avnish nor AVM Talks acts as a registered real estate broker, financial adviser, or underwriting syndicate. None of the materials or discussions should be construed as an offer to sell, a solicitation of an offer to buy, or a recommendation of any specific property parcel, scheme, or developer.'}
            </p>
            <p>
              {isHindi
                ? 'हमारे विश्लेषण में वर्णित ऐतिहासिक प्रदर्शन, इंफ्रास्ट्रक्चर घोषणाएं और अनुमानित मूल्य वृद्धि विनियामक, कानूनी और व्यापक आर्थिक उतार-चढ़ाव के अधीन हैं। अचल संपत्ति के अधिग्रहण में अंतर्निहित कानूनी जोखिम होते हैं। कोई भी विलेख निष्पादित करने से पूर्व हमेशा योग्य स्वतंत्र कानूनी अधिवक्ता से परामर्श लें।'
                : 'Past performance, infrastructure announcements, and estimated appreciation timelines discussed in our media are subject to regulatory, legal, and macroeconomic fluctuations. Real estate acquisitions carry inherent legal and illiquidity risks. Always retain qualified independent legal counsel and government revenue auditors prior to executing binding deeds.'}
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
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">
              {isHindi ? '2. रेरा (RERA) एवं विनियामक परामर्श' : '2. RERA & Regulatory Advisory'}
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            <p>
              {isHindi ? (
                <>
                  रियल एस्टेट (विनियमन और विकास) अधिनियम (RERA), 2016 के अनुसार, खरीदारों को आधिकारिक राज्य रेरा पोर्टल (उदा. <span className="text-luxury-gold">rera.rajasthan.gov.in</span>) पर सभी परियोजना पंजीकरण नंबरों, स्वीकृत लेआउट योजनाओं और डेवलपर विवरणों को स्वतंत्र रूप से सत्यापित करने की सलाह दी जाती है।
                </>
              ) : (
                <>
                  In accordance with the Real Estate (Regulation and Development) Act (RERA), 2016, buyers are strongly encouraged to independently verify all project registration numbers, sanctioned layout plans, completion milestones, and promoter disclosures directly on the official state RERA portal (e.g., <span className="text-luxury-gold">rera.rajasthan.gov.in</span>).
                </>
              )}
            </p>
            <p>
              {isHindi
                ? 'एवीएम टॉक्स केस स्टडीज के रूप में उल्लिखित किसी भी तीसरे पक्ष के रियल एस्टेट विकास का समर्थन नहीं करता है। हम राजस्थान भू-राजस्व अधिनियम के तहत धारा 90-ए रूपांतरण नियमों के पूर्ण अनुपालन की वकालत करते हैं।'
                : 'AVM Talks does not represent or endorse any third-party real estate development mentioned as case studies. We advocate absolute adherence to Section 90-A conversion rules under the Rajasthan Land Revenue Act.'}
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
            <h2 className="text-xl sm:text-2xl font-serif font-bold text-theme-primary">
              {isHindi ? '3. गोपनीयता नीति एवं बौद्धिक संपदा' : '3. Privacy Policy & Intellectual Property'}
            </h2>
          </div>

          <div className="space-y-4 text-xs sm:text-sm text-theme-secondary font-light leading-relaxed">
            <p>
              {isHindi
                ? 'हम आपकी गोपनीयता का पूर्ण सम्मान करते हैं। परामर्श फॉर्म के माध्यम से सबमिट की गई व्यक्तिगत जानकारी का उपयोग केवल अवनीश के संपादकीय डेस्क से संपर्क के लिए किया जाता है। हम आपकी जानकारी कभी भी किसी बाहरी प्रमोटर या तीसरे पक्ष को नहीं बेचते।'
                : 'We respect your confidentiality. Personal information submitted through our consultation booking form is used exclusively to facilitate communication with Avnish’s editorial desk. We never sell, rent, or trade your contact records to commercial lead-generation syndicates or external developers.'}
            </p>
            <p>
              {isHindi ? (
                <>
                  इस वेबसाइट पर प्रदर्शित सभी ट्रेडमार्क, वीडियो निर्माण, ऑडियो मास्टरक्लास और शोध सामग्री <strong className="text-theme-primary">AVM TALKS BY AVNISH</strong> की बौद्धिक संपदा हैं। लिखित सहमति के बिना किसी भी अनधिकृत पुनरुत्पादन या व्यावसायिक उपयोग पर सख्त प्रतिबंध है।
                </>
              ) : (
                <>
                  All trademarks, crest designs, video productions, audio masterclasses, and written frameworks appearing on this website are the proprietary intellectual property of <strong className="text-theme-primary">AVM TALKS BY AVNISH</strong>. Unauthorized reproduction, rebroadcasting, or commercial republishing without written consent is strictly prohibited.
                </>
              )}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
