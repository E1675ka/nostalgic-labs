/** @type {import('tailwindcss').Config} **/
export default {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,html}", // Added more extensions
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
        "text-image": "url('src/assets/jj-ying-7JX0-bfiuxQ-unsplash.jpg')", // Ensure correct path
      },
     
      keyframes: {
        growLine: {
          "0%": { height: "0" },
          "100%": { height: "80px" }, // Adjust to your preferred height
        },
        slideInLeft: {
          "0%": { transform:"translateX(-100%)" },
          "20%":{transform: "translateX(-80%)"}, // Off-screen to the left
          "60%":{transform: "translateX(-60%)"}, // Off-screen to the left
          "80%":{transform: "translateX(-30%)"}, // Off-screen to the left
          // Off-screen to the left
          "100%": { transform: "translateX(0)" },    // Slide to its original position
        },
        animation: {
          growLine: "growLine 3s ease-in-out forwards",
          slideInLeft: "slideInLeft 3s ease forwards", // Slide-in animation
        },
      },
    },
  },
  plugins: [],
  // Custom Utilities Layer for Clip-Path
  corePlugins: {
    preflight: true, // Ensure base styles are applied
  },
};
