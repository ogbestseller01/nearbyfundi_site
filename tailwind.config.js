/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Deep Background Navy (logo background)
        navy: {
          50:  "#eaf1fb",
          100: "#cfe0f5",
          200: "#9fc0eb",
          300: "#001533",
          400: "#001533",
          500: "#001533",
          600: "#0a3670",
          700: "#001d45", // Primary
          800: "#001533",
          900: "#000c1f",
          950: "#00050f",
        },
        // Bright Blue (logo ring)
        bolt: {
          50:  "#f0f7ff",
          100: "#e0effe",
          200: "#bae0fd",
          300: "#001533",
          400: "#001533",
          500: "#001533", // Primary accent
          600: "#001533",
          700: "#001533",
          800: "#074b83",
          900: "#0c3f6e",
          950: "#061f37",
        },
        // Circuit Gold / Yellow (logo circuitry)
        gold: {
          50:  "#fff9e6",
          100: "#ffedb3",
          200: "#ffe180",
          300: "#ffd54d",
          400: "#ffc61f",
          500: "#f5c30e", // Primary
          600: "#d9a300",
          700: "#b38200",
          800: "#8c6600",
          900: "#5c4300",
          950: "#3d2c00",
        },
      },
      boxShadow: {
        soft: "0 4px 24px rgba(0, 29, 69, 0.07)",
        "soft-dark": "0 4px 24px rgba(0, 0, 0, 0.35)",
      },
    },
  },
  plugins: [],
};