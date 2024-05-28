/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    //  './src/_layout.tsx'
  ],
  theme: {
    extend: {
      fontFamily: {
        title: 'Roboto_700Bold',
        subTitle: 'Roboto_500Medium',
        text: 'Roboto_400Regular',
      },
    },
  },
  plugins: [],
}
