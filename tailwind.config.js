/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,jsx,mdx}",
    "./components/**/*.{js,jsx,mdx}",
    "./app/**/*.{js,jsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "var(--color-primary)",
        "primary-foreground": "var(--color-on-primary)",
        secondary: "var(--color-secondary)",
        accent: "var(--color-accent)",
        "accent-soft": "var(--color-accent-soft)",
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        destructive: "var(--color-destructive)",
        ring: "var(--color-ring)",
        // Admin-dashboard-only roles (see globals.css's [data-theme="admin"]
        // block) — additive, unused/undefined outside that scope.
        card: "var(--color-card)",
        "card-foreground": "var(--color-card-foreground)",
        "destructive-soft": "var(--color-destructive-soft)",
        success: "var(--color-success)",
        "success-soft": "var(--color-success-soft)",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "sans-serif"],
        sans: ["var(--font-body)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
