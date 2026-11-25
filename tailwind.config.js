/** @type {import('tailwindcss').Config} */
// Compiled at build time (replaces the cdn.tailwindcss.com play script).
export default {
  content: [
    './index.html',
    './*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './src/**/*.{ts,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: '#271789', // Deep Blue
        secondary: '#00f1d4', // Neon Turquoise
        'secondary-dark': '#007a6d', // Dark Teal: 4.8:1 or better on white and slate-50/100
        'secondary-hover': '#00c2ab', // Darker Turquoise for hover
        surface: '#f8fafc', // Slate 50
        highlight: '#ffff00', // Yellow
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
