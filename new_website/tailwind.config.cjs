module.exports = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx,html}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#0b1220',      // deep neutral for text/background
        slate: {
          600: '#475569',
          700: '#334155',
          800: '#0f172a',
          900: '#071024'
        },
        accent: {
          50: '#fff8f3',
          100: '#fff1e6',
          200: '#ffd8b0',
          400: '#ff9f43',
          500: '#ff7a18',
          600: '#ff5c00'
        },
        orange: {
          200: '#ffcc9a',
          300: '#ffb87a',
          400: '#ff9f43',
          500: '#ff7a18',
          600: '#ff5c00',
          900: '#4d2200'
        },
        warm: '#ffb86b',
        neutral: '#f8fafc'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui']
      },
      screens: {
        // Breakpoints personnalisés pour un meilleur responsive
        'xs': '475px',    // Très petits téléphones
        'sm': '640px',    // Téléphones en paysage / petites tablettes
        'md': '768px',    // Tablettes
        'lg': '1024px',   // Laptops
        'xl': '1280px',   // Grands écrans
        '2xl': '1536px',  // Très grands écrans
      },
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
          sm: '1.5rem',
          md: '2rem',
          lg: '2.5rem',
          xl: '3rem',
        }
      }
    }
  },
  plugins: []
}
