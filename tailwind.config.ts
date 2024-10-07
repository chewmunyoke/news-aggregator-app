import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      transitionTimingFunction: {
        bounce: 'cubic-bezier(0.35, 0.12, 0.14, 1.42)',
      },
    },
  },
  plugins: [],
};
export default config;
