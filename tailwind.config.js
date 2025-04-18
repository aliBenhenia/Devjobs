// tailwind.config.js
module.exports = {
  darkMode: 'class',
  content: [
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        maxWidth: {
          custom: "255px", // 👈 name it whatever you want
        },
        bg: {
          DEFAULT: '#ffffff',       // light mode background
          dark: '#121721',          // dark mode background
        },
        text: {
          DEFAULT: '#19202d',       // light mode text
          dark: '#ffffff',          // dark mode text
        },
        secondary: {
          DEFAULT: '#6e8098',       // light mode secondary text
          dark: '#9daec2',          // dark mode secondary text
        },
        accent: {
          DEFAULT: '#5964e0',       // main action color
          dark: '#939bf4',          // slightly lighter in dark
        },
        card: {
          DEFAULT: '#f9f9f9',       // card in light
          dark: '#313743',          // card in dark
        },
        border: {
          DEFAULT: '#e7e8e9',       // border light
          dark: '#303642',          // border dark
        },
        hover: {
          DEFAULT: '#c5c9f4',       // hover color light
          dark: '#525861',          // hover color dark
        },
      },
    },
  },
  plugins: [],
}
