import { createI18n } from 'vue-i18n'
// Reuse existing message files from src/i18n
// src/i18n/index.js exports a default object with { en: {...}, es: {...} }
// @ts-ignore - JS file import in TS plugin is fine
import messages from '~/src/i18n'

export default defineNuxtPlugin((nuxtApp) => {
  const i18n = createI18n({
    legacy: false,
    globalInjection: true,
    locale: 'es',
    fallbackLocale: {
      ca: 'es',
      fr: 'es',
      it: 'es',
      de: 'en',
      default: 'es',
    },
    messages,
  })

  nuxtApp.vueApp.use(i18n)
})
