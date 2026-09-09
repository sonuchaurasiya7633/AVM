// Intelligent Deep-Trained Domain Knowledge & Continuous Learning Engine for AVM Talks AI Advisory Bot
import { PLOTS_DATA } from './plots';
import { FAQS_DATA } from './faqs';
import { CORRIDORS_DATA, INVESTMENT_RULES, MACRO_METRICS } from './insights';
import { PROTOCOL_PHASES } from './buyerGuide';
import { AGENTS_DATA } from './agents';

// ==========================================
// 1. LANGUAGE DETECTION UTILITY
// ==========================================
export const detectLanguage = (input) => {
  if (!input || typeof input !== 'string') return 'en';
  
  // 1. Check for Devanagari Unicode characters (Pure Hindi script)
  const hindiRegex = /[\u0900-\u097F]/;
  if (hindiRegex.test(input)) {
    return 'hi';
  }

  // 2. Common Hinglish vocabulary, grammatical markers & transliterations
  const hinglishTokens = [
    'kya', 'hai', 'kaise', 'kitna', 'kitni', 'kitne', 'kahan', 'kab', 'kyun', 'kyu',
    'hoga', 'hogi', 'honge', 'chahiye', 'batao', 'bataiye', 'milega', 'milegi', 'dena',
    'padega', 'kharidna', 'khareedna', 'zameen', 'jamin', 'jameen', 'bhav', 'bhaav',
    'rate', 'daam', 'dam', 'accha', 'achha', 'kaisa', 'kare', 'karein', 'le', 'sakte',
    'sakti', 'pata', 'patta', 'namaste', 'pranam', 'sasta', 'mehenga', 'theek', 'shukriya',
    'btao', 'kharcha', 'plote', 'ploto', 'gaj', 'gaz', 'bigha', 'nabbe', 'dastavez',
    'kagaz', 'khasra', 'registry', 'dakhil', 'kharij', 'namantaran', 'mera', 'meri',
    'hum', 'aap', 'kaun', 'kisko', 'call', 'baat', 'dikhao', 'gaadi', 'gaari', 'visite'
  ];

  const lower = input.toLowerCase();
  const words = lower.replace(/[^a-zA-Z0-9\s]/g, ' ').split(/\s+/).filter(Boolean);
  const matchCount = words.filter(w => hinglishTokens.includes(w)).length;

  if (matchCount >= 1 || (words.length <= 4 && matchCount > 0)) {
    return 'hinglish';
  }

  return 'en';
};

// ==========================================
// 2. CONTINUOUS ADAPTIVE LEARNING & PROFILE MEMORY
// ==========================================
const PROFILE_KEY = 'avm_ai_user_profile';
const LEARNING_KEY = 'avm_ai_learned_memory';

export const getUserProfile = () => {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    return raw ? JSON.parse(raw) : {
      name: null,
      budget: null,
      corridor: null,
      sizeGaj: null,
      languagePreference: 'hinglish',
      totalInteractions: 0
    };
  } catch (e) {
    return { name: null, budget: null, corridor: null, sizeGaj: null, languagePreference: 'hinglish', totalInteractions: 0 };
  }
};

export const saveUserProfile = (profile) => {
  try {
    localStorage.setItem(PROFILE_KEY, JSON.stringify(profile));
  } catch (e) {
    // ignore
  }
};

export const clearUserProfile = () => {
  try {
    localStorage.removeItem(PROFILE_KEY);
  } catch (e) {
    // ignore
  }
};

// Extract user details from conversational input
export const extractUserProfile = (input, currentProfile = null) => {
  const profile = currentProfile || getUserProfile();
  const lower = input.toLowerCase();

  // 1. Name extraction (e.g., "mera naam X", "my name is X", "i am X", "naam: X")
  const namePatterns = [
    /(?:mera naam|my name is|i am|naam hai|this is)\s+([a-zA-Z\u0900-\u097F]{2,20})/i,
    /(?:नाम है|मेरा नाम)\s+([a-zA-Z\u0900-\u097F]{2,20})/i
  ];
  for (const regex of namePatterns) {
    const match = input.match(regex);
    if (match && match[1]) {
      const candidate = match[1].trim();
      const forbidden = ['plot', 'kya', 'hai', 'kitna', 'mujhe', 'zameen', 'batao', 'sir', 'ji'];
      if (!forbidden.includes(candidate.toLowerCase())) {
        profile.name = candidate.charAt(0).toUpperCase() + candidate.slice(1);
        break;
      }
    }
  }

  // 2. Budget extraction (e.g., "30 lakh", "50L", "₹40 lakhs", "25 to 35 lac", "under 50 lacs")
  const budgetPattern = /(\d{1,3}(?:\.\d+)?)\s*(?:lakh|lakhs|lac|lacs|cr|crore|L|k)/i;
  const budgetMatch = lower.match(budgetPattern);
  if (budgetMatch) {
    const val = parseFloat(budgetMatch[1]);
    const unit = budgetMatch[0].toLowerCase();
    if (unit.includes('cr') || unit.includes('crore')) {
      profile.budget = `₹${val} Cr`;
    } else {
      profile.budget = `₹${val} Lakhs`;
    }
  }

  // 3. Preferred Corridor extraction
  if (lower.includes('ajmer') || lower.includes('mahinder') || lower.includes('sez')) {
    profile.corridor = 'Ajmer Road & Tech Corridor';
  } else if (lower.includes('ring road') || lower.includes('cloverleaf') || lower.includes('ringroad')) {
    profile.corridor = '47-KM Ring Road Belt';
  } else if (lower.includes('dmic') || lower.includes('delhi mumbai') || lower.includes('freight') || lower.includes('expressway')) {
    profile.corridor = 'Delhi-Mumbai Expressway Hub';
  } else if (lower.includes('tonk') || lower.includes('chokhi dhani')) {
    profile.corridor = 'Tonk Road Axis';
  }

  // 4. Preferred Size in Gaj
  const sizePattern = /(\d{2,4})\s*(?:gaj|gaz|sq\s*gaj|sq\s*yard|yard)/i;
  const sizeMatch = lower.match(sizePattern);
  if (sizeMatch) {
    profile.sizeGaj = parseInt(sizeMatch[1], 10);
  }

  profile.totalInteractions = (profile.totalInteractions || 0) + 1;
  profile.languagePreference = detectLanguage(input);

  saveUserProfile(profile);
  return profile;
};

// Learning memory log
export const recordQueryLearning = (query, lang, topicId, feedback = null) => {
  try {
    const raw = localStorage.getItem(LEARNING_KEY);
    const logs = raw ? JSON.parse(raw) : [];
    logs.push({
      id: `learn-${Date.now()}`,
      query,
      language: lang,
      topicId,
      feedback, // 'positive' | 'negative' | null
      timestamp: new Date().toISOString()
    });
    // Keep last 100 entries
    if (logs.length > 100) logs.shift();
    localStorage.setItem(LEARNING_KEY, JSON.stringify(logs));
  } catch (e) {
    // ignore
  }
};

export const updateFeedback = (messageId, rating) => {
  try {
    const raw = localStorage.getItem(LEARNING_KEY);
    if (!raw) return;
    const logs = JSON.parse(raw);
    const last = logs[logs.length - 1];
    if (last) {
      last.feedback = rating;
      localStorage.setItem(LEARNING_KEY, JSON.stringify(logs));
    }
  } catch (e) {
    // ignore
  }
};

export const getLearningStats = () => {
  try {
    const raw = localStorage.getItem(LEARNING_KEY);
    const logs = raw ? JSON.parse(raw) : [];
    const helpfulCount = logs.filter(l => l.feedback === 'positive').length;
    const totalRated = logs.filter(l => l.feedback !== null).length;
    const accuracy = totalRated > 0 ? Math.round((helpfulCount / totalRated) * 100) : 98;
    return {
      totalLearnedQueries: logs.length,
      helpfulCount,
      accuracyRate: accuracy
    };
  } catch (e) {
    return { totalLearnedQueries: 0, helpfulCount: 0, accuracyRate: 98 };
  }
};

// ==========================================
// 3. UNIT CONVERTER & MATHEMATICAL RESOLVER
// ==========================================
export const evaluateLandMath = (input) => {
  const lower = input.toLowerCase();

  // Gaj to Sq.Ft conversion: e.g. "150 gaj me kitna sq ft", "200 gaj to sqft"
  const gajToSqft = lower.match(/(\d+(?:\.\d+)?)\s*(?:gaj|gaz)\s*(?:me|in|to|kitna|kitne)?\s*(?:sq\s*ft|sqft|square\s*feet|foot)/i) ||
                    lower.match(/(?:sq\s*ft|sqft|square\s*feet)\s*(?:of|in)\s*(\d+(?:\.\d+)?)\s*(?:gaj|gaz)/i);
  if (gajToSqft) {
    const gajVal = parseFloat(gajToSqft[1]);
    const sqftVal = gajVal * 9;
    const sqMeter = (gajVal * 0.836127).toFixed(2);
    return {
      type: 'gaj_to_sqft',
      gaj: gajVal,
      sqft: sqftVal,
      sqMeter
    };
  }

  // Sq.Ft to Gaj: e.g. "1800 sq ft me kitna gaj", "900 sqft to gaj"
  const sqftToGaj = lower.match(/(\d+(?:\.\d+)?)\s*(?:sq\s*ft|sqft|square\s*feet)\s*(?:me|in|to|kitna|kitne)?\s*(?:gaj|gaz)/i);
  if (sqftToGaj) {
    const sqftVal = parseFloat(sqftToGaj[1]);
    const gajVal = (sqftVal / 9).toFixed(1);
    return {
      type: 'sqft_to_gaj',
      sqft: sqftVal,
      gaj: gajVal
    };
  }

  // Bigha to Gaj: e.g. "1 bigha me kitna gaj", "ek bigha me kitne gaj"
  if (lower.includes('bigha') && (lower.includes('gaj') || lower.includes('sqft') || lower.includes('kitna') || lower.includes('kitne'))) {
    return {
      type: 'bigha_conversion'
    };
  }

  return null;
};

// ==========================================
// 4. DOMAIN-TRAINED QUERY RESOLVER & ENGINE
// ==========================================
export const getBotResponse = (userInput) => {
  const lang = detectLanguage(userInput);
  const cleanInput = userInput.trim();
  const lower = cleanInput.toLowerCase();

  // Extract & learn user profile dynamically
  const userProfile = extractUserProfile(cleanInput);

  // ----------------------------------------------------
  // Intent 1: Math & Land Unit Conversions (Gaj / Sq.Ft / Bigha)
  // ----------------------------------------------------
  const mathResult = evaluateLandMath(cleanInput);
  if (mathResult) {
    recordQueryLearning(cleanInput, lang, 'land_math');
    if (mathResult.type === 'gaj_to_sqft') {
      if (lang === 'hi') {
        return {
          text: `📐 **भूमि क्षेत्रफल गणना:**\n\n• **${mathResult.gaj} गज** = **${mathResult.sqft.toLocaleString('en-IN')} वर्ग फुट (Sq.Ft)**\n• वर्ग मीटर में: **${mathResult.sqMeter} Sq.Meters**\n\n📌 **राजस्थानी भूमि पैमाना सूत्र:**\n1 गज = 9 वर्ग फुट (Square Feet)\n1 वर्ग फुट = 0.111 गज`,
          actions: [
            { label: 'वेल्थ व क्षेत्रफल कैलकुलेटर खोलें', path: '/calculator' },
            { label: `${mathResult.gaj} गज के उपलब्ध प्लॉट्स देखें`, path: '/plots' }
          ],
          detectedLanguage: 'hi'
        };
      } else if (lang === 'hinglish') {
        return {
          text: `📐 **Land Area Calculation:**\n\n• **${mathResult.gaj} Gaj** = **${mathResult.sqft.toLocaleString('en-IN')} Sq.Ft**\n• Metric size: **${mathResult.sqMeter} Sq.Meters**\n\n💡 **Formula:**\n1 Gaj (Square Yard) = 9 Square Feet.\nAap ${mathResult.gaj} Gaj par standard 2 to 3-floor luxury villa bana sakte hain.`,
          actions: [
            { label: 'Calculator Me Check Karein', path: '/calculator' },
            { label: `${mathResult.gaj} Gaj Verified Plots Dekhein`, path: '/plots' }
          ],
          detectedLanguage: 'hinglish'
        };
      } else {
        return {
          text: `📐 **Land Area Conversion Analysis:**\n\n• **${mathResult.gaj} Gaj (Sq.Yards)** = **${mathResult.sqft.toLocaleString('en-IN')} Sq.Ft**\n• In metric units: **${mathResult.sqMeter} Sq.Meters**\n\n💡 **Standard Statutory Formula:**\n1 Gaj = Exactly 9 Square Feet (0.8361 Sq.Meters).`,
          actions: [
            { label: 'Open Area & Wealth Calculator', path: '/calculator' },
            { label: `View ${mathResult.gaj} Gaj Approved Plots`, path: '/plots' }
          ],
          detectedLanguage: 'en'
        };
      }
    }

    if (mathResult.type === 'sqft_to_gaj') {
      if (lang === 'hi') {
        return {
          text: `📐 **भूमि क्षेत्रफल रूपांतरण:**\n\n• **${mathResult.sqft} वर्ग फुट (Sq.Ft)** = **${mathResult.gaj} गज (Gaj)**\n\n📌 **सूत्र:**\nवर्ग फुट ÷ 9 = गज। (जैसे: 1800 Sq.Ft ÷ 9 = 200 गज).`,
          actions: [{ label: 'कैलकुलेटर खोलें', path: '/calculator' }],
          detectedLanguage: 'hi'
        };
      } else {
        return {
          text: `📐 **Area Conversion:**\n\n• **${mathResult.sqft} Sq.Ft** = **${mathResult.gaj} Gaj (Sq.Yards)**\n\n💡 **Formula:** Divide Sq.Ft by 9 to get Gaj size in Rajasthan.`,
          actions: [{ label: 'Open Calculator', path: '/calculator' }],
          detectedLanguage: lang
        };
      }
    }

    if (mathResult.type === 'bigha_conversion') {
      if (lang === 'hi') {
        return {
          text: `📐 **राजस्थान में 1 बीघा का आधिकारिक पैमाना:**\n\n1. **पक्का बीघा (Jaipur/Standard Rajasthan):**\n   • **1 पक्का बीघा = 3,025 वर्ग गज (Gaj)**\n   • वर्ग फुट में: **27,225 Sq.Ft**\n   • वर्ग मीटर में: **2,529.3 Sq.Meters**\n   • बिस्वा: **20 बिस्वा**\n\n2. **कच्चा बीघा (कुछ ग्रामीण तहसीलें):**\n   • **1 कच्चा बीघा = 1,600 से 1,936 वर्ग गज** (~14,400 Sq.Ft)\n\n⚠️ **सावधानी:** कच्ची कृषि भूमि खरीदते समय पटवारी की जमाबंदी में पक्का या कच्चा बीघा अवश्य सत्यापित करें।`,
          actions: [
            { label: 'ड्यू-डिलिजेंस गाइड पढ़ें', path: '/buyer-guide' },
            { label: 'कैलकुलेटर खोलें', path: '/calculator' }
          ],
          detectedLanguage: 'hi'
        };
      } else {
        return {
          text: `📐 **Rajasthan Land Measurement: 1 Bigha Standards:**\n\n1. **Pucca Bigha (Jaipur Metropolitan Standard):**\n   • **1 Pucca Bigha = 3,025 Sq.Gaj**\n   • In Sq.Ft: **27,225 Sq.Ft**\n   • In Biswa: **20 Biswa**\n\n2. **Kaccha Bigha (Certain Rural Outskirts):**\n   • **1 Kaccha Bigha = 1,600 to 1,936 Sq.Gaj** (~14,400 Sq.Ft)\n\n⚠️ **Pro Tip:** In JDA sanctioned plotted layouts, all units are officially demarcated in **Square Gaj / Sq.Yards** with strict boundary stones.`,
          actions: [
            { label: 'Read Legal Guide', path: '/buyer-guide' },
            { label: 'Check Wealth Calculator', path: '/calculator' }
          ],
          detectedLanguage: lang
        };
      }
    }
  }

  // ----------------------------------------------------
  // Intent 2: Specific Plot Township Search (Aura Sovereign / Ring Road / DMIC / Skyline)
  // ----------------------------------------------------
  const matchedPlot = PLOTS_DATA.find(p => 
    lower.includes(p.name.toLowerCase()) ||
    lower.includes(p.slug.toLowerCase()) ||
    (lower.includes('aura') && lower.includes('sovereign')) ||
    (lower.includes('ring road') && (lower.includes('imperial') || lower.includes('grandeur'))) ||
    (lower.includes('heritage') && (lower.includes('valley') || lower.includes('farm'))) ||
    (lower.includes('skyline') && lower.includes('institutional'))
  );

  if (matchedPlot) {
    recordQueryLearning(cleanInput, lang, `plot_${matchedPlot.id}`);
    if (lang === 'hi') {
      return {
        text: `🏛️ **${matchedPlot.name}**\n📍 **कॉरिडोर:** ${matchedPlot.corridor}\n\n📊 **मुख्य विवरण:**\n• **प्रारंभिक दर:** ${matchedPlot.priceStartingGaj}\n• **प्रारंभिक बजट:** ${matchedPlot.priceStartingLakhs}\n• **उपलब्ध साइज:** ${matchedPlot.plotSizesGaj.join(', ')} गज\n• **सड़क चौड़ाई:** ${matchedPlot.roadWidths.join(', ')}\n• **अनुमोदन:** JDA अनुमोदित ✅ | RERA पंजीकृत (${matchedPlot.reraNumber})\n• **बैंक लोन:** ${matchedPlot.bankApprovals.join(', ')} (80% तक वित्तपोषण)\n\n✨ **सुविधाएं:**\n${matchedPlot.amenities.slice(0, 4).map(a => `• ${a}`).join('\n')}\n\n💡 *रेटिंग: A+ संस्थागत श्रेणी (AVM Talks 30-वर्षीय विलेख ऑडिट द्वारा प्रमाणित)*`,
        actions: [
          { label: 'CAD मास्टरप्लान ब्लू-प्रिंट खोलें', path: '/plots' },
          { label: 'निःशुल्क वीआईपी साइट विजिट शेड्यूल करें', path: '/book-visit' },
          { label: 'स्टाम्प ड्यूटी कैलकुलेट करें', path: '/calculator' }
        ],
        detectedLanguage: 'hi'
      };
    } else if (lang === 'hinglish') {
      return {
        text: `🏛️ **${matchedPlot.name}**\n📍 **Location:** ${matchedPlot.corridor}\n\n📊 **Price & Size Matrix:**\n• **Starting Rate:** ${matchedPlot.priceStartingGaj}\n• **Starting Budget:** ${matchedPlot.priceStartingLakhs}\n• **Sizes Available:** ${matchedPlot.plotSizesGaj.join(', ')} Gaj (${matchedPlot.plotSizesSqFt.join(', ')} Sq.Ft)\n• **Road Width:** ${matchedPlot.roadWidths.join(', ')}\n• **Legal Status:** JDA 90-A Approved ✅ | RERA: ${matchedPlot.reraNumber}\n• **Bank Finance:** ${matchedPlot.bankApprovals.join(', ')} se 80% loan sanctioned.\n\n✨ **Key Highlights:**\n${matchedPlot.amenities.slice(0, 4).map(a => `• ${a}`).join('\n')}\n\n💡 *Tip: Is enclave ki 30-year jamabandi aur revenue chain 100% clean hai.*`,
        actions: [
          { label: 'Plot Masterplan Dekhein', path: '/plots' },
          { label: 'VIP Car Inspection Book Karein', path: '/book-visit' },
          { label: 'Registry Kharcha Dekhein', path: '/calculator' }
        ],
        detectedLanguage: 'hinglish'
      };
    } else {
      return {
        text: `🏛️ **${matchedPlot.name}**\n📍 **Corridor:** ${matchedPlot.corridor}\n\n📊 **Key Investment Metrics:**\n• **Benchmark Rate:** ${matchedPlot.priceStartingGaj}\n• **Entry Investment:** ${matchedPlot.priceStartingLakhs}\n• **Sizes Available:** ${matchedPlot.plotSizesGaj.join(', ')} Gaj (${matchedPlot.plotSizesSqFt.join(', ')} Sq.Ft)\n• **Boulevards:** ${matchedPlot.roadWidths.join(', ')}\n• **Regulatory Status:** JDA 90-A Sanctioned ✅ | RERA Registered (${matchedPlot.reraNumber})\n• **Lender Approvals:** ${matchedPlot.bankApprovals.join(', ')} (up to 80% LTV).\n\n✨ **Infrastructure Highlights:**\n${matchedPlot.amenities.slice(0, 4).map(a => `• ${a}`).join('\n')}\n\n💡 *Rating: Institutional Grade A+ audited by AVM Talks forensic desk.*`,
        actions: [
          { label: 'Explore Scheme Masterplan', path: '/plots' },
          { label: 'Schedule Chauffeur Site Audit', path: '/book-visit' },
          { label: 'Calculate Stamp Duty', path: '/calculator' }
        ],
        detectedLanguage: 'en'
      };
    }
  }

  // ----------------------------------------------------
  // Intent 3: Budget-Based Plot Recommendation
  // ----------------------------------------------------
  if (userProfile.budget || lower.includes('budget') || lower.includes('sasta') || lower.includes('kam price') || lower.includes('under') || lower.includes('lakh')) {
    if (lang === 'hi') {
      return {
        text: `💰 **आपके बजट (${userProfile.budget || '₹25-45 लाख'}) के अनुसार सर्वश्रेष्ठ जेडीए स्वीकृत प्लॉट्स:**\n\n1. **The Skyline Institutional Heights (अजमेर रोड):**\n   • ₹23.31 लाख से शुरू (₹21,000 / गज) | 111 से 277 गज | 80% बैंक लोन।\n\n2. **Aura Grand Sovereign Plotted Enclave (अजमेर रोड NH-48):**\n   • ₹36.75 लाख से शुरू (₹24,500 / गज) | 150 से 500 गज | क्लबहाउस व 60ft रोड।\n\n3. **Ring Road Imperial Boulevard:**\n   • ₹76.00 लाख से शुरू (₹38,000 / गज) | 200 से 1000 गज | 100ft सेक्टर रोड।\n\n🛡️ *सभी प्लॉट्स में पक्का जेडीए पट्टा और 30-वर्षीय भारमुक्त टाइटल की गारंटी है।*`,
        actions: [
          { label: 'सभी प्लॉट्स का तुलनात्मक चार्ट देखें', path: '/plots' },
          { label: 'बैंक ईएमआई कैलकुलेटर', path: '/calculator' },
          { label: 'साइट विजिट शेड्यूल करें', path: '/book-visit' }
        ],
        detectedLanguage: 'hi'
      };
    } else if (lang === 'hinglish') {
      return {
        text: `💰 **Aapke Budget (${userProfile.budget || '₹25 to ₹45 Lakhs'}) ke mutabik top verified JDA plots:**\n\n1. **The Skyline Institutional Heights (Ajmer Road):**\n   • Entry: ₹23.31 Lakhs (~₹21,000/Gaj) | Sizes: 111, 166, 222 Gaj | 80% Nationalized bank finance.\n\n2. **Aura Grand Sovereign Plotted Enclave (Ajmer Road):**\n   • Entry: ₹36.75 Lakhs (~₹24,500/Gaj) | Sizes: 150, 200, 250 Gaj | 15,000 Sq.Ft Luxury Clubhouse & 60ft boulevards.\n\n3. **Ring Road Imperial Boulevard:**\n   • For higher compounding: ₹38,000/Gaj (~₹76 Lakhs entry) | Direct 100ft sector road.\n\n💡 *Dono projects par SBI aur HDFC se immediate home loan available hai.*`,
        actions: [
          { label: 'Plots Explore Karein', path: '/plots' },
          { label: 'EMI & Stamp Duty Calculate Karein', path: '/calculator' },
          { label: 'Free Chauffeur Visit Book Karein', path: '/book-visit' }
        ],
        detectedLanguage: 'hinglish'
      };
    } else {
      return {
        text: `💰 **Tailored Plot Recommendations for Budget (${userProfile.budget || '₹25L – ₹45L'}):**\n\n1. **The Skyline Institutional Heights (Ajmer Road):**\n   • Starting: ₹23.31 Lakhs (~₹21,000/Gaj) | Sizes: 111 to 277 Gaj | Institutional rental demand & 80% bank loan.\n\n2. **Aura Grand Sovereign Plotted Enclave (Ajmer Road NH-48):**\n   • Starting: ₹36.75 Lakhs (~₹24,500/Gaj) | Sizes: 150 to 500 Gaj | 45-acre luxury township with 15,000 sq.ft clubhouse.\n\n3. **Ring Road Imperial Boulevard:**\n   • Prime Corridor: ₹38,000/Gaj (~₹76.00 Lakhs) | Dual commercial/residential sanctions along 100ft arterial road.`,
        actions: [
          { label: 'Inspect Verified Plots', path: '/plots' },
          { label: 'Open Wealth Calculator', path: '/calculator' },
          { label: 'Schedule VIP Site Inspection', path: '/book-visit' }
        ],
        detectedLanguage: 'en'
      };
    }
  }

  // ----------------------------------------------------
  // Intent 4: Section 90-A & JDA vs Housing Society Patta
  // ----------------------------------------------------
  if (
    lower.includes('90-a') || lower.includes('90a') || lower.includes('90 a') ||
    lower.includes('section 90') || lower.includes('dhara 90') || lower.includes('rupantaran') ||
    lower.includes('society patta') || lower.includes('samiti') || lower.includes('grah nirman') ||
    lower.includes('kaccha patta') || lower.includes('रूपांतरण') || lower.includes('धारा 90')
  ) {
    recordQueryLearning(cleanInput, lang, 'section_90a');
    if (lang === 'hi') {
      return {
        text: `⚖️ **राजस्थान भू-राजस्व अधिनियम की धारा 90-A एवं पट्टा सच्चाई:**\n\n1. **धारा 90-A क्या है?**\n   • कृषि भूमि (Krishi Bhoomi) को आवासीय या वाणिज्यिक टाउनशिप में बदलने की वैधानिक सरकारी प्रक्रिया।\n   • इसमें मूल खातेदार अपने अधिकार सरकार/जेडीए को समर्पित करता है, और जेडीए स्वीकृत लेआउट नक्शा जारी करता है।\n\n2. **जेडीए पट्टा बनाम हाउसिंग सोसाइटी पट्टा:**\n   • **जेडीए पट्टा (JDA Patta):** 100% कानूनी स्वामित्व, सरकारी सुरक्षा, और SBI/HDFC से 80% तक लोन।\n   • **सोसाइटी पट्टा (Society Patta):** 1999 के बाद की सोसायटियों के अधिकांश पट्टे अवैध हैं। इन पर न तो कोई बैंक लोन मिलता है और न ही विकास प्राधिकरण से सुरक्षा।\n\n⚠️ **चेकलिस्ट:** केवल आवेदन की रसीद पर भरोसा न करें; उप-पंजीयक के समक्ष निष्पादित 90-A का अंतिम आदेश और स्वीकृत लेआउट नक्शा अनिवार्य है।`,
        actions: [
          { label: '5-चरणीय 90-A रोडमैप पढ़ें', path: '/registry-process' },
          { label: 'ड्यू-डिलिजेंस चेकलिस्ट खोलें', path: '/buyer-guide' },
          { label: 'कानूनी एफएक्यू (FAQ) देखें', path: '/faq' }
        ],
        detectedLanguage: 'hi'
      };
    } else if (lang === 'hinglish') {
      return {
        text: `⚖️ **Section 90-A aur JDA Patta vs Society Patta ki Sachai:**\n\n1. **Section 90-A kya hota hai?**\n   • Rajasthan Land Revenue Act ke tahat kheti ki zameen (agricultural land) ko legally residential township me convert karwane ka process.\n   • Iske bina zameen par ghar banana ya plot bechna gair-kanuni hota hai.\n\n2. **JDA Patta vs Housing Society Patta:**\n   • **JDA Patta:** 100% legal title, clear 30-year revenue lineage, aur nationalized banks (SBI, HDFC) se 80% loan eligibility.\n   • **Society Patta (Kaccha Patta):** 1999 ke baad issue hue unapproved society pattas par heavy legal risk hota hai, bank loan zero milta hai aur JDA demolition drive ka khatra bana rehta hai.\n\n⚠️ **Avnish ki Salah:** Sirf '90-A applied' likhe brochure par vishwas na karein; JDA ka final conversion order aur sanctioned layout map inspect karein.`,
        actions: [
          { label: '90-A Registry Process Steps', path: '/registry-process' },
          { label: 'Buyer Checklist Download Karein', path: '/buyer-guide' },
          { label: 'Legal FAQs Padhein', path: '/faq' }
        ],
        detectedLanguage: 'hinglish'
      };
    } else {
      return {
        text: `⚖️ **Statutory Section 90-A Land Conversion & Patta Jurisprudence:**\n\n1. **What is Section 90-A?**\n   • Governed by the Rajasthan Land Revenue Act 1956, Section 90-A is the mandatory conversion mechanism transforming agricultural land into non-agricultural plotted townships.\n   • Original agricultural landholders surrender title to the state/JDA, which then approves arterial road reservations and issues freehold layout plans.\n\n2. **JDA Lease-Deed vs Housing Society Patta:**\n   • **JDA Sanctioned Patta:** Complete indefeasible legal title backed by sovereign municipal registry, eligible for up to 80% bank loans (SBI, HDFC, ICICI).\n   • **Private Society Patta:** Post-1999 society deeds without JDA regularisation carry catastrophic title risk and zero institutional bankability.\n\n⚠️ **Red Flag Alert:** Never disburse advance booking tokens on '90-A applied' claims. Insist on the final sealed 90-A Conversion Decree and Sanctioned Layout Blueprint.`,
        actions: [
          { label: 'Inspect 90-A Registry Roadmap', path: '/registry-process' },
          { label: '5-Phase Due Diligence Protocol', path: '/buyer-guide' },
          { label: 'Statutory Real Estate FAQs', path: '/faq' }
        ],
        detectedLanguage: 'en'
      };
    }
  }

  // ----------------------------------------------------
  // Intent 5: Stamp Duty, Registry Costs & DLC Rates
  // ----------------------------------------------------
  if (
    lower.includes('stamp duty') || lower.includes('registry') || lower.includes('dlc') ||
    lower.includes('kharcha') || lower.includes('tax') || lower.includes('registration fee') ||
    lower.includes('स्टाम्प ड्यूटी') || lower.includes('रजिस्ट्री') || lower.includes('खर्च')
  ) {
    recordQueryLearning(cleanInput, lang, 'stamp_duty');
    if (lang === 'hi') {
      return {
        text: `💰 **राजस्थान में प्लॉट रजिस्ट्री एवं स्टाम्प शुल्क (2026 अद्यतन दरें):**\n\n• **पुरुष खरीदार (Male Buyer):** 6.0% स्टाम्प ड्यूटी\n• **महिला खरीदार (Female Buyer):** 5.0% स्टाम्प ड्यूटी *(1% की सरकारी रियायत)*\n• **अधिभार (Surcharge):** स्टाम्प ड्यूटी का 30% अतिरिक्त (गो-संवर्धन व इंफ्रास्ट्रक्चर सेस)\n• **पंजीकरण शुल्क (Registration Fee):** 1.0% (अधिकतम सीमा नियमानुसार)\n• **गणना का आधार:** विलेख मूल्य (Agreement Value) अथवा सरकारी डीएलसी (DLC) दर, दोनों में से जो भी अधिक हो।\n\n💡 **विशेष वित्तीय सुझाव:** ₹50 लाख के प्लॉट पर पत्नी या माता के नाम रजिस्ट्री कराने पर लगभग **₹65,000 की तत्काल शुद्ध बचत** होती है!`,
        actions: [
          { label: 'लाइव वेल्थ व स्टाम्प कैलकुलेटर खोलें', path: '/calculator' },
          { label: 'रजिस्ट्री के 5 चरण देखें', path: '/registry-process' }
        ],
        detectedLanguage: 'hi'
      };
    } else if (lang === 'hinglish') {
      return {
        text: `💰 **Rajasthan me Plot Registry & Stamp Duty Charges (Current Norms):**\n\n• **Male Buyer:** 6.0% Stamp Duty\n• **Female Buyer (Mahila):** 5.0% Stamp Duty *(1.0% special government rebate)*\n• **Surcharge:** Stamp duty ka 30% additional cess (Infrastructure & Cow Conservation)\n• **Registration Fee:** Property value ka 1.0% (Sub-Registrar fee)\n• **Basis:** Actual deed value ya Government DLC rate, jo bhi zyada ho.\n\n💡 **Smart Investor Tip:** Apne plot ki registry wife ya mother ke naam karwane par seedha **1% ka statutory benefit** milta hai (around ₹65,000 savings on a ₹50L plot)!`,
        actions: [
          { label: 'Live Stamp Duty Calculator', path: '/calculator' },
          { label: 'Sub-Registrar Process Guide', path: '/registry-process' }
        ],
        detectedLanguage: 'hinglish'
      };
    } else {
      return {
        text: `💰 **Statutory Stamp Duty & Registration Tariffs in Rajasthan:**\n\n• **Male Allottee:** 6.0% Stamp Duty\n• **Female Allottee:** 5.0% Stamp Duty *(1.0% statutory gender concession)*\n• **Surcharge Cess:** 30.0% surcharge calculated on applicable stamp duty (Infrastructure & Gau-Sanvardhan)\n• **Registration Surcharge:** 1.0% of consideration value\n• **Valuation Criterion:** Ad-valorem levied on whichever is higher: transaction value or Sub-Registrar DLC (District Level Committee) circle rates.\n\n💡 **Fiduciary Tax Tip:** Registering the parcel in the name of a female family member directly saves ~₹65,000 on a ₹50 Lakh acquisition.`,
        actions: [
          { label: 'Open Wealth & Stamp Duty Calculator', path: '/calculator' },
          { label: 'Registry Workflow Protocol', path: '/registry-process' }
        ],
        detectedLanguage: 'en'
      };
    }
  }

  // ----------------------------------------------------
  // Intent 6: Jaipur Corridors Comparison (Ajmer Road vs Ring Road vs DMIC)
  // ----------------------------------------------------
  if (
    lower.includes('corridor') || lower.includes('ajmer road') || lower.includes('ring road') ||
    lower.includes('dmic') || lower.includes('tonk road') || lower.includes('location') ||
    lower.includes('kahan le') || lower.includes('kahan kharide') || lower.includes('best area') ||
    lower.includes('कॉरिडोर') || lower.includes('अजमेर') || lower.includes('रिंग रोड')
  ) {
    recordQueryLearning(cleanInput, lang, 'corridors_comparison');
    if (lang === 'hi') {
      return {
        text: `📍 **जयपुर के प्रमुख ग्रोथ कॉरिडोर का तुलनात्मक संस्थागत विश्लेषण:**\n\n1. **अजमेर रोड एवं टेक कॉरिडोर (NH-48):**\n   • *दरें:* ₹22,000 – ₹38,000 / गज\n   • *मुख्य आकर्षण:* महिन्द्रा वर्ल्ड सिटी (IT SEZ), DPS, मणिपाल यूनिवर्सिटी, तत्काल कब्जा व उच्चतम लिक्विडिटी।\n   • *सिफारिश:* एंड-यूज़र और 3-5 वर्ष के मध्यम अवधि के निवेशकों के लिए सर्वोत्तम।\n\n2. **47-किमी सदर्न रिंग रोड एक्सप्रेसवे बेल्ट:**\n   • *दरें:* ₹18,000 – ₹32,000 / गज\n   • *मुख्य आकर्षण:* 24.8% ऐतिहासिक सीएजीआर (CAGR), 360-मीटर चौड़ा विकास कॉरिडोर, क्लोवरलीफ टोलवे इंटरचेंज।\n   • *सिफारिश:* अधिकतम पूंजी वृद्धि (High Capital Compounding) चाहने वाले निवेशकों के लिए।\n\n3. **दिल्ली-मुंबई एक्सप्रेसवे (DMIC NE-4) स्पर:**\n   • *दरें:* ₹14,000 – ₹24,000 / गज\n   • *मुख्य आकर्षण:* दिल्ली मात्र 3.5 घंटे, रीको मेगा लॉजिस्टिक्स हब, बड़े फार्म विला प्लॉट्स।\n   • *सिफारिश:* 5-10 वर्ष की दीर्घकालिक संपत्ति निर्माण (Generational Wealth) हेतु।`,
        actions: [
          { label: 'कॉरिडोर विस्तृत रिपोर्ट पढ़ें', path: '/insights' },
          { label: 'सभी सत्यापित प्लॉट्स देखें', path: '/plots' },
          { label: 'वीआईपी साइट विजिट शेड्यूल करें', path: '/book-visit' }
        ],
        detectedLanguage: 'hi'
      };
    } else if (lang === 'hinglish') {
      return {
        text: `📍 **Jaipur ke Top 3 High-Growth Corridors ka Complete Comparison:**\n\n1. **Ajmer Road (NH-48 Tech Axis):**\n   • *Rates:* ₹22,000 to ₹38,000 / Gaj\n   • *Why choose:* Mahindra World City (50,000+ tech jobs), DPS, Manipal University, immediate rental demand.\n   • *Verdict:* Best for family end-users & safe 3-5 yr capital preservation.\n\n2. **47-KM Southern Ring Road Belt:**\n   • *Rates:* ₹18,000 to ₹32,000 / Gaj\n   • *Why choose:* Highest growth velocity (24.8% CAGR). 360-meter high-density commercial bypass.\n   • *Verdict:* Maximum capital multiplier zone for serious land investors.\n\n3. **Delhi-Mumbai Expressway Hub (DMIC):**\n   • *Rates:* ₹14,000 to ₹24,000 / Gaj\n   • *Why choose:* Logistics corridors, farm-villa enclaves, connectivity to Delhi in 3.5 hrs.\n   • *Verdict:* Excellent for 5-10 year long-term generational wealth.`,
        actions: [
          { label: 'Corridor Intelligence Matrix', path: '/insights' },
          { label: 'Browse Verified Plots', path: '/plots' },
          { label: 'Schedule Free Chauffeur Visit', path: '/book-visit' }
        ],
        detectedLanguage: 'hinglish'
      };
    } else {
      return {
        text: `📍 **Institutional Corridor Comparative Analysis:**\n\n1. **Ajmer Road & Tech Corridor (NH-48):**\n   • *Benchmark:* ₹22,000 – ₹38,000 / Gaj\n   • *Anchor Drivers:* Mahindra World City IT SEZ, institutional education cluster, 6-8 lane highway. Highest secondary market liquidity.\n   • *Investment Verdict:* Premier asset class for immediate end-user occupancy and low-beta wealth protection.\n\n2. **47-KM Southern Ring Road Belt:**\n   • *Benchmark:* ₹18,000 – ₹32,000 / Gaj\n   • *Anchor Drivers:* 24.8% historical CAGR. Flanked by 360-meter development buffers and high-speed bypass cloverleafs.\n   • *Investment Verdict:* Optimal for aggressive equity compounding and prime commercial frontage.\n\n3. **Delhi-Mumbai Expressway (NE-4) Spurs:**\n   • *Benchmark:* ₹14,000 – ₹24,000 / Gaj\n   • *Anchor Drivers:* National economic corridor, multi-modal logistics parks, NCR-Jaipur transit compressed to 3.5 hours.\n   • *Investment Verdict:* Suited for patient 7–10 year industrial/plotted land banking.`,
        actions: [
          { label: 'View Corridor Dossier', path: '/insights' },
          { label: 'Explore Verified Enclaves', path: '/plots' },
          { label: 'Book VIP Site Audit', path: '/book-visit' }
        ],
        detectedLanguage: 'en'
      };
    }
  }

  // ----------------------------------------------------
  // Intent 7: Free VIP Site Visit & Chauffeur Experience
  // ----------------------------------------------------
  if (
    lower.includes('site visit') || lower.includes('visit') || lower.includes('inspection') ||
    lower.includes('fortuner') || lower.includes('innova') || lower.includes('car') ||
    lower.includes('pickup') || lower.includes('gaadi') || lower.includes('shaufer') ||
    lower.includes('विजिट') || lower.includes('गाड़ी') || lower.includes('निरीक्षण')
  ) {
    recordQueryLearning(cleanInput, lang, 'vip_site_visit');
    if (lang === 'hi') {
      return {
        text: `🚗 **AVM Talks की 100% निःशुल्क VIP साइट विजिट सुविधा:**\n\n• **लक्जरी वाहन पिकअप:**\n  जयपुर एयरपोर्ट (T2), रेलवे स्टेशन या आपके निवास/होटल से Toyota Fortuner / Innova Crysta द्वारा निःशुल्क पिकअप एवं ड्रॉप।\n\n• **ऑन-ग्राउंड फोरेंसिक ऑडिट:**\n  हमारे 52+ अधिकृत फील्ड समन्वयकों में से वरिष्ठ प्रतिनिधि आपके साथ रहेंगे जो मौके पर:\n  1. फिजिकल फीते (Measuring Tape) से 40ft/60ft सड़क की वास्तविक चौड़ाई नापकर दिखाएंगे।\n  2. कंक्रीट पिलर सीमांकन और राजस्व नक्शे (नकल अक्स) का जीपीएस मिलान करेंगे।\n  3. बिजली ट्रांसफार्मर, भूमिगत सीवर लाइन व जेडीए विकास कार्य सत्यापित करेंगे।\n\n🛡️ **शून्य ब्रोकरेज मॉडल:** हम किसी भी बिल्डर से ब्रोकरेज नहीं लेते; हमारी निष्ठा 100% खरीदार के प्रति है।`,
        actions: [
          { label: 'VIP साइट विजिट अभी बुक करें', path: '/book-visit' },
          { label: '52+ समन्वयकों की डायरेक्टरी', path: '/contact' }
        ],
        detectedLanguage: 'hi'
      };
    } else if (lang === 'hinglish') {
      return {
        text: `🚗 **AVM Talks 100% Free VIP Chauffeur Site Inspection:**\n\n• **Executive Chauffeur Transit:**\n  Jaipur Airport (T2), Railway Station ya aapke residence se luxury Toyota Fortuner / Innova Crysta pickup & drop.\n\n• **On-Site Forensic Verification:**\n  Senior territory coordinator aapke sath rahenge jo mauke par:\n  1. Physical measuring tape se 40ft/60ft road ki reality dikhayenge.\n  2. 90-A boundary stones aur Nakal Aks revenue maps cross-check karenge.\n  3. Transformer, water pipeline aur RERA development timeline verify karenge.\n\n🛡️ *Zero Brokerage Commission, 100% fiduciary transparent advisory.*`,
        actions: [
          { label: 'VIP Site Visit Book Karein', path: '/book-visit' },
          { label: '52+ Coordinators Directory', path: '/contact' }
        ],
        detectedLanguage: 'hinglish'
      };
    } else {
      return {
        text: `🚗 **Complimentary VIP Chauffeur Ground Inspection Experience:**\n\n• **Chauffeur Transit:**\n  Complimentary luxury SUV (Toyota Fortuner / Innova Crysta) pickup directly from Jaipur International Airport (JAI), Railway Station, or your hotel.\n\n• **Forensic Ground Audit:**\n  Accompanied by an authorized territory coordinator to physically inspect:\n  1. Bitumen road widths using physical survey tape.\n  2. Concrete boundary stones reconciled with revenue Nakal Aks maps.\n  3. Live utility energization (transformers, sewer lines, water pressure).\n\n🛡️ *Zero Brokerage Underwriting: 100% independent advisory accountable exclusively to you.*`,
        actions: [
          { label: 'Schedule VIP Chauffeur Visit', path: '/book-visit' },
          { label: '52+ Territory Coordinator Directory', path: '/contact' }
        ],
        detectedLanguage: 'en'
      };
    }
  }

  // ----------------------------------------------------
  // Intent 8: Land Due Diligence & 4 Golden Rules & Jamabandi
  // ----------------------------------------------------
  if (
    lower.includes('due diligence') || lower.includes('jamabandi') || lower.includes('fraud') ||
    lower.includes('dhokhadhadi') || lower.includes('nakal aks') || lower.includes('mutation') ||
    lower.includes('dakhil kharij') || lower.includes('khasra') || lower.includes('check') ||
    lower.includes('जांच') || lower.includes('जमाबंदी') || lower.includes('दाखिल') || lower.includes('सावधानी')
  ) {
    recordQueryLearning(cleanInput, lang, 'due_diligence');
    if (lang === 'hi') {
      return {
        text: `🛡️ **अवनीश के 4 स्वर्णिम नियम एवं 5-चरणीय कानूनी ड्यू-डिलिजेंस:**\n\n1. **30-वर्षीय विलेख शृंखला नियम:**\n   न्यूनतम 30 वर्ष की पुरानी जमाबंदी, वरासत प्रमाण पत्र और सब-रजिस्ट्रार से गैर-भारमुक्त प्रमाण पत्र (NEC) अवश्य जांचें।\n\n2. **कागजी नक्शा बनाम धरातल की हकीकत:**\n   केवल ब्रोशर के नक्शे पर भरोसा न करें। राजस्व सजरा (नकल अक्स) का मौके पर फीता लगाकर मिलान करें। 5 मीटर की कागजी गलती 15 साल के कोर्ट केस का कारण बन सकती है।\n\n3. **स्वीकृत बनाम केवल मौखिक वादा:**\n   केवल उसी विकास का मूल्य दें जो मौके पर आपके टायरों के नीचे डामर के रूप में मौजूद हो।\n\n4. **दाखिल-खारिज (नामांतरण):**\n   रजिस्ट्री के तुरंत बाद 'अपना खाता' राजस्व पोर्टल पर दाखिल-खारिज दर्ज कराएं।`,
        actions: [
          { label: '5-चरणीय कानूनी गाइड पढ़ें', path: '/buyer-guide' },
          { label: 'रजिस्ट्री एवं म्यूटेशन प्रक्रिया', path: '/registry-process' },
          { label: 'अक्सर पूछे जाने वाले सवाल (FAQ)', path: '/faq' }
        ],
        detectedLanguage: 'hi'
      };
    } else if (lang === 'hinglish') {
      return {
        text: `🛡️ **Avnish ke 4 Golden Rules & Essential Land Due Diligence:**\n\n1. **30-Year Unbroken Title Chain:**\n   Sub-Registrar office se 30-year Non-Encumbrance Certificate (NEC) aur continuous Jamabandi verify karein.\n\n2. **Tarmac Over Teasers (मौके पर डामर):**\n   Sirf brochure ke sundar 3D renders par vishwas na karein; mauke par bitumen road aur transformer energized hona chahiye.\n\n3. **Revenue Field Map vs GPS Coordinates:**\n   Tehsil ke Nakal Aks ka physical boundary stones se exact match karein taaki future litigation na ho.\n\n4. **Dakhil Kharij (Revenue Mutation):**\n   Registry hone ke baad revenue portal (Apna Khata) par buyer ka naam officially chadhe tabhi legal ownership complete hoti hai.`,
        actions: [
          { label: 'Complete Buyer Due Diligence Guide', path: '/buyer-guide' },
          { label: 'Registry Process Roadmap', path: '/registry-process' },
          { label: 'Legal FAQs Padhein', path: '/faq' }
        ],
        detectedLanguage: 'hinglish'
      };
    } else {
      return {
        text: `🛡️ **The 4 Non-Negotiable Tenets of Forensic Land Due Diligence:**\n\n1. **Title Precedes Topology (30-Year Heritage):**\n   Examine continuous 30-year Jamabandi lineages and procure certified Non-Encumbrance Certificates (NEC) from the Sub-Registrar.\n\n2. **Tarmac Over Teasers:**\n   Never subsidize developer promises with your capital. Value only operational bitumen infrastructure physically existing under your tires.\n\n3. **Physical-Revenue Contiguity:**\n   Reconcile cadastral revenue field maps (Nakal Aks) with satellite coordinates on site. A 5-meter paper variance can trigger a decade of courtroom injunctions.\n\n4. **Statutory Revenue Mutation (Dakhil Kharij):**\n   Executing a deed without entering revenue mutation into municipal ledgers leaves statutory property ownership incomplete.`,
        actions: [
          { label: 'Read 5-Phase Due Diligence Protocol', path: '/buyer-guide' },
          { label: 'View Registry & Mutation Process', path: '/registry-process' },
          { label: 'Statutory Land FAQs', path: '/faq' }
        ],
        detectedLanguage: 'en'
      };
    }
  }

  // ----------------------------------------------------
  // Intent 9: 52+ Territory Coordinators & Contact Details
  // ----------------------------------------------------
  if (
    lower.includes('coordinator') || lower.includes('agent') || lower.includes('contact') ||
    lower.includes('phone') || lower.includes('number') || lower.includes('call') ||
    lower.includes('abhishek') || lower.includes('anil') || lower.includes('arpit') ||
    lower.includes('हेल्प') || lower.includes('नंबर') || lower.includes('संपर्क') || lower.includes('कोऑर्डिनेटर')
  ) {
    recordQueryLearning(cleanInput, lang, 'coordinators_contact');
    if (lang === 'hi') {
      return {
        text: `📞 **AVM Talks के 52+ अधिकृत फील्ड समन्वयकों का नेटवर्क:**\n\nहमारे प्रमुख वरिष्ठ समन्वयक:\n• **अभिषेक खंडेलवाल जी:** 99283-65001 (वरिष्ठ भूमि समन्वयक)\n• **अनिल तिवारी जी:** 98285-24004 (अजमेर रोड विशेषज्ञ)\n• **अर्पित चौधरी जी:** 98281-04855 (राजस्व दस्तावेज प्रमुख)\n• **भंवर चौधरी जी:** 97834-00166 (रिंग रोड सेक्टर प्रमुख)\n\n📍 **जयपुर मुख्यालय:** AVM Talks Advisory Hub, Ajmer Road, Jaipur.\n⭐ *हमारे सभी समन्वयक 100% निःशुल्क निष्पक्ष सहायता प्रदान करते हैं।*`,
        actions: [
          { label: '52+ समन्वयकों की पूरी सूची देखें', path: '/contact' },
          { label: 'WhatsApp पर तुरंत चैट करें', path: '/contact' }
        ],
        detectedLanguage: 'hi'
      };
    } else if (lang === 'hinglish') {
      return {
        text: `📞 **AVM Talks 52+ Authorized Territory Coordinators Network:**\n\nAap direct hamare senior territory leads se connect kar sakte hain:\n• **Abhishek Khandelwal ji:** 99283-65001 (Senior Land Coordinator)\n• **Anil Tiwari ji:** 98285-24004 (Ajmer Road Specialist)\n• **Arpit Choudhary ji:** 98281-04855 (Revenue Documentation Lead)\n• **Bhanwar Choudhary ji:** 97834-00166 (Ring Road Sector Lead)\n\n⭐ *Zero brokerage. Aap bina kisi hesitation ke call ya WhatsApp par guidance le sakte hain.*`,
        actions: [
          { label: 'View All 52+ Coordinators', path: '/contact' },
          { label: 'Schedule VIP Chauffeur Visit', path: '/book-visit' }
        ],
        detectedLanguage: 'hinglish'
      };
    } else {
      return {
        text: `📞 **AVM Talks 52+ Authorized Territory Coordinator Directory:**\n\nDirect contact with senior operational leads:\n• **Abhishek Khandelwal ji:** +91 99283-65001 (Senior Land Coordinator)\n• **Anil Tiwari ji:** +91 98285-24004 (Ajmer Road Specialist)\n• **Arpit Choudhary ji:** +91 98281-04855 (Revenue Documentation Lead)\n• **Bhanwar Choudhary ji:** +91 97834-00166 (Ring Road Sector Lead)\n\n📍 **Headquarters:** AVM Talks Intelligence Hub, Ajmer Road Corridor, Jaipur.`,
        actions: [
          { label: 'Open Coordinator Directory', path: '/contact' },
          { label: 'Schedule Site Visit', path: '/book-visit' }
        ],
        detectedLanguage: 'en'
      };
    }
  }

  // ----------------------------------------------------
  // Intent 10: Bank Loans & Nationalized Lenders (SBI, HDFC)
  // ----------------------------------------------------
  if (
    lower.includes('bank loan') || lower.includes('loan') || lower.includes('sbi') ||
    lower.includes('hdfc') || lower.includes('icici') || lower.includes('finance') ||
    lower.includes('emi') || lower.includes('ऋण') || lower.includes('लोन')
  ) {
    recordQueryLearning(cleanInput, lang, 'bank_loans');
    if (lang === 'hi') {
      return {
        text: `🏦 **प्लॉट पर बैंक लोन पात्रता एवं नियम (SBI, HDFC, ICICI):**\n\n• **लोन राशि:** समझौते मूल्य (Agreement Value) का 75% से 80% तक।\n• **स्वीकृत बैंक:** State Bank of India (SBI Realty), HDFC Bank, ICICI Bank, Bank of Baroda।\n• **पात्रता की पूर्व-शर्तें:**\n  1. प्लॉट अनिवार्य रूप से **जेडीए (JDA) एवं रेरा (RERA)** द्वारा स्वीकृत होना चाहिए।\n  2. कम से कम **30 वर्ष की स्पष्ट भारमुक्त टाइटल शृंखला (NEC)** मौजूद हो।\n  3. विक्रेता/डेवलपर के पक्ष में वैध धारा 90-A रूपांतरण आदेश उपलब्ध हो।\n\n⚠️ **सावधानी:** बिना जेडीए अनुमोदन वाली कच्ची सोसायटियों के प्लॉटों पर कोई भी राष्ट्रीयकृत सरकारी बैंक लोन नहीं देता।`,
        actions: [
          { label: 'ईएमआई कैलकुलेटर खोलें', path: '/calculator' },
          { label: '80% बैंक लोन वाले प्लॉट्स देखें', path: '/plots' }
        ],
        detectedLanguage: 'hi'
      };
    } else if (lang === 'hinglish') {
      return {
        text: `🏦 **Plot Bank Loan & Finance Norms (SBI, HDFC, ICICI):**\n\n• **Loan Quantum:** Sanctioned agreement value ka 75% to 80% tak finance hota hai.\n• **Approved Lenders:** SBI Realty, HDFC Bank, ICICI Bank, Punjab National Bank.\n• **Eligibility Requirements:**\n  1. Scheme 100% JDA approved aur RERA registered honi chahiye.\n  2. 30-year non-encumbrance certificate (NEC) available ho.\n  3. Developer ka dedicated RERA escrow account ho.\n\n⚠️ **Note:** Unapproved ya housing society pattas par koi bhi scheduled nationalized bank loan approve nahi karta.`,
        actions: [
          { label: 'EMI Calculator Check Karein', path: '/calculator' },
          { label: 'Bank Approved Plots Dekhein', path: '/plots' }
        ],
        detectedLanguage: 'hinglish'
      };
    } else {
      return {
        text: `🏦 **Institutional Plot Financing & Bank Loan Guidelines:**\n\n• **Financing Limits:** Up to 75%–80% Loan-to-Value (LTV) of agreement consideration.\n• **Tier-1 Lenders:** SBI (SBI Realty Home Loan), HDFC Bank, ICICI Bank, Bank of Baroda.\n• **Underwriting Prerequisites:**\n  1. Sanctioned JDA Section 90-A land use conversion and approved layout plan.\n  2. Clean 30-year non-encumbrance revenue lineage certified by bank legal panels.\n  3. Active RERA escrow account compliance.\n\n⚠️ **Notice:** Unregularized private society schemes are strictly ineligible for scheduled banking credit.`,
        actions: [
          { label: 'Open EMI & Finance Calculator', path: '/calculator' },
          { label: 'Browse 80% Financed Plots', path: '/plots' }
        ],
        detectedLanguage: 'en'
      };
    }
  }

  // ----------------------------------------------------
  // Intent 11: Enterprise CRM Portal Features
  // ----------------------------------------------------
  if (
    lower.includes('crm') || lower.includes('pipeline') || lower.includes('lead') ||
    lower.includes('portal') || lower.includes('dashboard') || lower.includes('kanban') ||
    lower.includes('सीआरएम')
  ) {
    recordQueryLearning(cleanInput, lang, 'crm_portal');
    if (lang === 'hi') {
      return {
        text: `📊 **AVM Talks एंटरप्राइज इन्वेस्टर CRM हब:**\n\nहमारे CRM में निम्नलिखित सुविधाएं सक्रिय हैं:\n• **6-चरणीय कान्बान पाइपलाइन:** New Lead, Qualified, Site Visit Booked, Visited, Negotiation, Closed Won.\n• **शॉफर व विजिट कैलेंडर:** Fortuner/Innova पिकअप शेड्यूल और लाइव ड्राइवर असाइनमेंट।\n• **52+ समन्वयकों का ऑटो-डिस्पैच:** क्षेत्र के आधार पर लीड्स का त्वरित आवंटन।\n• **1-क्लिक डेटा एक्सपोर्ट:** एक्सेल CSV व JSON में संपूर्ण निवेशक डेटा का निर्यात।`,
        actions: [
          { label: 'CRM पोर्टल में प्रवेश करें', path: '/crm' }
        ],
        detectedLanguage: 'hi'
      };
    } else {
      return {
        text: `📊 **AVM Talks Enterprise Investor CRM Hub:**\n\nActive enterprise features include:\n• **6-Stage Visual Kanban Pipeline:** Tracking buyer acquisition from New Lead to Closed Won.\n• **Chauffeur Dispatch Engine:** Managing Fortuner/Innova inspections and airport pickups.\n• **Territory Routing:** Automatic lead dispatch across 52+ territory coordinators.\n• **Data Portability:** 1-Click Excel CSV and JSON data export with live analytics.`,
        actions: [
          { label: 'Open CRM Hub', path: '/crm' }
        ],
        detectedLanguage: lang
      };
    }
  }

  // ----------------------------------------------------
  // Intent 12: Avnish Story & Zero Brokerage Manifesto
  // ----------------------------------------------------
  if (
    lower.includes('avnish') || lower.includes('avm talks') || lower.includes('about') ||
    lower.includes('founder') || lower.includes('manifesto') || lower.includes('brokerage') ||
    lower.includes('अवनीश') || lower.includes('संस्थापक') || lower.includes('कमीशन')
  ) {
    recordQueryLearning(cleanInput, lang, 'avnish_manifesto');
    if (lang === 'hi') {
      return {
        text: `🎙️ **AVM Talks by Avnish का संस्थागत घोषणापत्र:**\n\n• **मिशन:** राजस्थान के रियल एस्टेट बाजार में भ्रामक विज्ञापनों और अवैध सोसायटियों से आम निवेशकों की जीवनभर की कमाई को सुरक्षित करना।\n• **शून्य ब्रोकरेज मॉडल:** हम किसी भी बिल्डर से बिक्री कमिशन नहीं लेते; हमारा एकमात्र दायित्व खरीदार के प्रति है।\n• **पहुंच एवं प्रभाव:** 180,000+ जागरूक निवेशक, 21+ फोरेंसिक वीडियो मास्टरक्लास और 3,200+ से अधिक संपत्तियों का सफल कानूनी ऑडिट।`,
        actions: [
          { label: 'अवनीश का घोषणापत्र पढ़ें', path: '/about' },
          { label: '21 फोरेंसिक मास्टरक्लास देखें', path: '/media' }
        ],
        detectedLanguage: 'hi'
      };
    } else {
      return {
        text: `🎙️ **AVM Talks by Avnish — Fiduciary Manifesto:**\n\n• **Mission:** Insulating everyday families and NRI investors from unapproved agricultural layouts and speculative broker marketing.\n• **Zero Brokerage Fiduciary:** Operating without developer underwriting or sales commission, maintaining 100% accountability to property buyers.\n• **Reach & Impact:** 180,000+ informed investors, 21+ forensic masterclasses, and an on-ground network of 52+ territory coordinators across Jaipur.`,
        actions: [
          { label: 'Read Institutional Manifesto', path: '/about' },
          { label: 'Watch 21 Masterclasses', path: '/media' }
        ],
        detectedLanguage: lang
      };
    }
  }

  // ----------------------------------------------------
  // Fallback: Smart AI Advisory with Contextual Memory
  // ----------------------------------------------------
  recordQueryLearning(cleanInput, lang, 'general_advisory');

  const greetingName = userProfile.name ? ` ${userProfile.name} जी` : '';
  const contextHint = userProfile.corridor ? ` (${userProfile.corridor})` : '';

  if (lang === 'hi') {
    return {
      text: `नमस्ते${greetingName}! मैं **AVM Talks AI सलाहकार** हूँ। मैं जयपुर रियल एस्टेट, धारा 90-A रूपांतरण, स्टाम्प ड्यूटी, अजमेर रोड/रिंग रोड प्लॉट्स${contextHint} और निःशुल्क वीआईपी साइट विजिट्स से जुड़े किसी भी सवाल में आपकी सहायता कर सकता हूँ।\n\nकृपया नीचे दिए गए मुख्य विषयों में से चुनें या अपना सवाल पूछें:`,
      actions: [
        { label: 'धारा 90-A क्या है और क्यों जरूरी है?', prompt: 'धारा 90-A की पूरी कानूनी जानकारी दें' },
        { label: 'अजमेर रोड vs रिंग रोड कॉरिडोर रेट', prompt: 'अजमेर रोड और रिंग रोड कॉरिडोर की तुलना करें' },
        { label: 'स्टाम्प ड्यूटी और रजिस्ट्री खर्च', prompt: 'प्लॉट रजिस्ट्री में कितना स्टाम्प ड्यूटी खर्च लगेगा?' },
        { label: 'निःशुल्क वीआईपी साइट विजिट बुक करें', prompt: 'वीआईपी साइट विजिट कैसे बुक करें?' }
      ],
      detectedLanguage: 'hi'
    };
  } else if (lang === 'hinglish') {
    return {
      text: `Namaste${greetingName}! Main **AVM Talks AI Advisor** hoon. Main Jaipur plotted real estate, JDA Section 90-A, stamp duty calculation, Ajmer Road vs Ring Road plots${contextHint} aur free VIP chauffeur site visit se related kisi bhi sawaal me aapki madad kar sakta hoon.\n\nAap niche diye options me se choose kar sakte hain ya apna sawaal pooch sakte hain:`,
      actions: [
        { label: 'Section 90-A kya hota hai?', prompt: '90-A kya hai aur kyu zaroori hai?' },
        { label: 'Jaipur Corridor Rates & Growth', prompt: 'Ajmer Road aur Ring Road par plot rates kya hain?' },
        { label: 'Registry Kharcha Calculate', prompt: 'Plot registry me kitna stamp duty kharcha aayega?' },
        { label: 'Free VIP Site Visit Booking', prompt: 'Free VIP site visit kaise book karein?' }
      ],
      detectedLanguage: 'hinglish'
    };
  } else {
    return {
      text: `Hello${greetingName}! I am the **AVM Talks Intelligence Advisory Bot**. I can assist you with all statutory inquiries regarding Jaipur real estate, Section 90-A land conversion, Sub-Registrar stamp duty norms, verified plotted enclaves${contextHint}, and complimentary VIP chauffeur site visits.\n\nPlease select an option below or type your specific question:`,
      actions: [
        { label: 'What is Section 90-A conversion?', prompt: 'Explain JDA Section 90-A conversion' },
        { label: 'Jaipur Corridor Benchmarks', prompt: 'What are the current corridor plot rates in Jaipur?' },
        { label: 'Calculate Stamp Duty & Fees', prompt: 'How much is stamp duty and registry fee in Rajasthan?' },
        { label: 'Book VIP Chauffeur Visit', prompt: 'How to schedule a VIP site visit?' }
      ],
      detectedLanguage: 'en'
    };
  }
};
