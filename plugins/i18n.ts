import { createI18n } from "vue-i18n";
// @ts-ignore - Nuxt auto injects defineNuxtPlugin types in its environment
// Reuse existing message files from src/i18n
// src/i18n/index.js exports a default object with { en: {...}, es: {...} }
// @ts-ignore - JS file import in TS plugin is fine
import messages from "~/src/i18n";

// @ts-ignore - defineNuxtPlugin global in Nuxt
export default defineNuxtPlugin((nuxtApp) => {
  // Avoid installing twice
  if ((nuxtApp.vueApp as any).__VUE_I18N__) {
    return;
  }
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: "es",
    fallbackLocale: {
      ca: ["es"],
      fr: ["es"],
      it: ["es"],
      de: ["en"],
      default: ["es"],
    },
    messages,
  });

  nuxtApp.vueApp.use(i18n);
});
