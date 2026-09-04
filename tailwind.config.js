/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#F4F7F4',
          100: '#E2EBE3',
          200: '#C4D7C6',
          300: '#9CBDA0',
          400: '#6F9D75',
          500: '#1E4D2B', // Primary Natural Green
          600: '#194224',
          700: '#14351D',
          800: '#102A17',
          900: '#0C1E10',
          earth: '#6D4C41', // Earthy Brown
          earthLight: '#8B5A2B',
          cream: '#FAF6EE', // Warm Cream background
          gold: '#C5A059', // Subtle Gold Accent
          goldHover: '#B08B46',
          dark: '#1C241E', // Charcoal dark text
        }
      },
      fontFamily: {
        telugu: ['"Anek Telugu"', 'sans-serif'],
        sans: ['Poppins', 'Inter', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 4px 20px -2px rgba(30, 77, 43, 0.08)',
        'card-hover': '0 12px 30px -4px rgba(30, 77, 43, 0.15)',
        'gold': '0 4px 15px -2px rgba(197, 160, 89, 0.3)',
      }
    },
  },
  plugins: [],
}
