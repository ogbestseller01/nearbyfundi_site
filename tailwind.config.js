/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bolt: {
          50: "#eaf1fb",
          100: "#cfe0f5",
          200: "#9fc0eb",
          300: "#6a9bd9",
          400: "#3a72b8",
          500: "#164f92",
          600: "#0a3670",
          700: "#001d45",
          800: "#001533",
          900: "#000c1f",
          950: "#00050f"
        },
        gold: {
          50: "#fff9e6",
          100: "#ffedb3",
          200: "#ffe180",
          300: "#ffd54d",
          400: "#ffc61f",
          500: "#f5c30e",
          600: "#d9a300",
          700: "#b38200",
          800: "#8c6600",
          900: "#5c4300",
          950: "#3d2c00"
        },
        navy: {
          50: "#eaf1fb",
          100: "#cfe0f5",
          200: "#9fc0eb",
          300: "#6a9bd9",
          400: "#3a72b8",
          500: "#164f92",
          600: "#0a3670",
          700: "#001d45",
          800: "#001533",
          900: "#000c1f",
          950: "#00050f"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(0, 13, 40, 0.14)",
        "soft-dark": "0 18px 60px rgba(0, 0, 0, 0.45)",
        glow: "0 0 40px rgba(245, 195, 14, 0.35)"
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "pulse-soft": "pulse-soft 3s ease-in-out infinite"
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" }
        },
        "pulse-soft": {
          "0%, 100%": { opacity: "0.7" },
          "50%": { opacity: "1" }
        }
      }
    }
  },
  plugins: []
};
