import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#FAF6F0',
        beige: '#F1E9DC',
        border: '#E5DBC9',
        ink: '#1E1A15',
        coffee: '#2C1F16',
        coffeeDark: '#1E1611',
        coffeeDarker: '#14100C',
        cocoa: '#3D2A1E',
        cocoaLight: '#6B4A32',
        mud: '#3D342A',
        stone: '#6B6055',
        gold: '#C9A876',
        goldDeep: '#9C7E4F',
      },
      fontFamily: {
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
        story: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
};

export default config;
