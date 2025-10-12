<template>
  <q-page>
    <div class="menu-list">
      <MenuContainer />
    </div>
  </q-page>
</template>

<script setup>
import MenuContainer from "src/components/MenuContainer.vue";
import { useI18n } from "vue-i18n";
import { useMeta } from "quasar";
import { useRoute } from "vue-router";
import {
  buildRestaurantJsonLd,
  buildMenuJsonLd,
  absoluteUrl,
} from "src/seo.js";

const { t, locale } = useI18n({ useScope: "global" });
const route = useRoute();

useMeta(() => ({
  title: t("menu.meta.title") || "Menu – Harlow's Bar",
  meta: {
    description: {
      name: "description",
      content:
        t("menu.meta.description") ||
        "Explore our cocktail, beer, and wine menu with seasonal specials.",
    },
  },
  link: [
    { rel: "alternate", hreflang: "es", href: absoluteUrl("/es/menu") },
    { rel: "alternate", hreflang: "en", href: absoluteUrl("/en/menu") },
    { rel: "alternate", hreflang: "x-default", href: absoluteUrl("/es/menu") },
    // canonical for current locale
    {
      rel: "canonical",
      href: absoluteUrl(`/${route.params.locale || locale.value || "es"}/menu`),
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(
        buildRestaurantJsonLd({
          locale: (route.params.locale || locale.value || "es").toString(),
        })
      ),
    },
    {
      type: "application/ld+json",
      children: JSON.stringify(
        buildMenuJsonLd({
          locale: (route.params.locale || locale.value || "es").toString(),
        })
      ),
    },
  ],
}));
</script>

<style scoped>
.menu-list {
  width: 100%;
  max-width: 800px;
  background-color: #f7f5ed;
  background-blend-mode: lighten;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
}
</style>
