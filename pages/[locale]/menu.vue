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
import { useHead } from "#imports";
import { useRoute } from "vue-router";
import {
  buildRestaurantJsonLd,
  buildMenuJsonLd,
  absoluteUrl,
} from "src/seo.js";

const { t, locale } = useI18n({ useScope: "global" });
const route = useRoute();

useHead(() => {
  const loc = (route.params.locale || locale.value || "es").toString();
  return {
    title: t("menu.meta.title") || "Menu – Harlow's Bar",
    meta: [
      {
        name: "description",
        content:
          t("menu.meta.description") ||
          "Explore our cocktail, beer, and wine menu with seasonal specials.",
      },
    ],
    link: [
      { rel: "alternate", hreflang: "es", href: absoluteUrl("/es/menu") },
      { rel: "alternate", hreflang: "en", href: absoluteUrl("/en/menu") },
      {
        rel: "alternate",
        hreflang: "x-default",
        href: absoluteUrl("/es/menu"),
      },
      { rel: "canonical", href: absoluteUrl(`/${loc}/menu`) },
    ],
    script: [
      {
        type: "application/ld+json",
        children: JSON.stringify(buildRestaurantJsonLd({ locale: loc })),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify(buildMenuJsonLd({ locale: loc })),
      },
    ],
  };
});
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
