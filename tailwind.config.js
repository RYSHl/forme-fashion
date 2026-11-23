/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Helvetica Neue',
          '-apple-system',
          'BlinkMacSystemFont',
          '"Segoe UI"',
          'Roboto',
          'sans-serif'
        ],
        serif: [
          'Didot',
          '"Bodoni MT"',
          '"Cinzel"',
          'serif'
        ]
      },
      colors: {
        brand: {
          bg: '#FFFFFF',
          soft: '#F9F9F8',
          subtle: '#F4F4F3',
          border: '#E5E5E5',
          borderDark: '#CCCCCC',
          text: '#111111',
          muted: '#666666',
          lightMuted: '#888888',
          accent: '#8C1D40', // Refined deep berry for sales/accents
        }
      },
      letterSpacing: {
        widest: '.2em',
        ultra: '.28em'
      }
    },
  },
  plugins: [],
}
