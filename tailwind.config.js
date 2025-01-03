/** @type {import('tailwindcss').Config} **/
export default  {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}",  // Added more extensions
  ],
  theme: {
    extend: {
      colors: {
        primary: "#050816",
        secondary: "#aaa6c3",
        tertiary: "#151030",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/assets/herobg.png')",  // Ensure correct path
      },
      animation: {
        growLine: 'growLine 1s ease-in-out forwards',
      },
      keyframes: {
        growLine: {
          '0%': { height: '0' },
          '100%': { height: '80px' }, // Adjust to your preferred height
        }},
    },
  },
  plugins: [],  // Leave empty if not using plugins
};
