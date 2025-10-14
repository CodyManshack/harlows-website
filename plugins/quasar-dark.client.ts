// Force Quasar dark mode so body gets body--dark class and background styles apply
import { Dark } from "quasar";
// @ts-ignore - defineNuxtPlugin provided by Nuxt runtime types
export default defineNuxtPlugin(() => {
  if (!Dark.isActive) {
    Dark.set(true);
  }
});
