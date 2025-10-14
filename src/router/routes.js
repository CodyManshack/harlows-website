const routes = [
  // Redirect root to browser language or default locale
  {
    path: "/",
    redirect: () => {
      // Detect browser language
      if (typeof navigator !== "undefined") {
        const browserLang =
          navigator.language || navigator.userLanguage || "es";
        const langCode = browserLang.toLowerCase().split("-")[0];
        const locale = ["en", "es"].includes(langCode) ? langCode : "es";
        return `/${locale}`;
      }
      // SSR fallback
      return "/es";
    },
  },

  // Locale-aware parent
  {
    path: "/:locale(en|es)",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", name: "home", component: () => import("pages/Index.vue") },
      { path: "menu", name: "menu", component: () => import("pages/Menu.vue") },
    ],
  },

  // Always leave this as last one
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
