import { defineBoot } from "#q-app/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

// Exported i18n instance for router/meta integrations
export let i18n;

// Helper to detect browser language
function getBrowserLocale() {
  if (typeof navigator === "undefined") return "es"; // SSR fallback

  const browserLang = navigator.language || navigator.userLanguage || "es";
  const langCode = browserLang.toLowerCase().split("-")[0];

  // Return 'en' or 'es' based on browser language, default to 'es'
  return ["en", "es"].includes(langCode) ? langCode : "es";
}

export default defineBoot(({ app }) => {
  i18n = createI18n({
    locale: getBrowserLocale(), // Detect browser language, fallback to 'es'
    legacy: false,
    fallbackLocale: {
      ca: "es",
      fr: "es",
      it: "es",
      de: "en",
      default: "es",
    },
    globalInjection: true,
    messages,
  });

  // Set i18n instance on app
  app.use(i18n);
});
