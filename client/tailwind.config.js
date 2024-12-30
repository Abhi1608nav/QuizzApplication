/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primaryDark: '#fb8500',   // A bold orange
        accentOrange: '#ffb703', // A lighter orange
        deepBlue: '#023047',     // A rich dark blue
        skyBlue: '#219ebc',      // A vibrant blue
        lightBlue: '#8ecae6',    // A softer light blue
        navyBlue: '#14213d',     // A deep navy blue
        lightGray: '#e5e5e5',    // A soft light gray
      },
    },
  },
  plugins: [],
}

