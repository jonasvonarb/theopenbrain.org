/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
      blur: {
        xs: "2px",
      },
      fontSize: {
        small: ["1.2rem", "1.9rem"],
        base: ["1.7rem", "2.5rem"],
        l: ["2.3rem", "3rem"],
        xl: ["3.5rem", "3.2rem"],
        bigest: ["22rem", "22rem"],
      },
      height: {
        header: "2.2rem",
        body: "calc(100vh - 2.2rem)",
      },
      width: {
        menu: "35vw",
      },
      margin: {
        body: "2.2rem",
      },
      colors: {
        violet: "#7794F8",
        dark: "#3A3A3A",
        lightDark: "#6A6A6A",
        mark1: "#0DD310",
        mark2: "#E91B0B",
        mark3: "#1017E2",
        mark4: "#FDE73F",
      },
    },
  },
  plugins: [],
};
