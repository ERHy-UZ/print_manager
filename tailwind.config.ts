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
        },
        pantone: {
          465: '#BC955C',
          468: '#E3D0A8',
          626: '#235B4E',
          627: '#10312B',
          7420: '#9F2241',
          7421: '#691C32'
        },
        pantone_coolgray: {
          7: '#98989A',
          424: '#6F7271'
        }
      }
    },
  },
  plugins: [],
} satisfies Config;
