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
        primary: '#6366f1', // indigo-500
        'primary-light': '#818cf8', // indigo-400
        'primary-dark': '#4f46e5', // indigo-600
        secondary: '#ec4899', // pink-500
        'secondary-light': '#f472b6', // pink-400
        'secondary-dark': '#db2777', // pink-600
        accent: '#14b8a6', // teal-500
        'dark-bg': '#0f172a', // slate-900
        'dark-card': '#1e293b', // slate-800
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
      backgroundImage: {
        'grid-pattern': 'linear-gradient(to right, #6366f120 1px, transparent 1px), linear-gradient(to bottom, #6366f120 1px, transparent 1px)',
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      backgroundSize: {
        'grid-size': '40px 40px',
      },
    },
  },
  plugins: [
    // Remove the @tailwindcss/line-clamp plugin as it's now part of Tailwind core
  ],
}

