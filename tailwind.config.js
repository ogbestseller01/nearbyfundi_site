/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        bolt: {
          50: "#ecfdf5",
          100: "#d1fae5",
          400: "#34d399",
          500: "#20c997",
          600: "#12b886",
          700: "#0f9f73",
          900: "#064e3b"
        }
      },
      boxShadow: {
        soft: "0 18px 60px rgba(15, 23, 42, 0.10)",
        "soft-dark": "0 18px 60px rgba(0, 0, 0, 0.35)",
        glow: "0 0 40px rgba(32, 201, 151, 0.35)"
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
