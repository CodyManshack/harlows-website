<template>
  <section class="menu-section">
    <h2 class="menu-section-title">{{ title }}</h2>
    <div v-if="subtitle" class="menu-section-subtitle">{{ subtitle }}</div>
    <div v-if="items">
      <MenuItem
        v-for="item in items"
        :key="item.name"
        :item="item"
        :liquor="title === 'liquors'"
      />
    </div>
    <template v-if="subsections">
      <div v-for="(sub, subkey) in subsections" :key="subkey">
        <div
          class="menu-subsection-title-row"
          :class="{ 'has-sizes': getCommonSizes(sub.items) }"
        >
          <h3 class="menu-subsection-title">{{ subkey }}</h3>
          <template v-if="getCommonSizes(sub.items)">
            <div class="menu-subsection-sizes">
              <div class="menu-item-sizes-row menu-item-sizes-header">
                <span
                  v-for="size in getCommonSizes(sub.items)"
                  :key="size"
                  class="menu-item-size-label"
                  >{{ size }}</span
                >
              </div>
            </div>
          </template>
        </div>
        <div v-if="sub.subtitle" class="menu-subsection-subtitle">
          {{ sub.subtitle }}
        </div>
        <MenuItem
          v-for="item in sub.items"
          :key="item.name"
          :item="item"
          :liquor="title === 'liquors' || subkey === 'gin'"
          :hideSizes="!!getCommonSizes(sub.items)"
        />
      </div>
    </template>
  </section>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
const props = defineProps({
  title: String,
  subtitle: String,
  items: Array,
  subsections: Object,
});

// Returns array of sizing keys if all items have the same sizing keys, else null
function getCommonSizes(items) {
  if (!items || !items.length) return null;
  const allSizes = items.map((i) => (i.sizes ? Object.keys(i.sizes) : null));
  if (allSizes.some((s) => !s)) return null;
  const first = allSizes[0];
  if (allSizes.every((s) => JSON.stringify(s) === JSON.stringify(first))) {
    return first;
  }
  return null;
}
</script>

<style scoped>
/* Subsection subtitle */
.menu-subsection-subtitle {
  font-size: 1.05rem;
  color: #5a6c7d;
  margin-bottom: 1.2rem;
  font-family: "Poiret One", cursive;
  text-align: center;
  font-style: italic;
  line-height: 1.4;
}
.menu-section {
  margin-bottom: 3rem;
}

.menu-section-title {
  font-size: 2.5rem;
  margin-bottom: 1rem;
  font-family: "Poiret One", cursive;
  color: #000;
  text-transform: capitalize;
  font-weight: 700;
  text-align: center;
  border-bottom: 2px solid #e8e8e8;
  padding-bottom: 0.5rem;
}

.menu-section:first-of-type .menu-section-title {
  margin-top: 0;
}
.menu-section:not(:first-of-type) .menu-section-title {
  margin-top: 2rem;
}

.menu-section-subtitle {
  font-size: 1.1rem;
  color: #5a6c7d;
  margin-bottom: 1.5rem;
  font-family: "Poiret One", cursive;
  text-align: center;
  font-style: italic;
  line-height: 1.4;
}

.menu-subsection-title-row {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0;
  margin-top: 2rem;
  margin-bottom: 0.5rem;
}
.menu-subsection-title {
  font-size: 1.6rem;
  font-family: "Poiret One", cursive;
  color: #000;
  text-transform: capitalize;
  font-weight: 500;
  border-left: 4px solid #3498db;
  padding-left: 1rem;
  margin: 0;
  flex: 1;
}

/* Align subsection size labels with item price columns */
.menu-subsection-sizes {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1rem;
}
.menu-item-sizes-row {
  display: flex;
  gap: 0;
}
.menu-item-sizes-header {
  font-size: 1.1rem;
  font-weight: 600;
  color: #555;
  font-family: "Poiret One", cursive;
}
.menu-item-size-label {
  min-width: 64px;
  text-align: center;
  display: inline-block;
}
</style>
