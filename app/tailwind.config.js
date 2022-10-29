/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./layout/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        scale: {
          "0%": { transform: "scale(0.70)" },
          "50%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.70)" },
        },
      },
      animation: {
        scale: "scale 3s linear infinite",
      },
      backgroundImage: {
        'login-background': "url('/images/login/login-background.png')",
      },
      colors: {
        'primary': '#00A0B4',
        'secondary': '#87B925',
        'threedary': '#133B62',
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
