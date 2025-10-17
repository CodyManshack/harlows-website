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
    // Open Graph tags for social sharing
    "og:title": {
      property: "og:title",
      content: t("menu.meta.title") || "Menu – Harlow's Bar",
    },
    "og:description": {
      property: "og:description",
      content:
        t("menu.meta.description") ||
        "1920s cocktails made according to the original recipes — Valencia, Spain",
    },
    "og:image": {
      property: "og:image",
      content: absoluteUrl("/icons/og-image.png"),
    },
    "og:image:secure_url": {
      property: "og:image:secure_url",
      content: absoluteUrl("/icons/og-image.png"),
    },
    "og:image:alt": {
      property: "og:image:alt",
      content:
        t("menu.ogImageAlt") ||
        "Menu preview from Harlow's Bar: cocktails, beer and wine",
    },
    "og:image:width": {
      property: "og:image:width",
      content: "1200",
    },
    "og:image:height": {
      property: "og:image:height",
      content: "630",
    },
    "og:url": {
      property: "og:url",
      content: absoluteUrl(
        `/${route.params.locale || locale.value || "es"}/menu`
      ),
    },
    "og:type": {
      property: "og:type",
      content: "restaurant.menu",
    },
    "og:site_name": {
      property: "og:site_name",
      content: "Harlow's Bar",
    },
    "og:locale": {
      property: "og:locale",
      content:
        (route.params.locale || locale.value || "es") === "es"
          ? "es_ES"
          : "en_US",
    },
    "og:locale:alternate:es": {
      property: "og:locale:alternate",
      content: "es_ES",
    },
    "og:locale:alternate:en": {
      property: "og:locale:alternate",
      content: "en_US",
    },
    // Twitter Card tags (mirror OG)
    "twitter:card": {
      name: "twitter:card",
      content: "summary_large_image",
    },
    "twitter:title": {
      name: "twitter:title",
      content: t("menu.meta.title") || "Menu – Harlow's Bar",
    },
    "twitter:description": {
      name: "twitter:description",
      content:
        t("menu.meta.description") ||
        "1920s cocktails made according to the original recipes — Valencia, Spain",
    },
    "twitter:image": {
      name: "twitter:image",
      content: absoluteUrl("/icons/og-image.png"),
    },
  },
  link: [
    { rel: "alternate", hreflang: "en", href: absoluteUrl("/en/menu") },
    { rel: "alternate", hreflang: "es", href: absoluteUrl("/es/menu") },
    { rel: "alternate", hreflang: "x-default", href: absoluteUrl("/en/menu") },
    { rel: "canonical", href: absoluteUrl("/en/menu") },
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
