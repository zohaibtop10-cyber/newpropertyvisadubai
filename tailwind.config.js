/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--color-background)',
        surface: {
          DEFAULT: 'var(--color-surface)',
          primary: 'var(--surface-primary)',
          elevated: 'var(--color-surface-elevated)',
          hover: 'var(--bg-surface-hover)',
        },
        primary: 'var(--color-text-primary)',
        secondary: 'var(--color-text-secondary)',
        muted: 'var(--color-text-muted)',
        text: {
          main: 'var(--text-main)',
        },
        border: {
          DEFAULT: 'var(--color-border)',
          subtle: 'var(--color-border)',
          gold: 'var(--color-border-gold)',
          strong: 'var(--border-strong)',
        },
        gold: {
          DEFAULT: 'var(--color-gold-base)',
          base: 'var(--color-gold-base)',
          light: 'var(--color-gold-light)',
          dark: 'var(--color-gold-dark)',
          glow: 'var(--color-gold-glow)',
        },
        brand: {
          gold: 'var(--color-gold-base)',
          goldText: 'var(--brand-gold-text)',
          goldBg: 'var(--brand-gold-bg)',
          goldLight: 'var(--color-gold-light)',
          goldDark: 'var(--color-gold-dark)',
          goldMuted: '#C5A059',
          darkBg: 'var(--color-background)',
          surface: 'var(--color-surface)',
          surfaceLight: 'var(--color-surface-elevated)',
          textMain: 'var(--color-text-primary)',
          textMuted: 'var(--color-text-muted)',
          primary: 'var(--color-gold-base)',
          hover: 'var(--color-gold-dark)',
        },
        canvas: 'var(--color-background)',
        brandGold: {
          50: '#FFFDF0',
          100: '#FEF08A',
          200: '#FDE047',
          300: '#FACC15',
          400: '#EAB308',
          500: '#D97706',
          600: '#B45309',
          700: '#92400E',
        },
        content: {
          primary: 'var(--color-text-primary)',
          secondary: 'var(--color-text-secondary)',
          muted: 'var(--color-text-muted)',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        display: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      backgroundImage: {
        'shining-gold-horizontal': 'linear-gradient(to right, #EAB308 0%, #FEF08A 30%, #FACC15 50%, #FEF08A 70%, #D97706 100%)',
        'shining-gold-vertical': 'linear-gradient(to bottom, #FEF08A 0%, #FACC15 40%, #EAB308 70%, #B45309 100%)',
        'shining-gold-diagonal': 'linear-gradient(135deg, #D97706 0%, #FACC15 30%, #FEF08A 50%, #EAB308 70%, #B45309 100%)',
        'dark-gold-glow': 'radial-gradient(ellipse at center, rgba(250,204,21,0.2) 0%, rgba(5,5,5,0) 70%)',
        'light-gold-glow': 'radial-gradient(ellipse at center, rgba(234,179,8,0.15) 0%, rgba(248,250,252,0) 70%)',
        'gold-metallic-shine': 'linear-gradient(110deg, #df9f28 0%, #ffd778 22%, #fffde6 38%, #f3b73e 50%, #c9820c 75%, #ffd87a 90%, #df9f28 100%)',
        'gold-text-shine': 'linear-gradient(135deg, #965b00 0%, #d48806 20%, #faad14 38%, #ffe58f 52%, #d48806 70%, #874d00 100%)',
        'gold-header-shine': 'linear-gradient(90deg, #b37408 0%, #e09b19 25%, #fff4b8 50%, #e09b19 75%, #9e6402 100%)',
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'modal': 'var(--shadow-modal)',
        'gold-glow': '0 0 25px var(--color-gold-glow)',
      },
      backdropBlur: {
        'xl': '24px',
      },
      borderRadius: {
        DEFAULT: '10px',
        radius: '10px',
        lg: '10px',
        md: '8px',
        sm: '6px',
      }
    },
  },
  plugins: [],
}
