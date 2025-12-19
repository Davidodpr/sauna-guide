import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Luxurious Nordic sauna palette
        sauna: {
          // Rich wood tones
          wood: '#8B4513',
          cedar: '#A0522D',
          birch: '#F5DEB3',

          // Warm atmospheric colors
          steam: '#FAF7F4',
          mist: '#E8E4E1',

          // Heat & ember tones
          heat: '#CD5C5C',
          ember: '#D2691E',
          glow: '#FF8C42',
          copper: '#B87333',

          // Accent warmth
          warm: '#DEB887',
          honey: '#DAA520',
          amber: '#FFBF00',

          // Deep contrast
          dark: '#2C1810',
          charcoal: '#1A0F0A',
          night: '#0D0705',
        },
      },
      fontFamily: {
        display: ['var(--font-display)', 'Georgia', 'serif'],
        body: ['var(--font-body)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'float-delayed': 'float 6s ease-in-out 2s infinite',
        'float-slow': 'float 8s ease-in-out 1s infinite',
        'glow': 'glow 3s ease-in-out infinite',
        'steam': 'steam 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-up-delayed': 'fadeUp 0.8s ease-out 0.2s forwards',
        'scale-in': 'scaleIn 0.6s ease-out forwards',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
        steam: {
          '0%': { opacity: '0', transform: 'translateY(0) scale(1)' },
          '50%': { opacity: '0.3' },
          '100%': { opacity: '0', transform: 'translateY(-100px) scale(1.5)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.9)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'wood-grain': 'repeating-linear-gradient(90deg, transparent, transparent 50px, rgba(139,69,19,0.03) 50px, rgba(139,69,19,0.03) 51px)',
      },
    },
  },
  plugins: [],
}

export default config
