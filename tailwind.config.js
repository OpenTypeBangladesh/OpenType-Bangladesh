/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          green: {
            50: '#eefaf5',
            100: '#d6f2e6',
            200: '#b0e4d0',
            300: '#7ed1b4',
            400: '#47b895',
            500: '#1f9d7c',
            600: '#006a4e',
            700: '#005840',
            800: '#044634',
            900: '#06382b',
          },
          red: {
            50: '#fef2f3',
            100: '#fde3e6',
            200: '#fbccd2',
            300: '#f7a7b1',
            400: '#f27181',
            500: '#ea4257',
            600: '#f42a41',
            700: '#cf1f35',
            800: '#ac1e31',
            900: '#8f1e2d',
          },
        },
      },
      fontFamily: {
        bangla: ['"Noto Sans Bengali"', '"Hind Siliguri"', 'sans-serif'],
        mono: ['"JetBrains Mono"', 'monospace'],
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(14px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        'fade-up': 'fade-up 0.6s ease-out both',
        float: 'float 5s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
