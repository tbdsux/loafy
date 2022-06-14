const colors = require('tailwindcss/colors');
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  mode: 'jit',
  content: [
    './src/pages/**/*.tsx',
    './src/components/**/*.tsx',
    './src/modules/**/*.tsx',
    './src/layouts/**/*.tsx'
  ],
  theme: {
    colors: {
      iris: '#454ADE',
      spaceCadet: '#1B1F3B',
      mediumOrchid: '#B14AED',
      frenchMauve: '#C874D9',
      cameoPink: '#E1BBC9',
      ...colors
    },

    fontFamily: {
      sans: ['"Karla"', ...defaultTheme.fontFamily.sans]
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: [require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')]
};
