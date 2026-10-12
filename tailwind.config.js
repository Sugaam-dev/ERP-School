/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        pmrg: {
          navy: {
            DEFAULT: '#0B263A',
            50: '#F0F5F9',
            100: '#DDE7F0',
            200: '#B6CEE0',
            300: '#85ADC9',
            400: '#5289B0',
            500: '#2E6994',
            600: '#1E4E72',
            700: '#153954',
            800: '#0F2C42',
            900: '#0B263A',
            950: '#061622',
          },
          teal: {
            DEFAULT: '#0D887E',
            50: '#EDFAF8',
            100: '#D2F4EE',
            200: '#A9E8DE',
            300: '#73D5C7',
            400: '#3DBCAA',
            500: '#0D887E',
            600: '#0A7068',
            700: '#095954',
            800: '#084844',
            900: '#073D39',
          },
          mint: {
            DEFAULT: '#79D4BD',
            50: '#F5FCFA',
            100: '#E7F9F4',
            200: '#CFF3E9',
            300: '#A9E8D8',
            400: '#79D4BD',
            500: '#4EBDA1',
            600: '#359E84',
            700: '#2C7E6A',
          },
          bg: '#F5F8FA',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
