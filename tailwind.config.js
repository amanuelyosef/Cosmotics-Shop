/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Noto Sans Ethiopic"', '"Plus Jakarta Sans"', 'system-ui', 'sans-serif'],
        serif: ['"Noto Serif Ethiopic"', '"Playfair Display"', 'Georgia', 'serif'],
      }
    },

  },
  plugins: [],
}
