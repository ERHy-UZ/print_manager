import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        egg: {
          100: '#FFFFFF',
          200: '#FFFDFB',
          300: '#FFFCF7',
          400: '#FFFBF3',
          500: '#FFFAF0',
          600: '#FFF8E8',
          700: '#FFF6E5',
          800: '#FFF5E1',
          900: '#FFF4DD'
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
