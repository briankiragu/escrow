const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Inter',
          'Inter-fallback',
          'Arial',
          ...defaultTheme.fontFamily.sans,
        ],
        mono: [
          'Fira Code',
          'Fira Code-fallback',
          'Arial',
          ...defaultTheme.fontFamily.mono,
        ],
      },
    },
  },
  plugins: [],
};
