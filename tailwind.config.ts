import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0B0B0F",
        primary: {
          DEFAULT: "#7C3AED",
          glow: "rgba(124, 58, 237, 0.5)",
        },
        accent: {
          DEFAULT: "#E50914",
          glow: "rgba(229, 9, 20, 0.5)",
        },
        glass: {
          DEFAULT: "rgba(255, 255, 255, 0.06)",
          border: "rgba(255, 255, 255, 0.1)",
        },
        text: {
          primary: "#FFFFFF",
          muted: "#9CA3AF",
        }
      },
      fontFamily: {
        sans: ["var(--font-inter)", "sans-serif"],
        display: ["var(--font-poppins)", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "slide-up": "slideUp 0.8s ease-out forwards",
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "scroll": "scroll 20s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scroll: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-100%)" },
        }
      },
      spacing: {
        "18": "4.5rem",
        "112": "28rem",
        "128": "32rem",
      },
    },
  },
  plugins: [],
};
export default config;
