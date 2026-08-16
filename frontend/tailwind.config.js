/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx}',
  ],
  theme: {
    extend: {
      colors: {
        // Wine & Blush — locked palette (PLANNING.md). Every color on the site must trace
        // back to one of these six. Tints = these hexes at partial opacity, never a new hex.
        background: '#FBF1EC',
        surface: '#FFFBF9',
        wine: '#8E4459',
        rose: '#D98E9B',
        gold: '#C9A25E',
        ink: '#3B2430',
      },
      fontFamily: {
        display: ['"Fraunces Variable"', 'serif'],
        sans: ['"Work Sans Variable"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
