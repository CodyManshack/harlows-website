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

const { t } = useI18n({ useScope: "global" });

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
