const defaultTheme = require('tailwindcss/defaultTheme')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['src'],
  theme: {
    extend: {
      fontFamily: {
        // 'mono': ['FA Sysfont C', ...defaultTheme.fontFamily.mono]
        // 'mono': ['fixedsys', ...defaultTheme.fontFamily.mono]
        'mono': ['Ubuntu Mono', ...defaultTheme.fontFamily.mono]
      }
    },
  },
  plugins: [],
}
