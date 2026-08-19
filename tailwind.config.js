/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Bespoke Rose Gold & Dusty Terracotta Palette extracted directly from logo.png
        rose: {
          50: '#fdf8f6',
          100: '#faeee9',
          200: '#f4ded6',
          300: '#ebc4b7',
          400: '#dca191',
          500: '#c77d6e',
          600: '#b36454',
          700: '#9c4f40',
          800: '#814236',
          900: '#6c3a31',
          950: '#3b1d17',
        },
        // Warm Champagne & Metallic Gold Leaf from the circular border & botanical leaves in logo.png
        champagne: {
          50: '#faf7f2',
          100: '#f3ece0',
          200: '#e7d8bf',
          300: '#d8bf9a',
          400: '#caa075',
          500: '#b88a59',
          600: '#a27443',
          700: '#835a34',
          800: '#6a482d',
          900: '#573b26',
        }
      },
      fontFamily: {
        sans: ['"Noto Sans Ethiopic"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif Ethiopic"', '"Playfair Display"', 'Georgia', 'serif'],
      }
    },
  },
  plugins: [],
}

