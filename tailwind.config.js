/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  // O segundo item na array de configuração content serve para adicionar os estilos do tailwind em componentes do nosso app
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}" ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#030014',
        secondary: '#151312',
        light: {
          100: '#D6C6FF',
          200: '#A8B5DB',
          300: '#9CA4AB',
        },
        dark: {
          100: '#221f3d',
          200: '#0f0d23',
          // 300: '#7A93B3',
        },
      accent: '#AB8BFF'
      }
    },
  },
  plugins: [],
}
