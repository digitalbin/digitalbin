const defaultTheme = require('tailwindcss/defaultTheme');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['src/styles/global.css'],
    // content: ['src'],
    theme: {
        extend: {
            fontFamily: {
                mono: ['Ubuntu Mono', ...defaultTheme.fontFamily.mono],
            },
        },
    },
    plugins: [],
};
