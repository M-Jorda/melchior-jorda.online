module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        sea: {
          50: '#f2fbfc',
          100: '#e6f7f9',
          200: '#bfeef2',
          300: '#99e6eb',
          400: '#4fd6dd',
          500: '#00c6cf',
          600: '#00a6ab',
          700: '#0a7a7f',
          800: '#07565a',
          900: '#043f3f'
        },
        trop: {
          50: '#fff9f3',
          100: '#fff2e6',
          200: '#ffd9b8',
          300: '#ffbf89',
          400: '#ffaa54',
          500: '#ff941f',
          600: '#e27300',
          700: '#b75a00',
          800: '#8f4300',
          900: '#6f2f00'
        },
        sand: '#f6ead2',
        coral: '#ff6b6b'
      },
      boxShadow: {
        'soft-lg': '0 10px 30px rgba(3, 102, 127, 0.12)'
      }
    },
  },
  plugins: [],
};
