/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        display: ['Syne', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#0a0c0e',
          2: '#10141a',
          3: '#151b23',
          surface: '#1a2030',
        },
        green: {
          DEFAULT: '#4ade80',
          dim: '#22c55e',
        },
        muted: '#6b7a8d',
        ink: {
          DEFAULT: '#e2e8f0',
          2: '#94a3b8',
        },
        amber: '#fbbf24',
      },
    },
  },
  plugins: [],
};
