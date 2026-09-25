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
        spec: {
          primary: '#E01E37',
          secondary: '#B81A2C',
          tertiary: '#C8102E',
          neutral: '#121417',
        },
        brand: {
          red: '#E01E37',
          'red-hover': '#B81A2C',
          'red-tertiary': '#C8102E',
          'red-tint': 'var(--accent-red-tint)',
          'red-border': 'var(--accent-red-border)',
          whatsapp: '#25D366',
          'whatsapp-hover': '#20BD5A',
          emerald: '#10B981',
          amber: '#F59E0B',
        },
      },
      fontFamily: {
        display: ['Plus Jakarta Sans', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'card': 'var(--shadow-card)',
        'modal': 'var(--shadow-modal)',
        'ambient-red': 'var(--shadow-ambient-glow)',
      },
      backdropBlur: {
        'xl': '24px',
      }
    },
  },
  plugins: [],
}
