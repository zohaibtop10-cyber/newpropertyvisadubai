/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: 'var(--bg-canvas)',
        surface: {
          DEFAULT: 'var(--bg-surface)',
          elevated: 'var(--bg-surface-elevated)',
          hover: 'var(--bg-surface-hover)',
        },
        content: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          muted: 'var(--text-muted)',
        },
        border: {
          subtle: 'var(--border-subtle)',
          strong: 'var(--border-strong)',
        },
        brand: {
          // Core Luxury Golds
          gold: '#D4AF37',         // Primary metallic gold (Buttons, Icons, Active Nav)
          goldLight: '#FDF2CB',    // Pale gold (Text highlights, subtle hover tints)
          goldDark: '#996515',     // Deep gold (Borders, shadows, gradient depth)
          goldMuted: '#C5A059',    // Softer gold (Secondary icons, disabled states)
          
          // Premium Dark Surfaces
          darkBg: '#050505',       // Pitch black (Main DOM body background)
          surface: '#121212',      // Elevated level 1 (Cards, mega-menus, calculator wrapper)
          surfaceLight: '#1E1E1E', // Elevated level 2 (Hover states on cards, inputs)
          
          // Typography
          textMain: '#E2E8F0',     // Slate-200 (Highly readable primary body text)
          textMuted: '#94A3B8',    // Slate-400 (Secondary text, subtitles, time-ago)

          // Legacy mappings
          primary: '#D4AF37',
          hover: '#996515',
        },
      },
      backgroundImage: {
        // Rich metallic gradient for primary Call-to-Action buttons
        'gold-gradient': 'linear-gradient(135deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #FBF5B7 75%, #AA771C 100%)',
        // Subtle hover sweep effect
        'gold-shimmer': 'linear-gradient(90deg, transparent, rgba(212, 175, 55, 0.15), transparent)',
        // Glassmorphism card overlay
        'surface-gradient': 'linear-gradient(180deg, rgba(255,255,255,0.03) 0%, rgba(255,255,255,0) 100%)',
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'modal': 'var(--shadow-modal)',
        'ambient-gold': 'var(--shadow-ambient-glow)',
      },
      backdropBlur: {
        'xl': '24px',
      }
    },
  },
  plugins: [],
}
