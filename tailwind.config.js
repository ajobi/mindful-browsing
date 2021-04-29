// TODO: fix purging
module.exports = {
  purge: [
    './vue/**/*.js',
    './vue/**/*.vue'
  ],
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
    fontSize: {
      xxs: '12px',
      xs: '14px',
      base: '16px',
      l: '18px',
      xl: '20px',
      '2xl': '24px',
      '3xl': '32px',
      '4xl': '36px'
    },
    fontWeight: {
      thin: 200,
      light: 300,
      normal: 400,
      medium: 500
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
