/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          50: 'hsl(210, 100%, 97%)',
          100: 'hsl(210, 100%, 93%)',
          500: 'hsl(210, 60%, 50%)',
          600: 'hsl(210, 60%, 45%)',
          700: 'hsl(210, 60%, 40%)',
        },
        accent: {
          50: 'hsl(165, 100%, 97%)',
          100: 'hsl(165, 100%, 90%)',
          500: 'hsl(165, 70%, 45%)',
          600: 'hsl(165, 70%, 40%)',
        },
        surface: {
          light: 'hsl(210, 40%, 98%)',
          dark: 'hsl(210, 20%, 12%)',
        },
        background: {
          light: 'hsl(210, 40%, 95%)',
          dark: 'hsl(210, 20%, 8%)',
        },
        text: {
          primary: {
            light: 'hsl(210, 50%, 15%)',
            dark: 'hsl(210, 40%, 95%)',
          },
          secondary: {
            light: 'hsl(210, 40%, 35%)',
            dark: 'hsl(210, 30%, 65%)',
          }
        }
      },
      borderRadius: {
        sm: '6px',
        md: '10px',
        lg: '16px',
        xl: '24px',
      },
      spacing: {
        sm: '8px',
        md: '12px',
        lg: '20px',
        xl: '32px',
      },
      boxShadow: {
        card: '0 4px 6px hsla(210, 50%, 15%, 0.05)',
        modal: '0 8px 24px hsla(210, 50%, 15%, 0.12)',
      },
      animation: {
        'fade-in': 'fadeIn 300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
        'slide-up': 'slideUp 300ms cubic-bezier(0.25, 0.8, 0.25, 1)',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      }
    },
  },
  plugins: [],
}
