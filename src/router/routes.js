const routes = [
  // Redirect root to default locale
  { path: "/", redirect: "/es" },

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
