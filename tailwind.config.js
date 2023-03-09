/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/views/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    screens: {
      'sm': '768px',
      'md': '1360px',
      'xl': '1900px',
    },
    backgroundSize: {
      '100': '100% 100%'
    },
    extend: {
      boxShadow: {
        'tooltipShadow': '0px 10px 24px rgba(0, 0, 0, 0.1)'
      }
    },
  },
  plugins: [],
}
