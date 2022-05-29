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
      first: '#621e2b',
      second: '#802835',
      third: '#ae3c43',
      fourth: '#f05b57',
      fifth: '#ff907c',
      ...colors
    },

    fontFamily: {
      sans: ['"Work Sans"', ...defaultTheme.fontFamily.sans]
    },
    extend: {}
  },
  variants: {
    extend: {}
  },
  plugins: []
};
