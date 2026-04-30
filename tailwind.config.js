export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'light-bg': '#FCFBF8',
        'charcoal': '#2D3748',
        'sage': '#8CA18D',
        'serene-blue': '#7A93AC',
        'terracotta': '#B8735A',
      },
      fontFamily: {
        serif: ['Playfair Display', 'serif'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
