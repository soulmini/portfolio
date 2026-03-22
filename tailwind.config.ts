import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        mono: ['"JetBrains Mono"', '"Fira Code"', 'Consolas', 'monospace'],
      },
      colors: {
        t: {
          bg: '#0c0c0c',
          surface: '#111111',
          green: '#39ff14',
          'green-dim': '#22863a',
          yellow: '#f0c040',
          red: '#ff4f4f',
          blue: '#79c0ff',
          purple: '#c792ea',
          cyan: '#80cbc4',
          white: '#e2e8f0',
          gray: '#6b7280',
          border: '#2a2a2a',
        },
      },
      animation: {
        blink: 'blink 1s step-end infinite',
        scanline: 'scanline 6s linear infinite',
        'power-on': 'power-on 0.4s ease-out forwards',
        'fade-in': 'fade-in 0.3s ease-in forwards',
        'slide-up': 'slide-up 0.4s ease-out forwards',
        glow: 'glow 2s ease-in-out infinite alternate',
        'crt-flicker': 'crt-flicker 12s step-end infinite',
        'error-shake': 'error-shake 0.35s ease forwards',
        'error-flash': 'error-flash 0.4s ease forwards',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { top: '-8px' },
          '100%': { top: '100%' },
        },
        'crt-flicker': {
          '0%, 88%, 100%': { opacity: '1', filter: 'brightness(1)' },
          '89%':  { opacity: '0.94', filter: 'brightness(0.92)' },
          '90%':  { opacity: '1',    filter: 'brightness(1)' },
          '91%':  { opacity: '0.97', filter: 'brightness(0.96)' },
          '92%':  { opacity: '1',    filter: 'brightness(1)' },
        },
        'error-shake': {
          '0%':   { transform: 'translateX(0)' },
          '20%':  { transform: 'translateX(-5px)' },
          '40%':  { transform: 'translateX(5px)' },
          '60%':  { transform: 'translateX(-3px)' },
          '80%':  { transform: 'translateX(3px)' },
          '100%': { transform: 'translateX(0)' },
        },
        'error-flash': {
          '0%':   { boxShadow: 'inset 0 0 0px rgba(255,79,79,0)' },
          '30%':  { boxShadow: 'inset 0 0 30px rgba(255,79,79,0.12)' },
          '100%': { boxShadow: 'inset 0 0 0px rgba(255,79,79,0)' },
        },
        'power-on': {
          '0%': { opacity: '0', transform: 'scaleY(0.005) scaleX(0.8)' },
          '20%': { transform: 'scaleY(0.005) scaleX(1)' },
          '40%': { opacity: '0.8', transform: 'scaleY(1) scaleX(1)' },
          '100%': { opacity: '1', transform: 'scaleY(1) scaleX(1)' },
        },
        'fade-in': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'slide-up': {
          from: { opacity: '0', transform: 'translateY(8px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        glow: {
          from: { textShadow: '0 0 4px #39ff14, 0 0 8px #39ff14' },
          to: { textShadow: '0 0 8px #39ff14, 0 0 20px #39ff14, 0 0 40px #39ff1440' },
        },
      },
    },
  },
  plugins: [],
};

export default config;
