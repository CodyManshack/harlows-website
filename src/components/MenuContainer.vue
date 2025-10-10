<template>
  <div class="menu-container">
    <MenuSection
      v-for="(sectionData, key) in menu"
      :key="'section-' + key"
      :title="key"
      :subtitle="sectionData.subtitle"
      :items="sectionData.items"
      :subsections="getSubsections(sectionData)"
    />
  </div>
</template>

<script setup>
import MenuSection from "./MenuSection.vue";
import menu from "src/assets/menu.js";

const props = defineProps({
  section: {
    type: String,
    required: true,
  },
});

// Helper: returns subsections if present (object with keys, not just items/subtitle)
function getSubsections(sectionData) {
  if (!sectionData || typeof sectionData !== "object") return null;
  // Exclude known keys that are not subsections
  const exclude = ["items", "subtitle"];
  const keys = Object.keys(sectionData).filter((k) => !exclude.includes(k));
  if (keys.length === 0) return null;
  // Build object of subsections
  const subsections = {};
  for (const k of keys) {
    if (
      sectionData[k] &&
      typeof sectionData[k] === "object" &&
      sectionData[k].items
    ) {
      subsections[k] = sectionData[k];
    }
  }
  return Object.keys(subsections).length ? subsections : null;
}
</script>

<style scoped>
.menu-container {
  max-width: 900px;
  margin: 0 auto;
}
</style>
