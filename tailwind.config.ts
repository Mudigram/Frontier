import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        frontier: {
          bg: "#070a12",
          canvas: "#0b101d",
          surface: "#0f1626",
          "surface-muted": "#131b2e",
          border: "#1e293b",
          "border-light": "#334155",
          ink: "#f8fafc",
          "text-primary": "#f1f5f9",
          "text-secondary": "#94a3b8",
          "text-muted": "#64748b",
          gold: "#d4a853",
          "gold-dim": "#997328",
          amber: "#f59e0b",
          teal: "#14b8a6",
          slate: "#64748b",
          crimson: "#f43f5e",
        },
        confidence: {
          confirmed: "#10b981",
          derived: "#f59e0b",
          configured: "#3b82f6",
          unknown: "#64748b",
          simulated: "#ef4444",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "ui-monospace", "monospace"],
      },
      animation: {
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "shield-pulse": "shield-pulse 1.8s ease-in-out infinite",
        "float": "float 3s ease-in-out infinite",
      },
      keyframes: {
        glow: {
          "0%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
        "shield-pulse": {
          "0%, 100%": { opacity: "0.35", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.03)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
