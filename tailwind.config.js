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
    screens: {
      s: "640px",
      // => @media (min-width: 640px) { ... }

      m: "1300px",
      // => @media (min-width: 1300px) { ... }

      l: "1500px",
      // => @media (min-width: 1500px) { ... }
    },
    extend: {
      blur: {
        xs: "1px",
      },
      fontSize: {
        // smaller: [
        //   "1.1rem",
        //   { lineHeight: "1.4rem", letterSpacing: "-0.01rem" },
        // ],
        // small: ["1.35rem", { lineHeight: "1.9rem", letterSpacing: "0.02rem" }],
        // medium: ["1.6rem", { lineHeight: "2.65rem" }],
        // baseMono: ["1.8rem", "2.8rem"],
        // base: ["2rem", "3.1rem"],
        // h3: ["3.0rem", "3.8rem"],
        // h2: ["4.8rem", "5.8rem"],
        // blindness: ["11rem", "11rem"],
        // biggest: ["8rem", "12rem"],
        // big: ["8rem", "8rem"],
      },
      height: {
        header: "2.2rem",
        body: "calc(100vh - 2.2rem)",
      },
      width: {
        text: "min(50vw, calc(780px + 11rem))",
        illus: "max(50vw, calc(100vw - 780px - 11rem))",
        menu: "35vw",
        "1/8": " calc(100% / 8 * 1)",
        "2/8": " calc(100% / 8 * 2)",
        "3/8": " calc(100% / 8 * 3)",
        "4/8": " calc(100% / 8 * 4)",
        "5/8": " calc(100% / 8 * 5)",
        "6/8": " calc(100% / 8 * 6)",
        "7/8": " calc(100% / 8 * 7)",
      },
      spacing: {
        text: "max(50vw, calc(100vw - 780px - 11rem))",
        left: "5.8rem",
      },
      margin: {
        body: "2.2rem",
        left: "5.8rem",
      },
      padding: {
        left: "5.8rem",
      },
      colors: {
        primaryLi: "#66FFCC",
        primaryMed: "#00D9B8",
        primaryDa: "#22B1AA",
        secondaryDa: "#8101FF",
        secondaryLi: "#9748FF",
        fullHDa: "#CC01BE",
        fullHLi: "#FE01BE",
        fullDa: "#333333",
        fullLi: "#5A5B5B",
        fullMed: "#424242",
        white: "#FFF",
        bgLi: "#F1F6F8",
        bgMed: "#8F9E9D",
        bgDa: "#333333",
      },
    },
  },
  plugins: [],
};
