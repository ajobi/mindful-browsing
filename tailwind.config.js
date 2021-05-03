/*
  Default configuration:
  https://github.com/tailwindlabs/tailwindcss/blob/master/stubs/defaultConfig.stub.js
 */
// TODO: fix purging
module.exports = {
  purge: [
    './vue/**/*.js',
    './vue/**/*.vue'
  ],
  screens: {},
  darkMode: false,
  theme: {
    colors: {
      primary: {
        100: '#DADAE6',
        200: '#A2A3BF',
        300: '#7F7FA7',
        400: '#6C6D9A',
        500: '#5A5B8E',
        600: '#474881'
      },
      white: '#FFFFFF'
    },
    fontFamily: {
      poppins: ['Poppins', 'sans-serif']
    },
    fontSize: {
      xxs: '12px',
      xs: '14px',
      base: '16px',
      l: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px'
    },
    fontWeight: {
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500
    },
    letterSpacing: {
      tight: '-0.2px',
      normal: '0'
    },
    keyframes: {
      textgrowth: {
        from: {
          transform: 'scale(1)'
        },
        to: {
          transform: 'scale(1.12)'
        }
      },
      emerge: {
        '0%': {
          opacity: 0
        },
        '10%': {
          opacity: 0
        },
        '25%': {
          opacity: 1
        },
        '100%': {
          opacity: 1
        }
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
