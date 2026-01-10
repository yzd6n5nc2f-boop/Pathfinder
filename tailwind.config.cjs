/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"] ,
  theme: {
    extend: {
      colors: {
        ink: "#0f172a",
        slate: "#64748b",
        calm: "#f8fafc",
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
        card: "0 10px 30px rgba(15, 23, 42, 0.08)"
      }
    }
  },
  plugins: []
};
