/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "Bright-Blue": "hsl(220, 98%, 61%)",

        /* Light theme */
        "Very-Light-Gray": "hsl(0, 0%, 98%)",
        "Very-Light-Grayish-Blue": "hsl(236, 33%, 92%)",
        "Light-Grayish-Blue-Light": "hsl(233, 11%, 84%)",
        "Dark-Grayish-Blue-Light": "hsl(236, 9%, 61%)",
        "Very-Dark-Grayish-Blue-Light": "hsl(235, 19%, 35%)",

        /* Dark theme */
        "Very-Dark-Blue": "hsl(235, 21%, 11%)",
        "Very-Dark-Desaturated-Blue": "hsl(235, 24%, 19%)",
        "Light-Grayish-Blue-Dark": "hsl(234, 39%, 85%)",
        "Light-Grayish-Blue-hover": "hsl(236, 33%, 92%)",
        "Dark-Grayish-Blue-Dark": "hsl(234, 11%, 52%)",
        "Very-Dark-Grayish-Blue-Dark-1": "hsl(233, 14%, 35%)",
        "Very-Dark-Grayish-Blue-Dark-2": "hsl(237, 14%, 26%)",
      },
    },
  },
  plugins: [],
};
