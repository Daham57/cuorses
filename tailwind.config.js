/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'cairo': ['Cairo', 'sans-serif'],
        'amiri': ['Amiri', 'serif'],
      },
      colors: {
        'islamic': {
          'primary': '#0e4d3c',
          'light': '#3C5F51',
          'golden': '#C6953E',
          'white': '#FFFFFF',
          'gray-light': '#F5F5F5',
          'dark': '#222222',
        }
      },
      backgroundImage: {
        'islamic-pattern': "url('https://images.pexels.com/photos/8154192/pexels-photo-8154192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1')",
      }
    },
  },
  plugins: [],
};