/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        app: "var(--color-app-bg)",
        surface: "var(--color-surface)",
        line: "var(--color-line)",
        ink: "var(--color-text)",
        muted: "var(--color-text-muted)",
        brandBlue: {
          start: "var(--color-brand-blue-start)",
          end: "var(--color-brand-blue-end)"
        },
        accentOrange: {
          start: "var(--color-accent-orange-start)",
          end: "var(--color-accent-orange-end)"
        },
        warmNeutral: {
          start: "var(--color-warm-neutral-start)",
          end: "var(--color-warm-neutral-end)"
        },
        brand: {
          50: "#eef5ff",
          100: "#d9e9ff",
          200: "#b3d3ff",
          300: "#84b5ff",
          400: "#5692ff",
          500: "#2f6bff",
          600: "#1e4edb",
          700: "#1a3fba",
          800: "#183392",
          900: "#142c73"
        },
        amber: {
          50: "#fff7ed",
          100: "#ffedd5",
          200: "#fed7aa",
          300: "#fdba74",
          400: "#fb923c",
          500: "#f97316",
          600: "#ea580c",
          700: "#c2410c"
        }
      },
      boxShadow: {
        card: "0 10px 25px rgba(20, 32, 51, 0.1)",
        phone: "0 24px 60px rgba(20, 32, 51, 0.18)"
      },
      borderRadius: {
        device: "30px",
        card: "18px",
        button: "14px"
      }
    }
  },
  plugins: []
};
