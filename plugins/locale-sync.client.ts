// Sync i18n locale with dynamic [locale] route segment on client navigation
// This runs after each route change.
// Avoid useI18n() here (plugin context, not component setup). Use global instance.
// @ts-ignore - Nuxt auto-imports defineNuxtPlugin
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("page:finish", () => {
    // Access the i18n instance from the app (registered in i18n.ts)
    const i18n: any =
      (nuxtApp.vueApp as any).__VUE_I18N__?.global ||
      (nuxtApp.vueApp as any).$i18n?.global;
    if (!i18n) return;
    // @ts-ignore - auto-imported
    const route = useRoute();
    const param = route.params.locale as string | undefined;
    const target = param && ["en", "es"].includes(param) ? param : "es";
    if (i18n.locale.value !== target) {
      i18n.locale.value = target;
    }
    if (process.client) {
      document.documentElement.setAttribute("lang", target);
    }
  });
});
