/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'jean-brown': '#6f4c3f',
        'jean-gray': '#83786c',
        'jean-light': '#f8f7f2',
        'jean-dark': '#261e1c',
        'jean-olive': '#919187',
        'jean-tan': '#baa48e',
        'jean-beige': '#e5e1d8',
        'jean-lightgray': '#cac8c7',
        'jean-teal': '#276d6d',
      },
      fontFamily: {
        'akira': ['Akira', 'sans-serif'],
        'glacial': ['Glacial Indifference', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
