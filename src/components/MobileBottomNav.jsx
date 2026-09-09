import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Building2, Users, Calculator, Menu } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCRM } from '../context/CRMContext';

export const MobileBottomNav = () => {
  const location = useLocation();
  const { isHindi } = useLanguage();
  const { metrics } = useCRM();

  const navItems = [
    {
      name: isHindi ? 'होम' : 'Home',
      path: '/',
      icon: Home,
    },
    {
      name: isHindi ? 'प्लॉट्स' : 'Plots',
      path: '/plots',
      icon: Building2,
    },
    {
      name: isHindi ? 'CRM' : 'CRM',
      path: '/crm',
      icon: Users,
      badge: metrics?.totalLeads ? metrics.totalLeads : null,
      highlight: true,
    },
    {
      name: isHindi ? 'कैलकुलेटर' : 'Calculator',
      path: '/calculator',
      icon: Calculator,
    },
  ];

  const handleOpenMenu = () => {
    window.dispatchEvent(new CustomEvent('open-mobile-menu'));
  };

  return (
    <nav
      aria-label="Mobile Bottom Navigation"
      className="fixed bottom-0 inset-x-0 z-40 lg:hidden dark:bg-[#030712]/95 bg-white/95 backdrop-blur-2xl border-t dark:border-white/10 border-slate-200/80 shadow-[0_-8px_30px_rgba(0,0,0,0.12)] px-2 py-1.5 pb-[max(0.375rem,env(safe-area-inset-bottom))]"
    >
      <div className="max-w-md mx-auto grid grid-cols-5 items-center gap-1">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;

          return (
            <Link
              key={item.path}
              to={item.path}
              className={`flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-200 relative ${
                isActive
                  ? 'text-cyan-400 font-bold'
                  : 'dark:text-slate-400 text-slate-600 dark:hover:text-slate-200 hover:text-slate-900'
              }`}
            >
              {isActive && (
                <span className="absolute -top-1 w-6 h-0.5 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
              )}
              <div
                className={`p-1 rounded-lg transition-transform relative ${
                  isActive
                    ? 'dark:bg-cyan-950/60 bg-cyan-50 scale-110 shadow-sm'
                    : ''
                }`}
              >
                <Icon
                  className={`w-5 h-5 ${
                    isActive
                      ? 'stroke-[2.5] text-cyan-400'
                      : 'stroke-[1.8]'
                  }`}
                />
                {item.highlight && item.badge && (
                  <span className="absolute -top-1 -right-1.5 w-3.5 h-3.5 rounded-full bg-rose-600 text-white font-mono text-[8px] font-bold flex items-center justify-center shadow-sm">
                    {item.badge}
                  </span>
                )}
                {item.highlight && !item.badge && (
                  <span className="absolute top-0 right-0 w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                )}
              </div>
              <span className="text-[10px] tracking-tight leading-tight mt-0.5 truncate max-w-full">
                {item.name}
              </span>
            </Link>
          );
        })}

        {/* 5th Action: Menu Drawer Trigger with Dotted Outline */}
        <button
          onClick={handleOpenMenu}
          type="button"
          className="flex flex-col items-center justify-center py-1 rounded-xl transition-all duration-200 text-amber-500 hover:text-amber-400 active:scale-95 group focus:outline-none cursor-pointer"
          aria-label="Open Mobile Menu"
        >
          <div className="p-1 rounded-lg bg-gold-gradient border-2 border-dotted border-amber-500 dark:border-amber-400 shadow-[0_2px_10px_rgba(212,175,55,0.4)] group-hover:scale-105 transition-transform">
            <Menu className="w-5 h-5 stroke-[2.5] text-luxury-darker" />
          </div>
          <span className="text-[10px] font-extrabold tracking-tight leading-tight mt-0.5 text-luxury-goldDark dark:text-luxury-gold">
            {isHindi ? 'मेन्यू' : 'Menu'}
          </span>
        </button>
      </div>
    </nav>
  );
};
