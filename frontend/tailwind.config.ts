import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
    './lib/**/*.{js,ts}'
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ['Poppins', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        space: ['Space Grotesk', 'sans-serif']
      },
      colors: {
        surface: '#050816',
        'surface-2': '#0d1336',
        glow: '#5b80ff',
        accent: '#ff2f6d'
      },
      boxShadow: {
        glass: '0 30px 80px rgba(8, 12, 36, 0.25)'
      }
    }
  },
  plugins: [require('@tailwindcss/typography')]
};

export default config;
