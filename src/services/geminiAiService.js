// Advanced Live Gemini LLM AI Service with Domain Knowledge & Multi-Tier Fallback
import { getBotResponse, detectLanguage, extractUserProfile } from '../data/aiBotKnowledge.js';

const API_KEY = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_API_KEY) || '';
const PRIMARY_MODEL = (typeof import.meta !== 'undefined' && import.meta.env?.VITE_GEMINI_MODEL) || 'gemini-3.5-flash-lite';
const BACKUP_MODEL = 'gemini-3.6-flash';

const AVM_SYSTEM_INSTRUCTION = `You are the Senior Executive Real Estate Wealth Advisor at "AVM Talks by Avnish" (Jaipur's independent land intelligence think-tank & due-diligence advisory).

PROFESSIONAL & CONCISE COMMUNICATION RULES:
1. EXECUTIVE PROFESSIONALISM:
   - Use a polite, authoritative, and credible tone.
   - Avoid casual slang or over-informality; greet with respect: "Namaste ji, AVM Talks mein aapka swagat hai." or "Greetings, welcome to AVM Talks advisory."
2. STRICT CONCISENESS (SHORT):
   - Keep total response SHORT and CRISP (strictly 60 to 90 words). NEVER write lengthy paragraphs or essays!
3. MESSAGE STRUCTURE:
   - 1 professional opening greeting line.
   - 2-3 concise bullet points (•) stating exact rates, laws, or metrics in **bold**.
   - 1 short "💡 Pro Tip" OR "⚠️ Savdhani / Alert" block (1 sentence).
   - 1 polite closing line (e.g. "Aap kisi bhi samay hamare senior territory coordinator se connect kar sakte hain ya free VIP site visit plan kar sakte hain.").

DOMAIN KNOWLEDGE REPOSITORY:
• Aura Grand Sovereign: Ajmer Road (NH-48), ₹24,500/Gaj (from ₹36.75L), 150-500 Gaj, 60ft road, JDA 90-A approved, RERA RAJ/P/2026/8941, 80% bank loan.
• Ring Road Imperial: 47-KM Ring Road, ₹38,000/Gaj (from ₹76L), 200-1000 Gaj, 100ft sector road, 24.8% CAGR.
• Skyline Institutional: Ajmer Road, ₹21,000/Gaj (from ₹23.31L), 111-277 Gaj, 80% bank loan.
• Heritage Valley Farm Villa: Delhi-Mumbai Expressway, ₹16,500/Gaj (from ₹82.5L), 500-2000 Gaj.
• Section 90-A: Statutory agricultural to non-agricultural conversion under Rajasthan Land Revenue Act. Society pattas after 1999 are unapproved with zero bank financing.
• Stamp Duty: Male 6%, Female 5% (1% rebate saves ~₹65,000 on ₹50L), 30% surcharge, 1% registration fee.
• Units: 1 Gaj = 9 Sq.Ft. 1 Pucca Bigha = 3,025 Gaj = 27,225 Sq.Ft.
• VIP Site Visit: Free luxury SUV (Fortuner/Innova) pickup from airport/railway station/hotel with physical measuring tape verification. Zero brokerage fiduciary advisory.

EXACT LANGUAGE FIDELITY:
- Hindi Devanagari script -> Formal, professional Hindi.
- Hinglish -> Polished executive Hinglish.
- English -> Authoritative corporate real estate English.`;

// Intelligent action generator based on message context
export const getContextualActions = (userText, replyText, lang) => {
  const lower = (userText + ' ' + replyText).toLowerCase();
  const actions = [];

  // Plots & Inventory
  if (lower.includes('plot') || lower.includes('aura') || lower.includes('skyline') || lower.includes('imperial') || lower.includes('gaj') || lower.includes('bhav') || lower.includes('rate')) {
    actions.push({
      label: lang === 'hi' ? 'सभी सत्यापित प्लॉट्स देखें' : lang === 'hinglish' ? 'Verified Plots Explore Karein' : 'Browse Verified Plots',
      path: '/plots'
    });
  }

  // Calculator & Stamp Duty
  if (lower.includes('stamp') || lower.includes('registry') || lower.includes('kharcha') || lower.includes('tax') || lower.includes('calculator') || lower.includes('sq ft') || lower.includes('sqft')) {
    actions.push({
      label: lang === 'hi' ? 'स्टाम्प ड्यूटी कैलकुलेटर' : lang === 'hinglish' ? 'Stamp Duty Calculator' : 'Wealth & Stamp Calculator',
      path: '/calculator'
    });
  }

  // Site Visit
  if (lower.includes('visit') || lower.includes('car') || lower.includes('fortuner') || lower.includes('innova') || lower.includes('inspection') || lower.includes('mauka')) {
    actions.push({
      label: lang === 'hi' ? 'निःशुल्क VIP विजिट बुक करें' : lang === 'hinglish' ? 'Free VIP Site Visit Book Karein' : 'Book VIP Chauffeur Visit',
      path: '/book-visit'
    });
  }

  // Buyer Guide / 90-A
  if (lower.includes('90-a') || lower.includes('90a') || lower.includes('diligence') || lower.includes('jamabandi') || lower.includes('patta') || lower.includes('fraud')) {
    actions.push({
      label: lang === 'hi' ? '5-चरणीय कानूनी गाइड' : lang === 'hinglish' ? 'Buyer Due-Diligence Guide' : 'Due Diligence Protocol',
      path: '/buyer-guide'
    });
    actions.push({
      label: lang === 'hi' ? '90-A रजिस्ट्री रोडमैप' : lang === 'hinglish' ? '90-A Registry Roadmap' : '90-A Registry Roadmap',
      path: '/registry-process'
    });
  }

  // Corridors / Insights
  if (lower.includes('corridor') || lower.includes('ajmer') || lower.includes('ring road') || lower.includes('dmic')) {
    actions.push({
      label: lang === 'hi' ? 'कॉरिडोर तुलना रिपोर्ट' : lang === 'hinglish' ? 'Corridor Matrix Dekhein' : 'View Corridor Dossier',
      path: '/insights'
    });
  }

  // Coordinators / Contact
  if (lower.includes('contact') || lower.includes('coordinator') || lower.includes('phone') || lower.includes('call') || lower.includes('agent')) {
    actions.push({
      label: lang === 'hi' ? '52+ समन्वयकों की डायरेक्टरी' : lang === 'hinglish' ? '52+ Territory Coordinators' : '52+ Coordinator Directory',
      path: '/contact'
    });
  }

  // CRM
  if (lower.includes('crm') || lower.includes('portal') || lower.includes('pipeline') || lower.includes('lead')) {
    actions.push({
      label: lang === 'hi' ? 'इन्वेस्टर CRM पोर्टल' : 'Open CRM Hub',
      path: '/crm'
    });
  }

  // Always offer a VIP visit if fewer than 2 actions
  if (actions.length < 2) {
    actions.push({
      label: lang === 'hi' ? 'निःशुल्क वीआईपी साइट विजिट' : lang === 'hinglish' ? 'Free VIP Chauffeur Inspection' : 'Schedule VIP Site Audit',
      path: '/book-visit'
    });
  }

  return actions.slice(0, 3);
};

// Main Live LLM Query Function
export const queryGeminiAdvisor = async (userInput, chatHistory = []) => {
  const lang = detectLanguage(userInput);
  const cleanInput = userInput.trim();

  // Extract user profile to maintain adaptive learning
  extractUserProfile(cleanInput);

  // If no API key configured, use local trained engine immediately
  if (!API_KEY) {
    return getBotResponse(cleanInput);
  }

  // Format conversational context for Gemini API
  const contents = [];

  // Add recent conversation turns (up to last 6 for context continuity)
  const recentTurns = chatHistory.slice(-6);
  for (const turn of recentTurns) {
    if (turn.sender === 'user') {
      contents.push({ role: 'user', parts: [{ text: turn.text }] });
    } else if (turn.sender === 'bot' && turn.text) {
      contents.push({ role: 'model', parts: [{ text: turn.text }] });
    }
  }

  // Append latest user message
  contents.push({ role: 'user', parts: [{ text: cleanInput }] });

  // Function to call a specific Gemini model
  const callModel = async (modelName) => {
    const url = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${API_KEY}`;
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents,
        systemInstruction: {
          parts: [{ text: AVM_SYSTEM_INSTRUCTION }]
        },
        generationConfig: {
          temperature: 0.3, // Professional, authoritative and precise
          maxOutputTokens: 250 // Strictly short, executive and crisp
        }
      })
    });

    if (!response.ok) {
      throw new Error(`Gemini API error: HTTP ${response.status}`);
    }

    const data = await response.json();
    const replyText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
    if (!replyText) {
      throw new Error('Empty response from Gemini API');
    }
    return replyText;
  };

  try {
    // Try Primary Model (gemini-3.5-flash-lite)
    let generatedText;
    try {
      generatedText = await callModel(PRIMARY_MODEL);
    } catch (primaryErr) {
      console.warn(`Primary model ${PRIMARY_MODEL} failed, falling back to ${BACKUP_MODEL}:`, primaryErr);
      // Fallback to Backup Model (gemini-3.6-flash)
      generatedText = await callModel(BACKUP_MODEL);
    }

    // Attach contextual dynamic actions
    const actions = getContextualActions(cleanInput, generatedText, lang);

    return {
      text: generatedText,
      actions,
      detectedLanguage: lang,
      source: 'gemini-live'
    };
  } catch (err) {
    console.warn('Gemini API call encountered error, activating local offline domain engine:', err);
    // Seamless Zero-Downtime Fallback to local trained knowledge engine
    const fallbackResponse = getBotResponse(cleanInput);
    return {
      ...fallbackResponse,
      source: 'local-offline-engine'
    };
  }
};
