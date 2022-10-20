/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    extend: {
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
    },
  },
  plugins: [],
};
