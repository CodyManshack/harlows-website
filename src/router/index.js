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

  // Sync route param :locale with i18n and <html lang>
  Router.beforeEach((to, from, next) => {
    const loc = to.params.locale;
    if (!loc) {
      // if navigating without locale param, redirect to default
      if (to.path === "/") return next("/es");
      // allow 404 and other routes
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
