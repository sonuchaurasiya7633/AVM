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
        luxury: {
          dark: "#050706",
          darker: "#010806",
          obsidian: "#010604",
          surface: "#0A0F0D",
          surfaceLight: "#121A16",
          emerald: "#003B2B",
          deepEmerald: "#00281E",
          emeraldLight: "#005C43",
          gold: "#C9A35C",
          goldLight: "#E2C178",
          goldDark: "#9E7B3B",
          gold24k: "#D4AF37",
          ivory: "#F7F3EA",
          muted: "#AAA79F",
          borderDark: "rgba(201, 163, 92, 0.2)",
          borderLight: "rgba(0, 59, 43, 0.15)",
        },
        leather: {
          tan: "#8B5A2B",
          cognac: "#6E3914",
          saddle: "#5C3317",
          bourbon: "#3D2314",
          dark: "#1A0F0A",
          emerald: "#03281E",
          deepGreen: "#001F17",
          stitch: "rgba(226, 193, 120, 0.65)",
        },
        lightBg: {
          base: "#FAF8F5",
          surface: "#FFFFFF",
          card: "#F4EFEA",
          accent: "#EAE3D8",
          emeraldDark: "#03281E",
          textPrimary: "#0C1713",
          textSecondary: "#4A5A53",
        }
      },
      fontFamily: {
        serif: ['"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
      },
      backgroundImage: {
        'gold-gradient': 'linear-gradient(135deg, #FFF0C8 0%, #E2C178 30%, #C9A35C 70%, #9E7B3B 100%)',
        'gold-foil': 'linear-gradient(135deg, #FFFFFF 0%, #F5E0A3 25%, #D4AF37 50%, #AA771C 80%, #704C0A 100%)',
        'emerald-gradient': 'linear-gradient(135deg, #003B2B 0%, #00281E 60%, #050706 100%)',
        'obsidian-gradient': 'radial-gradient(circle at 50% 20%, #063324 0%, #021911 60%, #010806 100%)',
        'leather-cognac': 'radial-gradient(circle at 50% 25%, #522A14 0%, #2F170A 65%, #190B04 100%)',
        'leather-emerald': 'radial-gradient(circle at 50% 25%, #05402E 0%, #02261A 65%, #01120B 100%)',
        'luxury-radial': 'radial-gradient(circle at 50% 20%, rgba(0, 59, 43, 0.35) 0%, rgba(5, 7, 6, 0.95) 75%)',
        'light-radial': 'radial-gradient(circle at 50% 10%, rgba(201, 163, 92, 0.12) 0%, rgba(250, 248, 245, 1) 70%)',
      },
      boxShadow: {
        'luxury-gold': '0 0 30px rgba(212, 175, 55, 0.3)',
        'luxury-gold-lg': '0 0 50px rgba(212, 175, 55, 0.4)',
        'luxury-emerald': '0 10px 40px -10px rgba(0, 59, 43, 0.55)',
        'luxury-card': '0 25px 50px rgba(0, 0, 0, 0.65)',
        'light-card': '0 15px 35px rgba(3, 40, 30, 0.08)',
        'brass-rivet': 'inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 2px 6px rgba(0, 0, 0, 0.85)',
      },
      animation: {
        'aurora-drift': 'auroraDrift 20s ease-in-out infinite alternate',
        'float-slow': 'luxuryFloat 6s ease-in-out infinite',
        'liquid-sheen': 'liquidSheen 5s linear infinite',
        'gold-pulse': 'goldPulseGlow 3s ease-in-out infinite',
      },
      keyframes: {
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
  plugins: [],
}
