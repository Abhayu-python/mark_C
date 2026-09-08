/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        toon: {
          sky: '#1E88E5',
          skyLight: '#64B5F6',
          skyDeep: '#0D47A1',
          sun: '#FFB300',
          sunWarm: '#FFA000',
          gold: '#FFD54F',
          sunsetOrange: '#FF7043',
          sunsetPink: '#EC407A',
          grass: '#43A047',
          grassLight: '#81C784',
          grassDeep: '#1B5E20',
          wood: '#6D4C41',
          stone: '#546E7A',
          cream: '#FFF8E1',
          paper: '#FFFDE7',
          nightSky: '#0B1120',
          nightDeep: '#050814',
          glowCyan: '#00E5FF',
          glowYellow: '#FFEA00',
          glowPink: '#FF2A85',
          darkSurface: '#0F172A',
          darkCard: 'rgba(30, 41, 59, 0.75)',
          glassBorder: 'rgba(255, 255, 255, 0.18)',
        }
      },
      fontFamily: {
        display: ['"Outfit"', 'sans-serif'],
        cinematic: ['"Cinzel"', 'serif'],
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
      },
      animation: {
        'float-slow': 'float 6s ease-in-out infinite',
        'float-medium': 'float 4s ease-in-out infinite',
        'float-fast': 'float 2.5s ease-in-out infinite',
        'cloud-move-slow': 'cloudMove 45s linear infinite',
        'cloud-move-medium': 'cloudMove 30s linear infinite',
        'cloud-move-fast': 'cloudMove 18s linear infinite',
        'sun-pulse': 'sunPulse 8s ease-in-out infinite',
        'pulse-glow': 'pulseGlow 3s ease-in-out infinite',
        'shimmer': 'shimmer 2.5s infinite',
        'sway': 'sway 4s ease-in-out infinite',
        'soundwave': 'soundwave 1.2s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        sway: {
          '0%, 100%': { transform: 'rotate(0deg)' },
          '50%': { transform: 'rotate(2.5deg)' },
        },
        cloudMove: {
          '0%': { transform: 'translateX(-10%)' },
          '100%': { transform: 'translateX(110vw)' },
        },
        sunPulse: {
          '0%, 100%': { transform: 'scale(1)', opacity: '0.85' },
          '50%': { transform: 'scale(1.1)', opacity: '1' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.98)' },
          '50%': { opacity: '0.8', transform: 'scale(1.02)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        soundwave: {
          '0%, 100%': { height: '8px' },
          '50%': { height: '36px' },
        }
      },
      boxShadow: {
        'glow-sun': '0 0 50px rgba(255, 179, 0, 0.45)',
        'glow-cyan': '0 0 40px rgba(0, 229, 255, 0.4)',
        'glow-gold': '0 0 40px rgba(255, 213, 79, 0.45)',
        'glow-card': '0 10px 35px -5px rgba(0, 0, 0, 0.5), 0 0 20px 2px rgba(255, 179, 0, 0.15)',
        'glass-capsule': '0 15px 35px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.25)',
      }
    },
  },
  plugins: [],
}
