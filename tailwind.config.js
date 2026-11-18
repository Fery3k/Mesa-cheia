/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ivory: {
          50: '#FDFBF9',
          100: '#FAF8F5',
          200: '#F4EFEA',
          300: '#ECE5DC',
          400: '#DDD5C7',
        },
        brand: {
          50: '#f0fdf4',
          100: '#dcfce7',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065F46',
          900: '#064E3B',
          dark: '#0B201A',
        },
        amber: {
          500: '#F59E0B',
          600: '#D97706',
          700: '#B45309',
        },
        warm: {
          border: '#E8E2D5',
          borderSubtle: '#F0ECE4',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Syne"', 'sans-serif'],
      },
      boxShadow: {
        'bento': '0 10px 30px -5px rgba(28, 25, 23, 0.04), 0 2px 6px -1px rgba(28, 25, 23, 0.02)',
        'bento-hover': '0 25px 50px -12px rgba(6, 78, 59, 0.12), 0 10px 20px -5px rgba(28, 25, 23, 0.06)',
        'floating': '0 20px 40px -10px rgba(11, 32, 26, 0.15)',
        'glow-emerald': '0 0 30px -5px rgba(5, 150, 105, 0.3)',
      },
      animation: {
        'marquee': 'marquee 35s linear infinite',
        'marquee-reverse': 'marquee-reverse 35s linear infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.02)' },
        }
      }
    },
  },
  plugins: [],
}
