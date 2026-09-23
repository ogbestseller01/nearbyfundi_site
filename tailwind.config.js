/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Main Background Navy (from your screenshot)
        "brand-dark": {
          DEFAULT: "#001d45", // Matches the solid navy image exactly
          50: "#eaf1fb",
          100: "#cfe0f5",
          200: "#9fc0eb",
          300: "#6a9bd9",
          400: "#3a72b8",
          500: "#164f92",
          600: "#0a3670",
          700: "#001d45", // Primary background
          800: "#001533",
          900: "#000c1f"
        },
        // Circuit Gold Accent
        "brand-gold": {
          DEFAULT: "#ffc61f",
          50: "#fff9e6",
          100: "#ffedb3",
          200: "#ffe180",
          300: "#ffd54d",
          400: "#ffc61f",
          500: "#f5c30e",
          600: "#d9a300",
          700: "#b38200"
        },
        // Bright Blue Accent
        "brand-blue": {
          DEFAULT: "#0c8de9",
          50: "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#7cc5fb",
          400: "#36a9f7",
          500: "#0c8de9",
          600: "#026fc7",
          700: "#0358a1"
        }
      }
    }
  },
  plugins: []
};