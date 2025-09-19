export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        float: {
          '0%': { transform: 'translateY(0) rotate(0deg)', opacity: '0' },
          '8%': { opacity: '1' },
          '100%': { transform: 'translateY(-250%) rotate(360deg)', opacity: '0' },
        },
      },
      animation: {
        float: 'float linear infinite',
      },
    },
  },
  plugins: [],
}
