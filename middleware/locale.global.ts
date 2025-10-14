// Locale validation middleware: ensures locale param (if present) is one of supported ones.
// Does NOT call useI18n (cannot inside middleware). Actual syncing happens in plugin.
// @ts-ignore - Nuxt provides defineNuxtRouteMiddleware globally
export default defineNuxtRouteMiddleware((to) => {
  const param = to.params.locale;
  if (param && !["en", "es"].includes(String(param))) {
    // Redirect invalid locale to default
    // @ts-ignore - navigateTo global
    return navigateTo("/es");
  }
  // No direct i18n mutation here; plugin handles syncing.
});
