/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cyan: {
          300: '#06B6D4',
          400: '#06B6D4',
          500: '#0891B2',
          600: '#0369A1',
          700: '#0C4A6E',
        },
      },
      animation: {
        'pulse-glow': 'pulse-glow 2s ease-in-out infinite',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { 'text-shadow': '0 0 8px rgba(34, 197, 94, 0.5)' },
          '50%': { 'text-shadow': '0 0 16px rgba(34, 197, 94, 1)' },
        },
      },
    },
  },
  plugins: [],
};
