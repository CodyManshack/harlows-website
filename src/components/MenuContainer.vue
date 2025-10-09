<template>
  <div class="menu-container">
    <template v-if="section === 'food'">
      <MenuSection
        v-for="(sectionData, key) in menu.food"
        :key="key"
        :title="key"
        :subtitle="sectionData.subtitle"
        :items="sectionData.items"
      />
    </template>

    <template v-if="section === 'drinks'">
      <MenuSection
        v-for="(sectionData, key) in menu.drinks"
        :key="'drinks-' + key"
        :title="key"
        :subtitle="sectionData.subtitle"
        :items="sectionData.items"
        :subsections="sectionData.gin ? sectionData : null"
      />
    </template>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import MenuSection from "./MenuSection.vue";

const props = defineProps({
  section: {
    type: String,
    required: true,
  },
});

const menu = ref({ food: {}, drinks: {} });

onMounted(async () => {
  const res = await fetch("/menu.json");
  menu.value = await res.json();
});
</script>

<style scoped>
.menu-container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
