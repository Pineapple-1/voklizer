/** @type {import('tailwindcss').Config} */
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        lexend: ["Lexend", ...fontFamily.sans],
      },
      colors: {
       'purple':'#8532D8',
       'gray':'#F5F5F5'
      },
      fontSize: {
        p1: [
          "14px",
          {
            lineHeight: "18px", 
          },
        ],
      },
    },
  },
  plugins: [],
};
