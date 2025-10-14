import { fileURLToPath } from "node:url";
import { defineNuxtConfig } from "nuxt/config";

export default defineNuxtConfig({
  // Enable SSR so Nuxt can pre-render pages at build time
  ssr: true,

  modules: ["nuxt-quasar-ui"],

  app: {
    head: {
      title: "Harlow's Bar",
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        { name: "description", content: "Classic cocktail lounge" },
      ],
      link: [
        {
          rel: "icon",
          type: "image/png",
          sizes: "128x128",
          href: "/icons/favicon-128x128.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "96x96",
          href: "/icons/favicon-96x96.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "32x32",
          href: "/icons/favicon-32x32.png",
        },
        {
          rel: "icon",
          type: "image/png",
          sizes: "16x16",
          href: "/icons/favicon-16x16.png",
        },
        { rel: "icon", type: "image/ico", href: "/favicon.ico" },
        { rel: "preconnect", href: "https://use.typekit.net", crossorigin: "" },
        { rel: "stylesheet", href: "https://use.typekit.net/ayy7lpm.css" },
        { rel: "preconnect", href: "https://www.googletagmanager.com" },
        { rel: "preconnect", href: "https://maps.app.goo.gl" },
      ],
      script: [
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-XPGV6LMGBP",
          async: true,
        },
        {
          src: "https://www.googletagmanager.com/gtag/js?id=G-7P9L9NMVJD",
          async: true,
        },
        {
          innerHTML:
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-XPGV6LMGBP');\n",
          type: "text/javascript",
        },
        {
          innerHTML:
            "window.dataLayer = window.dataLayer || [];\nfunction gtag(){dataLayer.push(arguments);}\ngtag('js', new Date());\ngtag('config', 'G-7P9L9NMVJD');\n",
          type: "text/javascript",
        },
      ],
    },
  },

  // Reuse existing styles and Quasar assets
  css: [
    "@quasar/extras/ionicons-v4/ionicons-v4.css",
    "@quasar/extras/material-icons/material-icons.css",
    "@quasar/extras/roboto-font/roboto-font.css",
    fileURLToPath(new URL("./src/css/app.scss", import.meta.url)),
  ],

  quasar: {
    // Meta plugin removed; Nuxt's useHead handles head management
    plugins: [],
    sassVariables: "src/css/quasar.variables.scss",
  },

  vite: {
    resolve: {
      alias: {
        src: fileURLToPath(new URL("./src", import.meta.url)),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: '@use "src/css/quasar.variables.scss" as *;\n',
        },
      },
    },
  },

  nitro: {
    prerender: {
      // Add all localized home and menu routes for SSG
      routes: [
        "/en",
        "/es",
        "/en/menu",
        "/es/menu",
        // Add more localized routes here as needed
      ],
      crawlLinks: true,
    },
  },

  // Auto import components from ~/components (we will use existing src/components explicitly)
  components: false,

  // Register our custom plugins
  plugins: ["~/plugins/i18n"],
});
