import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        frontier: {
          bg: "#faf8f5",
          canvas: "#fffdf7",
          surface: "#ffffff",
          "surface-muted": "#f1f5f9",
          border: "#e2e8f0",
          "border-light": "#f1f5f9",
          ink: "#0f172a",
          "text-primary": "#0f172a",
          "text-secondary": "#475569",
          "text-muted": "#64748b",
          gold: "#eab308",
          "gold-dim": "#ca8a04",
          amber: "#f59e0b",
          teal: "#0d9488",
          slate: "#64748b",
          // Neo-Pop Memecoin Saturated Accents
          cream: "#fffdf7",
          sun: "#fde047",
          yellow: "#facc15",
          tangerine: "#fb923c",
          coral: "#f43f5e",
          mint: "#10b981",
          lavender: "#e9d5ff",
          sky: "#38bdf8",
          violet: "#7c3aed",
        },
        confidence: {
          confirmed: "#22c55e",
          derived: "#f59e0b",
          configured: "#3b82f6",
          unknown: "#6b7280",
          simulated: "#ef4444",
        },
      },
      boxShadow: {
        pop: "4px 4px 0px #0f172a",
        "pop-sm": "2px 2px 0px #0f172a",
        "pop-lg": "6px 6px 0px #0f172a",
        "pop-white": "4px 4px 0px #ffffff",
        "pop-yellow": "4px 4px 0px #facc15",
        "pop-gold": "4px 4px 0px #ca8a04",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "float": "float 3s ease-in-out infinite",
        "float-delayed": "float 3s ease-in-out 1.5s infinite",
        "bounce-subtle": "bounce-subtle 2s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { opacity: "0.6" },
          "100%": { opacity: "1" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-4px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
