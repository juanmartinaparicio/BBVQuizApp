/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./presentation/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      fontFamily: {
        "work-black": ["WorkSans-Black", "sans-serif"],
        "work-light": ["WorkSans-Ligth", "sans-serif"],
        "work-medium": ["WorkSans-Medium", "sans-serif"],
      },
      colors: {
        primary: "#49129c",
        secondary: {
          DEFAULT: "#b40086",
          100: "#c51297",
          200: "#831266",
        },
        tertiary: "#ef2967",
      },
    },
  },
  plugins: [],
};
