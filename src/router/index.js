import { defineRouter } from "#q-app/wrappers";
import {
  createRouter,
  createMemoryHistory,
  createWebHistory,
  createWebHashHistory,
} from "vue-router";
import routes from "./routes";
import { i18n } from "src/boot/i18n";

export default defineRouter((/* { store, ssrContext } */) => {
  const createHistory = process.env.SERVER
    ? createMemoryHistory
    : process.env.VUE_ROUTER_MODE === "history"
    ? createWebHistory
    : createWebHashHistory;

  const Router = createRouter({
    scrollBehavior: () => ({ left: 0, top: 0 }),
    routes,

    // Leave this as is and make changes in quasar.conf.js instead!
    // quasar.conf.js -> build -> vueRouterMode
    // quasar.conf.js -> build -> publicPath
    history: createHistory(process.env.VUE_ROUTER_BASE),
  });

  // Helper function to detect browser language
  function getBrowserLocale() {
    if (typeof navigator === "undefined") return "es"; // SSR fallback

    // Get browser language (e.g., "en-US", "es-ES", "es")
    const browserLang = navigator.language || navigator.userLanguage || "es";

    console.log("Browser language detected:", browserLang);

    // Extract the primary language code (e.g., "en" from "en-US")
    const langCode = browserLang.toLowerCase().split("-")[0];

    console.log("Language code extracted:", langCode);

    // Return 'en' or 'es' based on browser language, default to 'es'
    const finalLocale = ["en", "es"].includes(langCode) ? langCode : "es";

    console.log("Final locale chosen:", finalLocale);

    return finalLocale;
  }

  // Sync route param :locale with i18n and <html lang>
  Router.beforeEach((to, from, next) => {
    const loc = to.params.locale;

    console.log("Router beforeEach - to.path:", to.path, "locale param:", loc);

    if (!loc) {
      // Allow routes without locale param (e.g., 404)
      return next();
    }
    try {
      const l = Array.isArray(loc) ? loc[0] : String(loc);
      if (["en", "es"].includes(l)) {
        const inst = i18n?.global;
        if (inst) inst.locale.value = l;
        if (typeof document !== "undefined") {
          document.documentElement.setAttribute("lang", l);
        }
      }
    } catch (e) {
      // ignore
    }
    next();
  });

  return Router;
});
