import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'media',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Inter"', 'sans-serif'],
        satoshi: ['Satoshi', 'sans-serif'],
        inter: ['var(--font-inter)', 'sans-serif'],
        syne: ["var(--font-syne)", 'sans-serif']
      },
      colors: {
        'primary-orange': '#FF5722',
      },
    },
  },
  plugins: [require('@tailwindcss/typography'),],
};

export default config;