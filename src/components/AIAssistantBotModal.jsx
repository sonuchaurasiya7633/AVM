import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  X, Send, Sparkles, Bot, User, ArrowRight, MessageSquare, 
  RotateCcw, ExternalLink, ShieldCheck, Compass, MapPin, Phone,
  ThumbsUp, ThumbsDown, Brain, CheckCircle2, AlertTriangle, Lightbulb, Trash2
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { 
  getBotResponse, 
  detectLanguage, 
  getUserProfile, 
  clearUserProfile, 
  updateFeedback, 
  getLearningStats 
} from '../data/aiBotKnowledge';
import { queryGeminiAdvisor } from '../services/geminiAiService';
import { useLanguage } from '../context/LanguageContext';

export const AIAssistantBotModal = ({ isOpen, onClose }) => {
  const { isHindi } = useLanguage();
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const [userProfile, setUserProfile] = useState(() => getUserProfile());
  const [learningStats, setLearningStats] = useState(() => getLearningStats());
  const [ratedMessages, setRatedMessages] = useState({});

  const initialGreeting = {
    id: 'msg-welcome',
    sender: 'bot',
    text: isHindi
      ? `नमस्ते! मैं **AVM Talks AI सलाहकार** हूँ। आप मुझसे जयपुर प्लॉट्स, धारा 90-A रूपांतरण, रजिस्ट्री व स्टाम्प खर्च, अजमेर रोड/रिंग रोड कॉरिडोर, गज से वर्ग फुट पैमाना या फ्री वीआईपी साइट विजिट से संबंधित कोई भी सवाल **हिंदी, Hinglish या English** में पूछ सकते हैं।`
      : `Hello! I am the **AVM Talks AI Advisory Bot**. You can ask me anything about Jaipur plots, JDA Section 90-A legal conversion, registry & stamp duty charges, top corridors, Gaj to Sq.Ft conversion, or free VIP chauffeur inspections in **Hindi, Hinglish, or English**.`,
    actions: [
      { label: isHindi ? 'धारा 90-A क्या है?' : 'What is Section 90-A?', prompt: isHindi ? 'धारा 90-A की जानकारी दें' : 'What is Section 90-A conversion?' },
      { label: isHindi ? 'अजमेर रोड vs रिंग रोड' : 'Ajmer Road vs Ring Road', prompt: isHindi ? 'अजमेर रोड और रिंग रोड कॉरिडोर की तुलना करें' : 'Compare Ajmer Road and Ring Road corridors' },
      { label: isHindi ? 'रजिस्ट्री खर्च कितना लगेगा?' : 'Stamp Duty & Registry Cost', prompt: isHindi ? 'प्लॉट रजिस्ट्री में कितना खर्च आता है?' : 'How much is registry stamp duty in Rajasthan?' },
      { label: isHindi ? 'फ्री VIP साइट विजिट कैसे बुक करें?' : 'Free VIP Site Visit', prompt: isHindi ? 'फ्री साइट विजिट कैसे बुक करें?' : 'How to book a free VIP site inspection?' },
      { label: isHindi ? '200 गज में कितना वर्ग फुट?' : '200 Gaj in Sq.Ft', prompt: isHindi ? '200 गज में कितना वर्ग फुट होता है?' : 'How many sq ft in 200 gaj?' },
    ],
    timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
  };

  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem('avm_ai_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      // ignore
    }
    return [initialGreeting];
  });

  const [inputVal, setInputVal] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [activeLang, setActiveLang] = useState('en');

  // Auto-scroll to bottom of chat
  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [messages, isOpen, isTyping]);

  // Save history
  useEffect(() => {
    try {
      localStorage.setItem('avm_ai_chat_history', JSON.stringify(messages));
    } catch (e) {
      // ignore
    }
  }, [messages]);

  const handleSendMessage = async (customText) => {
    const textToSend = customText || inputVal;
    if (!textToSend.trim() || isTyping) return;

    const detected = detectLanguage(textToSend);
    setActiveLang(detected);

    const userMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: textToSend.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    if (!customText) setInputVal('');
    setIsTyping(true);

    try {
      // Query Live Gemini LLM (with conversation history & domain grounding)
      const botReply = await queryGeminiAdvisor(textToSend, updatedMessages);
      const botMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: botReply.text,
        actions: botReply.actions || [],
        detectedLanguage: botReply.detectedLanguage,
        source: botReply.source || 'gemini-live',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.warn('Gemini query fallback:', err);
      const fallbackReply = getBotResponse(textToSend);
      const botMessage = {
        id: `msg-${Date.now() + 1}`,
        sender: 'bot',
        text: fallbackReply.text,
        actions: fallbackReply.actions || [],
        detectedLanguage: fallbackReply.detectedLanguage,
        source: 'local-offline-engine',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botMessage]);
    } finally {
      setIsTyping(false);
      // Refresh learned profile & stats
      setUserProfile(getUserProfile());
      setLearningStats(getLearningStats());
    }
  };

  const handleClearChat = () => {
    setMessages([initialGreeting]);
    localStorage.removeItem('avm_ai_chat_history');
  };

  const handleClearProfile = () => {
    clearUserProfile();
    setUserProfile({ name: null, budget: null, corridor: null, sizeGaj: null, languagePreference: 'hinglish', totalInteractions: 0 });
  };

  const handleFeedback = (messageId, rating) => {
    setRatedMessages(prev => ({ ...prev, [messageId]: rating }));
    updateFeedback(messageId, rating);
    setLearningStats(getLearningStats());
  };

  const whatsappDirectUrl = `https://wa.me/919928365001?text=Hello%20Avnish%20ji,%20I%20have%20an%20inquiry%20regarding%20Jaipur%20plotted%20real%20estate%20due%20diligence.`;

  // Rich message line formatter
  const renderMessageContent = (text, isUser) => {
    const lines = text.split('\n');

    return (
      <div className="space-y-2 text-xs leading-relaxed">
        {lines.map((line, idx) => {
          const trimmed = line.trim();
          if (!trimmed) return <div key={idx} className="h-1" />;

          // 1. Title / Header Line (e.g., starts with emoji or **title**)
          if (!isUser && (trimmed.startsWith('🏛️') || trimmed.startsWith('📍') || trimmed.startsWith('💰') || 
                         trimmed.startsWith('⚖️') || trimmed.startsWith('🚗') || trimmed.startsWith('🛡️') || 
                         trimmed.startsWith('📐') || trimmed.startsWith('🏦') || trimmed.startsWith('🎙️') || 
                         trimmed.startsWith('📊'))) {
            return (
              <div key={idx} className="font-serif font-bold text-sm text-luxury-gold flex items-center gap-1.5 pt-1 pb-0.5 border-b border-luxury-gold/20">
                {renderBoldSpans(trimmed, isUser)}
              </div>
            );
          }

          // 2. Callout: Pro Tip (starts with 💡 or *💡)
          if (!isUser && (trimmed.startsWith('💡') || trimmed.startsWith('*💡'))) {
            return (
              <div key={idx} className="p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-200/95 flex items-start gap-2 text-[11px] my-1.5 shadow-sm">
                <Lightbulb className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">{renderBoldSpans(trimmed.replace(/^\*?💡\s*/, ''), isUser)}</div>
              </div>
            );
          }

          // 3. Callout: Warning / Red Flag (starts with ⚠️ or *⚠️)
          if (!isUser && (trimmed.startsWith('⚠️') || trimmed.startsWith('*⚠️'))) {
            return (
              <div key={idx} className="p-2.5 rounded-xl bg-rose-500/10 border border-rose-400/30 text-rose-200/95 flex items-start gap-2 text-[11px] my-1.5 shadow-sm">
                <AlertTriangle className="w-4 h-4 text-rose-400 flex-shrink-0 mt-0.5" />
                <div className="flex-1">{renderBoldSpans(trimmed.replace(/^\*?⚠️\s*/, ''), isUser)}</div>
              </div>
            );
          }

          // 4. Bullet list items
          if (trimmed.startsWith('•') || trimmed.startsWith('-')) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1.5 text-theme-primary">
                <span className="text-luxury-gold font-bold">•</span>
                <span className="flex-1">{renderBoldSpans(trimmed.substring(1).trim(), isUser)}</span>
              </div>
            );
          }

          // 5. Numbered items (1., 2., 3., etc.)
          const numMatch = trimmed.match(/^(\d+)\.\s+(.*)/);
          if (numMatch) {
            return (
              <div key={idx} className="flex items-start gap-2 pl-1 my-1">
                <span className="inline-flex items-center justify-center w-4 h-4 rounded-full bg-luxury-gold/20 text-luxury-gold text-[10px] font-bold font-mono flex-shrink-0 mt-0.5">
                  {numMatch[1]}
                </span>
                <span className="flex-1">{renderBoldSpans(numMatch[2], isUser)}</span>
              </div>
            );
          }

          // Standard paragraph
          return (
            <p key={idx} className={isUser ? 'text-luxury-darker font-medium' : 'text-theme-primary'}>
              {renderBoldSpans(line, isUser)}
            </p>
          );
        })}
      </div>
    );
  };

  // Bold parser helper
  const renderBoldSpans = (str, isUser) => {
    const parts = str.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, pIdx) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const text = part.replace(/\*\*/g, '');
        return (
          <strong key={pIdx} className={isUser ? 'font-black' : 'font-bold text-luxury-gold'}>
            {text}
          </strong>
        );
      }
      return part;
    });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-end sm:justify-center p-0 sm:p-4 overflow-hidden">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm"
        />

        {/* Chat Drawer / Modal */}
        <motion.div
          initial={{ opacity: 0, y: 40, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 40, scale: 0.96 }}
          transition={{ type: 'spring', damping: 28, stiffness: 300 }}
          className="relative w-full sm:max-w-xl h-[90vh] sm:h-[700px] bg-theme-card border-2 border-luxury-gold shadow-2xl rounded-t-3xl sm:rounded-3xl flex flex-col overflow-hidden z-10 leather-stitch-outline"
        >
          {/* Corner Screws for Handcrafted Luxury Feel */}
          <div className="brass-screw absolute top-3.5 left-3.5 z-20" />
          <div className="brass-screw absolute top-3.5 right-3.5 z-20" />

          {/* Modal Header */}
          <div className="p-4 sm:p-5 bg-gradient-to-r dark:from-[#0b1120] dark:via-indigo-950/80 dark:to-[#030712] from-slate-900 via-slate-800 to-slate-950 text-white border-b border-white/10 flex items-center justify-between gap-3 flex-shrink-0 relative">
            <div className="flex items-center gap-3 pl-3">
              <div className="relative">
                <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-amber-500 via-amber-300 to-yellow-100 text-luxury-darker flex items-center justify-center font-bold shadow-[0_0_15px_rgba(245,158,11,0.5)] border border-white">
                  <Sparkles className="w-5 h-5 fill-luxury-darker" />
                </div>
                {/* Live Online Dot */}
                <span className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-400 rounded-full border-2 border-black" />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-serif font-bold text-sm sm:text-base text-white leading-tight">
                    {isHindi ? 'AVM Talks AI सलाहकार' : 'AVM Intelligence AI Desk'}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full text-[9px] font-mono font-bold bg-amber-400/20 text-amber-300 border border-amber-400/30 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Gemini 3.5 Flash AI
                  </span>
                </div>
                <p className="text-[10px] text-slate-300 flex items-center gap-1.5 mt-0.5">
                  <ShieldCheck className="w-3 h-3 text-cyan-400" />
                  <span>
                    {activeLang === 'hi' 
                      ? 'हिन्दी में उत्तर दे रहा है' 
                      : activeLang === 'hinglish' 
                      ? 'Hinglish me reply active' 
                      : 'Replying in English'}
                  </span>
                  <span className="text-white/30">•</span>
                  <span className="text-[9.5px] text-amber-300/80 flex items-center gap-1">
                    <Brain className="w-2.5 h-2.5" />
                    Continuous Learning
                  </span>
                </p>
              </div>
            </div>

            {/* Header Controls */}
            <div className="flex items-center gap-1.5 pr-2">
              <a
                href={whatsappDirectUrl}
                target="_blank"
                rel="noreferrer"
                title={isHindi ? 'मानव सलाहकार से बात करें' : 'Talk to Human Advisor'}
                className="hidden sm:inline-flex items-center gap-1 px-2.5 py-1 rounded-lg border border-emerald-500/40 bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500 hover:text-white text-[11px] font-bold transition-all"
              >
                <MessageSquare className="w-3 h-3" />
                <span>WhatsApp</span>
              </a>

              <button
                onClick={handleClearChat}
                title={isHindi ? 'चैट रीसेट करें' : 'Clear chat history'}
                className="p-1.5 rounded-lg border dark:border-white/10 border-slate-700 text-slate-400 hover:text-white transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
              </button>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg border dark:border-white/10 border-slate-700 text-cyan-400 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* User Profile / Learned Context Strip (if user details known) */}
          {(userProfile?.name || userProfile?.budget || userProfile?.corridor) && (
            <div className="px-4 py-1.5 bg-gradient-to-r from-amber-500/10 via-amber-400/5 to-transparent border-b border-luxury-gold/20 flex items-center justify-between text-[10px] text-theme-secondary flex-shrink-0">
              <div className="flex items-center gap-2 overflow-x-auto scrollbar-none py-0.5">
                <span className="font-bold text-luxury-gold flex items-center gap-1 uppercase tracking-wider text-[9px]">
                  <Brain className="w-3 h-3" /> Learned Profile:
                </span>
                {userProfile.name && (
                  <span className="px-2 py-0.5 rounded-full bg-luxury-gold/15 text-luxury-gold border border-luxury-gold/30 font-medium">
                    👤 {userProfile.name}
                  </span>
                )}
                {userProfile.budget && (
                  <span className="px-2 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 font-medium">
                    💰 {userProfile.budget}
                  </span>
                )}
                {userProfile.corridor && (
                  <span className="px-2 py-0.5 rounded-full bg-cyan-500/15 text-cyan-400 border border-cyan-500/30 font-medium">
                    📍 {userProfile.corridor}
                  </span>
                )}
              </div>
              <button
                onClick={handleClearProfile}
                title="Clear learned profile"
                className="text-theme-muted hover:text-rose-400 transition-colors p-1"
              >
                <Trash2 className="w-3 h-3" />
              </button>
            </div>
          )}

          {/* Messages Stream */}
          <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-4 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              const messageFeedback = ratedMessages[msg.id];

              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'justify-end' : 'justify-start'}`}
                >
                  {!isUser && (
                    <div className="w-7 h-7 rounded-full bg-gradient-to-tr from-amber-500 to-amber-300 text-luxury-darker flex items-center justify-center font-bold flex-shrink-0 shadow-sm mt-0.5">
                      <Bot className="w-4 h-4" />
                    </div>
                  )}

                  <div className={`space-y-2 max-w-[88%] ${isUser ? 'items-end' : 'items-start'}`}>
                    {/* Speech Bubble */}
                    <div
                      className={`p-3.5 sm:p-4 rounded-2xl shadow-sm ${
                        isUser
                          ? 'bg-gold-gradient text-luxury-darker font-medium rounded-tr-none shadow-md'
                          : 'bg-theme-base border dark:border-white/10 border-slate-200 text-theme-primary rounded-tl-none'
                      }`}
                    >
                      {/* Structured Message Formatter */}
                      {renderMessageContent(msg.text, isUser)}

                      <div className={`flex items-center justify-between text-[9px] mt-2 pt-1 border-t ${
                        isUser ? 'border-luxury-darker/10 text-luxury-darker/70' : 'border-white/5 text-theme-muted'
                      }`}>
                        <div className="flex items-center gap-1.5">
                          <span className="font-mono">{msg.timestamp}</span>
                          {!isUser && msg.source === 'gemini-live' && (
                            <span className="text-[8.5px] font-mono font-bold text-amber-300 bg-amber-400/15 px-1.5 py-0.2 rounded border border-amber-400/30 flex items-center gap-0.5">
                              ✦ Gemini 3.5 Flash
                            </span>
                          )}
                        </div>

                        {/* Thumbs Feedback on Bot Responses */}
                        {!isUser && msg.id !== 'msg-welcome' && (
                          <div className="flex items-center gap-1.5 ml-auto">
                            {messageFeedback ? (
                              <span className="inline-flex items-center gap-1 text-[9.5px] text-emerald-400 font-medium">
                                <CheckCircle2 className="w-2.5 h-2.5" />
                                {messageFeedback === 'positive' ? 'Helpful' : 'Feedback noted'}
                              </span>
                            ) : (
                              <div className="flex items-center gap-1 text-theme-muted">
                                <span className="text-[8.5px]">Was this helpful?</span>
                                <button
                                  onClick={() => handleFeedback(msg.id, 'positive')}
                                  title="Mark as helpful"
                                  className="p-1 rounded hover:bg-emerald-500/20 hover:text-emerald-400 transition-colors"
                                >
                                  <ThumbsUp className="w-2.5 h-2.5" />
                                </button>
                                <button
                                  onClick={() => handleFeedback(msg.id, 'negative')}
                                  title="Needs improvement"
                                  className="p-1 rounded hover:bg-rose-500/20 hover:text-rose-400 transition-colors"
                                >
                                  <ThumbsDown className="w-2.5 h-2.5" />
                                </button>
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Interactive Action Buttons & Quick Prompts inside Bot Message */}
                    {!isUser && msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.actions.map((act, aIdx) => {
                          if (act.path) {
                            return (
                              <Link
                                key={aIdx}
                                to={act.path}
                                onClick={onClose}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl border border-luxury-gold/40 bg-theme-card hover:bg-gold-gradient hover:text-luxury-darker text-[10.5px] font-bold text-luxury-gold transition-all shadow-sm"
                              >
                                <span>{act.label}</span>
                                <ExternalLink className="w-3 h-3" />
                              </Link>
                            );
                          }
                          if (act.prompt) {
                            return (
                              <button
                                key={aIdx}
                                onClick={() => handleSendMessage(act.prompt)}
                                className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-xl border dark:border-white/10 border-slate-300 bg-theme-base hover:border-luxury-gold text-[10.5px] font-medium text-theme-secondary hover:text-theme-primary transition-colors cursor-pointer"
                              >
                                <span>✦</span>
                                <span>{act.label}</span>
                              </button>
                            );
                          }
                          return null;
                        })}
                      </div>
                    )}
                  </div>

                  {isUser && (
                    <div className="w-7 h-7 rounded-full bg-slate-200 dark:bg-white/10 text-theme-secondary flex items-center justify-center font-bold flex-shrink-0 shadow-sm mt-0.5">
                      <User className="w-4 h-4" />
                    </div>
                  )}
                </div>
              );
            })}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex items-center gap-2 text-theme-muted text-xs">
                <div className="w-7 h-7 rounded-full bg-amber-500/20 border border-amber-400/40 text-amber-400 flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-4 h-4 animate-spin" />
                </div>
                <div className="p-3 rounded-2xl bg-theme-base border dark:border-white/10 border-slate-200 flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-bounce" style={{ animationDelay: '300ms' }} />
                  <span className="text-[10px] font-mono text-theme-muted ml-1">
                    {isHindi ? 'Gemini AI उत्तर तैयार कर रहा है...' : 'Gemini 3.5 analyzing real estate domain...'}
                  </span>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick Suggested Topic Pills above Input */}
          <div className="px-4 py-2 border-t dark:border-white/5 border-slate-200 bg-slate-50/50 dark:bg-white/[0.01] flex items-center gap-1.5 overflow-x-auto scrollbar-none text-[10.5px]">
            <button
              onClick={() => handleSendMessage(isHindi ? 'धारा 90-A क्या है और यह क्यों जरूरी है?' : 'What is Section 90-A conversion?')}
              className="px-2.5 py-1 rounded-full border dark:border-white/10 border-slate-300 bg-theme-card hover:border-luxury-gold text-theme-secondary hover:text-theme-primary whitespace-nowrap transition-colors"
            >
              📜 JDA 90-A
            </button>
            <button
              onClick={() => handleSendMessage(isHindi ? 'अजमेर रोड और रिंग रोड कॉरिडोर में क्या रेट है?' : 'What are Ajmer Road & Ring Road plot rates?')}
              className="px-2.5 py-1 rounded-full border dark:border-white/10 border-slate-300 bg-theme-card hover:border-luxury-gold text-theme-secondary hover:text-theme-primary whitespace-nowrap transition-colors"
            >
              📍 Jaipur Corridors
            </button>
            <button
              onClick={() => handleSendMessage(isHindi ? 'प्लॉट रजिस्ट्री में कितना स्टाम्प ड्यूटी और टैक्स लगता है?' : 'How much is stamp duty and registry charges?')}
              className="px-2.5 py-1 rounded-full border dark:border-white/10 border-slate-300 bg-theme-card hover:border-luxury-gold text-theme-secondary hover:text-theme-primary whitespace-nowrap transition-colors"
            >
              💰 Stamp Duty
            </button>
            <button
              onClick={() => handleSendMessage(isHindi ? 'फ्री VIP साइट विजिट कैसे बुक करें?' : 'How to book free VIP site visit in Fortuner?')}
              className="px-2.5 py-1 rounded-full border dark:border-white/10 border-slate-300 bg-theme-card hover:border-luxury-gold text-theme-secondary hover:text-theme-primary whitespace-nowrap transition-colors"
            >
              🚗 Free Site Visit
            </button>
            <button
              onClick={() => handleSendMessage(isHindi ? '200 गज में कितना वर्ग फुट होता है?' : 'How many sq ft in 200 gaj?')}
              className="px-2.5 py-1 rounded-full border dark:border-white/10 border-slate-300 bg-theme-card hover:border-luxury-gold text-theme-secondary hover:text-theme-primary whitespace-nowrap transition-colors"
            >
              📐 200 Gaj = ? Sq.Ft
            </button>
            <button
              onClick={() => handleSendMessage(isHindi ? 'Aura Grand Sovereign प्लॉट की जानकारी दें' : 'Tell me about Aura Grand Sovereign plots')}
              className="px-2.5 py-1 rounded-full border dark:border-white/10 border-slate-300 bg-theme-card hover:border-luxury-gold text-theme-secondary hover:text-theme-primary whitespace-nowrap transition-colors"
            >
              🏛️ Aura Sovereign
            </button>
          </div>

          {/* Input & Send Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 sm:p-4 bg-theme-card border-t dark:border-white/10 border-slate-200 flex items-center gap-2 flex-shrink-0"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder={
                isHindi
                  ? 'कुछ भी पूछें... (जैसे: 35 लाख में प्लॉट, 90-A, गज कैलकुलेटर)'
                  : 'Ask anything... (e.g. plots under 40L, 90-A, stamp duty, 150 gaj to sqft)'
              }
              className="flex-1 px-4 py-2.5 rounded-xl bg-theme-base border dark:border-white/10 border-slate-300 text-xs text-theme-primary placeholder-theme-muted focus:outline-none focus:border-luxury-gold"
            />
            <button
              type="submit"
              disabled={!inputVal.trim() || isTyping}
              className="p-2.5 rounded-xl bg-gold-gradient text-luxury-darker disabled:opacity-40 hover:scale-105 active:scale-95 transition-all shadow-sm cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};
