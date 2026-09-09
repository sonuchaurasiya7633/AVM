/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        obsidian: {
          DEFAULT: '#030712',
          900: '#030712',
          800: '#060b17',
          700: '#0a0f1d',
          card: '#0b1120',
        },
        brand: {
          cyan: '#06b6d4',
          gold: '#f59e0b',
        },
        luxury: {
          dark: "var(--bg-base)",
          darker: "var(--bg-base)",
          obsidian: "var(--bg-base)",
          surface: "var(--bg-surface)",
          surfaceLight: "var(--bg-input)",
          emerald: "#10B981",
          deepEmerald: "#064E3B",
          emeraldLight: "#34D399",
          wine: "#D4AF37",
          wineLight: "#FDE68A",
          wineDark: "var(--bg-surface)",
          burgundy: "var(--bg-surface)",
          bordeaux: "var(--bg-surface)",
          gold: "#D4AF37",
          goldLight: "#FDE68A",
          goldDark: "#B45309",
          gold24k: "#F59E0B",
          ivory: "var(--text-primary)",
          muted: "var(--text-muted)",
          borderDark: "var(--border-subtle)",
          borderLight: "var(--border-subtle)",
        },
        leather: {
          tan: "#D4AF37",
          cognac: "#D4AF37",
          saddle: "#B45309",
          bourbon: "var(--bg-surface)",
          dark: "var(--bg-base)",
          emerald: "#10B981",
          deepGreen: "#064E3B",
          wine: "var(--bg-surface)",
          burgundy: "var(--bg-surface)",
          stitch: "rgba(212, 175, 55, 0.7)",
        },
        lightBg: {
          base: "#F8FAFC",
          surface: "#FFFFFF",
          card: "#FFFFFF",
          accent: "#F1F5F9",
          emeraldDark: "#10B981",
          textPrimary: "#0F172A",
          textSecondary: "#334155",
        },
      },
      opacity: {
        '88': '0.88',
        '91': '0.91',
        '92': '0.92',
        '94': '0.94',
        '96': '0.96',
        '98': '0.98',
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #D4AF37 0%, #F59E0B 50%, #B45309 100%)',
        'gold-foil': 'linear-gradient(135deg, #FFFFFF 0%, #FDE68A 30%, #F59E0B 60%, #D4AF37 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #10B981 0%, #064E3B 60%, #030712 100%)',
        'wine-gradient': 'linear-gradient(135deg, #0B1120 0%, #030712 100%)',
        'obsidian-gradient': 'radial-gradient(circle at 50% 20%, #0B1120 0%, #060B17 60%, #030712 100%)',
        'leather-cognac': 'radial-gradient(circle at 50% 25%, #0B1120 0%, #060B17 65%, #030712 100%)',
        'leather-emerald': 'radial-gradient(circle at 50% 25%, #0B1120 0%, #060B17 65%, #030712 100%)',
        'leather-wine': 'radial-gradient(circle at 50% 25%, #0B1120 0%, #060B17 65%, #030712 100%)',
        'luxury-radial': 'radial-gradient(circle at 50% 20%, rgba(6, 182, 212, 0.12) 0%, rgba(3, 7, 18, 0.96) 75%)',
        'luxury-gradient': 'linear-gradient(135deg, rgba(212, 175, 55, 0.15) 0%, rgba(6, 182, 212, 0.08) 50%, rgba(245, 158, 11, 0.15) 100%)',
        'card-gradient': 'linear-gradient(180deg, rgba(255, 255, 255, 0.04) 0%, rgba(255, 255, 255, 0.01) 100%)',
        'light-radial': 'radial-gradient(circle at 50% 10%, rgba(6, 182, 212, 0.08) 0%, rgba(3, 7, 18, 1) 70%)',
      },
      boxShadow: {
        'luxury-gold': '0 0 30px rgba(245, 158, 11, 0.35)',
        'luxury-gold-lg': '0 0 50px rgba(245, 158, 11, 0.5)',
        'luxury-emerald': '0 10px 40px -10px rgba(16, 185, 129, 0.4)',
        'luxury-card': '0 25px 50px rgba(0, 0, 0, 0.7)',
        'light-card': '0 15px 35px rgba(0, 0, 0, 0.3)',
        'brass-rivet': 'inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 2px 6px rgba(0, 0, 0, 0.85)',
      },
      animation: {
        'aurora-drift': 'auroraDrift 20s ease-in-out infinite alternate',
        'float-slow': 'luxuryFloat 6s ease-in-out infinite',
        'liquid-sheen': 'liquidSheen 5s linear infinite',
        'gold-pulse': 'goldPulseGlow 3s ease-in-out infinite',
        blob: 'blob 12s infinite ease-in-out',
      },
      keyframes: {
        blob: {
          '0%': { transform: 'scale(1) translate(0px, 0px)' },
          '33%': { transform: 'scale(1.15) translate(30px, -50px)' },
          '66%': { transform: 'scale(0.85) translate(-20px, 20px)' },
          '100%': { transform: 'scale(1) translate(0px, 0px)' },
        },
        auroraDrift: {
          '0%': { transform: 'translate(0%, 0%) scale(1)' },
          '50%': { transform: 'translate(-5%, 8%) scale(1.1)' },
          '100%': { transform: 'translate(5%, -5%) scale(0.95)' },
        },
        luxuryFloat: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        liquidSheen: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        goldPulseGlow: {
          '0%, 100%': { opacity: '0.6', filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.4))' },
          '50%': { opacity: '1', filter: 'drop-shadow(0 0 20px rgba(212, 175, 55, 0.8))' },
        }
      }
    },
  },
  plugins: [
    function({ addVariant }) {
      addVariant('light', 'html.light &');
    },
  ],
}
