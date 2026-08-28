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
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554',
        },
        navy: {
          800: '#0f172a',
          900: '#0b1120',
          950: '#060a14',
        },
        sge: {
          red: '#f61919',
          darkRed: '#d82322',
          blue: '#0d87e9',
          gold: '#f0b837',
          green: '#1eb899',
        }
      },
      fontFamily: {
        sans: ['Prompt', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['Kanit', 'Prompt', 'sans-serif'],
        display: ['Kanit', 'Plus Jakarta Sans', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 10px 30px -5px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 20px 40px -5px rgba(37, 99, 235, 0.15)',
        'browser': '0 25px 60px -15px rgba(15, 23, 42, 0.12)',
      }
    },
  },
  plugins: [],
}
