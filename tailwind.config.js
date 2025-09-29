/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'title': ['Cinzel', 'serif'],
        'medieval': ['Uncial Antiqua', 'cursive'],
        'narrative': ['Crimson Text', 'serif'],
        'ui': ['system-ui', 'sans-serif'],
      },
      colors: {
        // Couleurs tirées de ton illustration
        fire: {
          50: '#fef3f2',
          100: '#fee4e2',
          500: '#f97316',  // Orange des flammes
          700: '#ea580c',
          900: '#9a3412'
        },
        smoke: {
          100: '#f3f4f6',
          300: '#9ca3af',
          600: '#4b5563',
          800: '#1f2937'   // Fumée sombre
        },
        village: {
          100: '#fef7ed',
          300: '#fdba74',
          600: '#d97706',  // Toits oranges
          800: '#92400e'
        },
        lake: {
          100: '#dbeafe',
          400: '#60a5fa',  // Bleu du lac
          600: '#2563eb',
          800: '#1e40af'
        },
        amber: {
          150: '#fef3c7',
          250: '#fde68a',
        }
      },
      animation: {
        'bounce-gentle': 'bounce-gentle 2s infinite',
        'fade-in-up': 'fade-in-up 0.8s ease-out',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        }
      }
    },
  },
  plugins: [],
}
