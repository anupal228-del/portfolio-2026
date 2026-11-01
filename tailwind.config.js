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
        canvas: {
          light: '#F4F3EE',
          dark: '#0C0D0E',
          card: '#FFFFFF',
          cardDark: '#141518',
        },
        editorial: {
          black: '#121316',
          muted: '#6B6E77',
          border: '#E3E1D9',
          borderDark: '#26282E',
          accent: '#2563EB',
        }
      },
      fontFamily: {
        display: ['"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: {
        tighter: '-0.05em',
        tight: '-0.03em',
        widest: '0.15em',
      },
      animation: {
        'marquee': 'marquee 25s linear infinite',
        'pulse-subtle': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        }
      }
    },
  },
  plugins: [],
}
