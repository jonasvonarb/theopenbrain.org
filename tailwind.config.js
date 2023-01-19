/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx,vue}"],
  theme: {
    fontFamily: {
      sans: [
        "IBM Plex Sans",
        "ui-sans-serif",
        "system-ui",
        "-apple-system",
        "BlinkMacSystemFont",
        "Segoe UI",
        "Roboto",
        "Helvetica Neue",
        "Arial",
        "Noto Sans",
        "sans-serif",
        "Apple Color Emoji",
        "Segoe UI Emoji",
        "Segoe UI Symbol",
        "Noto Color Emoji",
      ],
      mono: [
        "IBM Plex Mono",
        "ui-monospace",
        "SFMono-Regular",
        "Menlo",
        "Monaco",
        "Consolas",
        "Liberation Mono",
        "Courier New",
        "monospace",
      ],
    },
    extend: {
      blur: {
        xs: "1px",
      },
      fontSize: {
        smaller: [
          "1.1rem",
          { lineHeight: "2.25rem", letterSpacing: "-0.01rem" },
        ],
        small: [
          "1.45rem",
          { lineHeight: "2.25rem", letterSpacing: "-0.01rem" },
        ],
        medium: ["1.6rem", { lineHeight: "2.8rem" }],
        baseMono: ["1.8rem", "2.8rem"],
        base: ["2rem", "3.1rem"],
        h3: ["3.0rem", "3.8rem"],
        h2: ["4.8rem", "5.8rem"],
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
        lighter: "#DEDEDE",
        light: "#B5B5B5",
        dark: "#353535",
        darker: "#202020",
        violet: "#FF00FF",
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
