/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f5f7ff',
          100: '#e8edff',
          200: '#cbd7ff',
          300: '#a5b7ff',
          400: '#7a87ff',
          500: '#5564f7',
          600: '#3f4bd4',
          700: '#333da4',
          800: '#2a336f',
          900: '#232b54',
        },
      },
      boxShadow: {
        soft: '0 20px 60px rgba(17, 24, 39, 0.12)',
      },
    },
  },
  plugins: [],
}

