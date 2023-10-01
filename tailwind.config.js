/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      boxShadow: {
        navbar: "0px 0px 15px 0px rgba(0,0,0,0.15)",
        formShadow: "0px 5px 10px 0px rgba(0, 0, 0, 0.1)",
      },
    },
    screens: {
      ss: "360px",
      xs: "500px",
      sm: "650px",
      md: "960px",
      lg: "1250px",
      xl: "1550px",
    },
  },
  plugins: [],
};
