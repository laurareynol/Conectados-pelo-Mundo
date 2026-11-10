import type { Config } from "tailwindcss";

const withVar = (name: string) => `rgb(var(--${name}) / <alpha-value>)`;

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem", screens: { "2xl": "1240px" } },
    extend: {
      colors: {
        bg: withVar("bg"),
        surface: withVar("surface"),
        "surface-2": withVar("surface-2"),
        border: withVar("border"),
        fg: withVar("fg"),
        muted: withVar("muted"),
        primary: { DEFAULT: withVar("primary"), fg: withVar("primary-fg"), soft: withVar("primary-soft") },
        accent: { DEFAULT: withVar("accent"), fg: withVar("accent-fg"), soft: withVar("accent-soft") },
        sky: { DEFAULT: withVar("sky"), soft: withVar("sky-soft") },
        success: { DEFAULT: withVar("success"), soft: withVar("success-soft") },
        warning: { DEFAULT: withVar("warning"), soft: withVar("warning-soft") },
        danger: { DEFAULT: withVar("danger"), soft: withVar("danger-soft") },
      },
      fontFamily: {
        sans: ["'Inter Variable'", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["'Plus Jakarta Sans Variable'", "'Inter Variable'", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      borderRadius: { xl: "0.875rem", "2xl": "1.25rem" },
      boxShadow: {
        card: "0 1px 2px rgb(15 23 42 / 0.04), 0 4px 16px -4px rgb(15 23 42 / 0.08)",
        lift: "0 2px 4px rgb(15 23 42 / 0.06), 0 12px 32px -8px rgb(15 23 42 / 0.16)",
      },
      keyframes: {
        "fade-in": { from: { opacity: "0", transform: "translateY(4px)" }, to: { opacity: "1", transform: "none" } },
        shimmer: { "100%": { transform: "translateX(100%)" } },
      },
      animation: { "fade-in": "fade-in .25s ease-out both" },
    },
  },
  plugins: [],
};

export default config;
