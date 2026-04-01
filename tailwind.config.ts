import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "#050816",
        foreground: "#f4f4f5",
        accent: {
          DEFAULT: "#38bdf8",
          soft: "#0ea5e9",
          subtle: "#082f49"
        },
        muted: "#71717a",
        card: "#020617",
        border: "#1e293b"
      },
      fontFamily: {
        sans: ["system-ui", "ui-sans-serif", "Inter", "sans-serif"]
      },
      boxShadow: {
        "glow-accent": "0 0 40px rgba(56, 189, 248, 0.35)"
      }
    }
  },
  plugins: []
};

export default config;

