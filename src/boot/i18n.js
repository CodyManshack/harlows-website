import { defineBoot } from "#q-app/wrappers";
import { createI18n } from "vue-i18n";
import messages from "src/i18n";

// Exported i18n instance for router/meta integrations
export let i18n;

export default defineBoot(({ app }) => {
  i18n = createI18n({
    locale: "es", // Set default locale
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
