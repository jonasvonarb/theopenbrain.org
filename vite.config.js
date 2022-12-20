import { fileURLToPath, URL } from "node:url";

import { defineConfig, loadEnv } from "vite";
import vue from "@vitejs/plugin-vue";

const path = require("path");

import { createHtmlPlugin } from "vite-plugin-html";
import pkg from "./package.json";

export default ({ mode }) => {
  process.env = { ...process.env, ...loadEnv(mode, process.cwd()) };

  // https://vitejs.dev/config/
  return defineConfig({
    build: {
      /** If you set esmExternals to true, this plugins assumes that 
     all external dependencies are ES modules */

      commonjsOptions: {
        esmExternals: true,
      },
    },
    plugins: [
      vue(),
      createHtmlPlugin({
        inject: {
          data: {
            NODE_ENV: process.env.NODE_ENV,
            PAGE_TITLE: process.env.VITE_PAGE_TITLE,
            // OG_DESCRIPTION: process.env.VITE_OG_DESCRIPTION,
            // OG_IMAGE: process.env.VITE_OG_IMAGE,
            // GA_MEASUREMENT_ID: process.env.VITE_GA_MEASUREMENT_ID,
          },
          ejsOptions: {
            escape: false,
          },
        },
      }),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "src/"),
        ...(process.env.NODE_ENV === "development"
          ? {
              // "@azt": path.resolve(__dirname,"../MODULES/azt"),
              // "@3ms": path.resolve(__dirname,"../MODULES/3ms"),
            }
          : {}),
      },
    },
    define: {
      __VERSION__: JSON.stringify(pkg.version),
    },
  });
};

// https://vitejs.dev/config/
