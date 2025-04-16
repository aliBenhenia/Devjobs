// tailwind.config.js
module.exports = {
  mode: 'jit',
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  theme: {
    extend: {
      colors: {
        'primary': 'red',
        'secondary': '#E8F5FE',
        'tertiary': '#F5F8FA',
    },
  },
  variants: {},
  plugins: [],
}
}