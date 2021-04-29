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
      sm: '16px',
      base: '18px',
      l: '20px',
      xl: '24px',
      '2xl': '32px',
      '3xl': '36px'
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
