import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/features/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        obsidian: 'var(--bg-obsidian)',
        graphite: 'var(--bg-graphite)',
        elevated: 'var(--bg-elevated)',
        volt: {
          DEFAULT: 'var(--accent-volt)',
          dim: 'rgba(198, 255, 0, 0.15)',
        },
        ember: {
          DEFAULT: 'var(--accent-ember)',
          dim: 'rgba(255, 91, 31, 0.15)',
        },
        saddle: {
          DEFAULT: 'var(--accent-saddle)',
          dim: 'rgba(176, 122, 74, 0.18)',
        },
        gold: {
          DEFAULT: 'var(--accent-gold)',
          dim: 'rgba(212, 175, 55, 0.18)',
        },
        bone: 'var(--text-bone)',
        muted: 'var(--text-muted)',
        borderSubtle: 'var(--border-subtle)',
      },
      fontFamily: {
        display: ['var(--font-display)', 'sans-serif'],
        sans: ['var(--font-sans)', 'sans-serif'],
        mono: ['var(--font-mono)', 'monospace'],
      },
      boxShadow: {
        volt: '0 0 25px rgba(198, 255, 0, 0.35)',
        ember: '0 0 25px rgba(255, 91, 31, 0.35)',
        gold: '0 0 25px rgba(212, 175, 55, 0.3)',
      },
    },
  },
  plugins: [],
};

export default config;
