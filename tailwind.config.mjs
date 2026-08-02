/** @type {import('tailwindcss').Config} */

// NOTE: never use a `DEFAULT` key here. Tailwind flattens it to the bare color
// name (`green: { DEFAULT }` emits `.text-green`, NOT `.text-green-DEFAULT`),
// which silently produces classes that do nothing. Every scale below is
// explicitly keyed.

export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', 'ui-monospace', 'SFMono-Regular', 'monospace'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      colors: {
        canvas: '#0a0c0e',

        // Raised surfaces. 1 is barely off-canvas, 3 is a distinct pane.
        surface: {
          1: '#0f1216',
          2: '#141920',
          3: '#1a2028',
        },

        // Text ramp, brightest to dimmest.
        // 0 headings · 1 body · 2 labels/meta · 3 decorative chrome only.
        ink: {
          0: '#f1f5f9',
          1: '#a8b4c4',
          2: '#7d8998',
          3: '#6b7585',
        },

        // Neutral hairlines. Hue is reserved for state (hover/focus/active),
        // never for resting borders.
        line: {
          1: 'rgba(255,255,255,0.08)',
          2: 'rgba(255,255,255,0.14)',
          3: 'rgba(255,255,255,0.22)',
        },

        // Syntax roles. Each color has exactly one job — see README.
        // green  prompts, status, the single CTA
        // cyan   links, paths, filenames
        // amber  numerals and metrics
        // violet types, proper nouns, product names
        // red    errors
        term: {
          green: '#4ade80',
          cyan: '#22d3ee',
          amber: '#fbbf24',
          violet: '#a78bfa',
          red: '#f87171',
        },
      },
    },
  },
  plugins: [],
};
