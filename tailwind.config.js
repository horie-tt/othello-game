/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      borderWidth: {
        '3': '3px',
      },
      colors: {
        green: {
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
        },
        sky: {
          200: '#bae6fd',
          400: '#38bdf8',
        },
        gray: {
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
        }
      }
    },
  },
  plugins: [],
}