/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        'sans': ['Manrope', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'display': ['"Darker Grotesque"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'mono': ['Fira Code', 'ui-monospace', 'SFMono-Regular', 'monospace'],
      },
      colors: {
        'ind-accent': '#E8A035',
        'ind-accent-dim': '#B87A28',
        'ind-text': '#E8E6E3',
        'ind-text-dim': '#B5B3B0',
        'ind-surface': '#1A1A1C',
        'ind-surface-alt': '#141416',
        'ind-border': '#2A2A2E',
      },
      fontSize: {
        'hero': ['clamp(3rem, 8vw, 7rem)', { lineHeight: '0.9', fontWeight: '900' }],
        'section': ['clamp(2rem, 4vw, 3.5rem)', { lineHeight: '1.1', fontWeight: '700' }],
      },
      letterSpacing: {
        'eyebrow': '0.2em',
      },
      animation: {
        'glow-pulse': 'glow-pulse 2s ease-in-out infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 10px rgba(232,160,53,0.1)' },
          '50%': { boxShadow: '0 0 20px rgba(232,160,53,0.25)' },
        },
        'scanline': {
          '0%': { backgroundPosition: '0 0' },
          '100%': { backgroundPosition: '0 100%' },
        },
      },
      backgroundImage: {
        'dot-grid': 'radial-gradient(circle, rgba(232,160,53,0.08) 1px, transparent 1px)',
        'noise': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
      backgroundSize: {
        'dot-grid': '24px 24px',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
