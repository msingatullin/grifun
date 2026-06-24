import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: "#0f172a",
          secondary: "#020617",
          tertiary: "#1e293b",
        },
        foreground: {
          DEFAULT: "#ffffff",
        },
        accent: {
          blue: "#3b82f6",
          indigo: "#6366f1",
          purple: "#8b5cf6",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.1)",
          light: "rgba(255, 255, 255, 0.05)",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "professional-gradient": "linear-gradient(135deg, #3b82f6 0%, #6366f1 50%, #8b5cf6 100%)",
      },
      animation: {
        "fade-in-up": "fadeInUp 0.8s ease-out",
        "fade-in": "fadeIn 0.6s ease-out",
      },
      keyframes: {
        fadeInUp: {
          "0%": {
            opacity: "0",
            transform: "translateY(30px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        fadeIn: {
          "0%": {
            opacity: "0",
          },
          "100%": {
            opacity: "1",
          },
        },
      },
    },
  },
  plugins: [],
};
export default config;

