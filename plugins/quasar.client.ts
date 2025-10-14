import { Quasar } from "quasar";
import "quasar/src/css/index.sass";
import "@quasar/extras/material-icons/material-icons.css";
import "@quasar/extras/mdi-v7/mdi-v7.css";
import "@quasar/extras/ionicons-v4/ionicons-v4.css";
import "@quasar/extras/roboto-font/roboto-font.css";

// @ts-ignore - Nuxt auto-imports defineNuxtPlugin
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(Quasar, {
    plugins: {},
  });
});
