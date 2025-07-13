module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        blue: {
          600: "#2563eb"
        },
        teal: {
          400: "#38bdf8"
        },
        gray: {
          100: "#f1f5f9"
        }
      },
      fontFamily: {
        sans: ['Inter', 'Open Sans', 'sans-serif']
      }
    }
  },
  plugins: []
};
