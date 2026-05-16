/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        'brand-blue': '#1A3BBF',
        'brand-blue-light': '#2E55E0',
        'brand-blue-dark': '#0D1F6B',
        'brand-pink': '#E8155A',
        'brand-pink-light': '#FF2D72',
        'bg-dark': '#05091A',
        'bg-dark2': '#080E2A',
      },
      fontFamily: {
        sans:     ['"DM Sans"', 'sans-serif'],
        heading:  ['Urbanist', 'sans-serif'],
        syne:     ['Urbanist', 'sans-serif'],
        dm:       ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
