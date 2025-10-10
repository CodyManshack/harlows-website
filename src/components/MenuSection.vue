<template>
  <section class="menu-section" :id="sectionAnchorId" ref="sectionRef">
    <h2 class="menu-section-title">{{ title }}</h2>
    <DiamondDivider class="section-divider" />
    <div v-if="subtitle" class="menu-section-subtitle">{{ subtitle }}</div>

    <!-- Cocktail Filter -->
    <div
      v-if="title === 'cocktails' && items && items.length > 0"
      class="filter-container"
    >
      <!-- Sticky placeholder to prevent content jump -->
      <div v-if="filterIsSticky" class="filter-placeholder"></div>
      <CocktailFilter
        ref="cocktailFilterRef"
        :cocktails="items"
        @filter-change="handleFilterChange"
        @sticky-change="handleStickyChange"
      />
    </div>

    <div v-if="items">
      <MenuItem
        v-for="item in displayItems"
        :key="item.name"
        :item="item"
        :liquor="title === 'liquors'"
      />
    </div>
    <template v-if="subsections">
      <div
        v-for="(sub, subkey) in subsections"
        :key="subkey"
        :id="`menu-subsection-${slugify(title)}-${slugify(subkey)}`"
      >
        <div
          class="menu-subsection-title-row"
          :class="{ 'has-sizes': getHeaderSizes(sub.items).length }"
        >
          <h3 class="menu-subsection-title">{{ subkey }}</h3>
          <template v-if="getHeaderSizes(sub.items).length">
            <div class="menu-subsection-sizes">
              <div class="menu-item-sizes-row menu-item-sizes-header">
                <span
                  v-for="size in getHeaderSizes(sub.items)"
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
          :hideSizes="getHeaderSizes(sub.items).length > 0"
          :headerSizes="getHeaderSizes(sub.items)"
        />
      </div>
    </template>
  </section>
</template>

<script setup>
import { computed, ref } from "vue";
import MenuItem from "./MenuItem.vue";
import CocktailFilter from "./CocktailFilter.vue";
import DiamondDivider from "./DiamondDivider.vue";

const props = defineProps({
  title: String,
  subtitle: String,
  items: Array,
  subsections: Object,
});

const sectionRef = ref(null);
const cocktailFilterRef = ref(null);
const filteredItems = ref([]);
const filterIsSticky = ref(false);

// Handle filtered cocktails from CocktailFilter component
const handleFilterChange = (filtered) => {
  filteredItems.value = filtered;
};

// Handle sticky state changes from CocktailFilter component
const handleStickyChange = (sticky) => {
  filterIsSticky.value = sticky;
};

// Custom display order for cocktails section
const defaultCocktailOrder = [
  "Hot Buttered Rum",
  "Pisco Sour",
  "Espresso Martini",
  "Valencian Suntan",
  "Old Fashioned",
  "Margarita '42",
  "Cadillac Margarita",
  "Brandy Alexander",
  "The Alamo",
  "Amaretto Sour",
  "Clover Club",
  "Hemingway Special",
  "Man O' War",
  "Jack Rose",
  "Mayan Chocolate",
  "Aviation",
  "Sazerac",
  "Boulevardier",
  "Bee's Knees",
  "Martini Classic",
  "The Left Hand",
  "Black Mojito",
  "Gin Fizz",
  "Ramos Gin Fizz",
  "White Lady",
  "Negroni",
  "Grasshopper",
  "New York Sour",
  "Manhattan",
  "Tom Collins",
  "Bacardi Cocktail",
  "Vesper Martini",
  "French 75",
  "Orange Blossom",
  "Americano",
  "Rusty Nail",
  "Sidecar",
  "Whiskey Sour",
  "Moscow Mule",
];

const sortCocktails = (items) => {
  return [...items].sort((a, b) => {
    const ai = defaultCocktailOrder.indexOf(a.name);
    const bi = defaultCocktailOrder.indexOf(b.name);
    if (ai === -1 && bi === -1) return a.name.localeCompare(b.name);
    if (ai === -1) return 1;
    if (bi === -1) return -1;
    return ai - bi;
  });
};

const displayItems = computed(() => {
  if (props.title === "cocktails") {
    const items =
      filteredItems.value.length > 0 ? filteredItems.value : props.items || [];
    return sortCocktails(items);
  }
  return props.items || [];
});

const slugify = (str) =>
  (str || "")
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .trim();

const sectionAnchorId = computed(() => `menu-section-${slugify(props.title)}`);

// Returns ordered unique list of sizing keys across items for header display
function getHeaderSizes(items) {
  if (!items || !items.length) return [];
  const order = ["glass", "bottle", "small", "large"];
  const set = new Set();
  for (const it of items) {
    if (it && it.sizes) {
      Object.keys(it.sizes).forEach((k) => set.add(k));
    }
  }
  const sizes = Array.from(set);
  // Sort by preferred order, then alphabetically for unknowns
  sizes.sort((a, b) => {
    const ia = order.indexOf(a);
    const ib = order.indexOf(b);
    if (ia !== -1 || ib !== -1) {
      return (ia === -1 ? 999 : ia) - (ib === -1 ? 999 : ib);
    }
    return a.localeCompare(b);
  });
  return sizes;
}
</script>

<style scoped>
/* Subsection subtitle */
.menu-subsection-subtitle {
  font-size: 1.05rem;
  color: #5a6c7d;
  margin-bottom: 1.2rem;
  font-family: "neue-kabel", sans-serif;
  text-align: center;
  font-style: italic;
  line-height: 1.4;
}
.menu-section {
  margin-bottom: 3rem;
  /* Keep title visible when navigating to anchor (account for header+bar) */
  scroll-margin-top: 112px;
}

.menu-section-title {
  font-size: 2.5rem;
  margin-bottom: 0.5rem;
  font-family: "neue-kabel", sans-serif;
  color: #000;
  text-transform: capitalize;
  font-weight: 500;
  text-align: center;
  border-bottom: none;
  padding-bottom: 0;
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
  margin-bottom: 1.25rem;
  font-family: "neue-kabel", sans-serif;
  text-align: center;
  font-style: italic;
  line-height: 1.4;
}

.section-divider {
  max-width: 600px;
  margin: 0.25rem auto 1rem auto;
}

.section-divider :deep(.left-line),
.section-divider :deep(.right-line) {
  border-top: 1px solid #4c2a26 !important; /* accent */
}

.section-divider :deep(.small-diamond-left),
.section-divider :deep(.small-diamond-right),
.section-divider :deep(.large-diamond) {
  border: 1px solid #4c2a26 !important; /* accent */
  z-index: 10;
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
  font-family: "neue-kabel", sans-serif;
  color: #000;
  text-transform: capitalize;
  font-weight: 500;
  border-left: 4px solid var(--q-primary);
  padding-left: 1rem;
  margin: 0;
  flex: 1;
}

/* Keep subsection titles visible when navigating to their anchors */
[id^="menu-subsection-"] {
  scroll-margin-top: 112px;
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
  font-family: "neue-kabel", sans-serif;
}
.menu-item-size-label {
  min-width: 64px;
  text-align: center;
  display: inline-block;
}

/* Filter container and placeholder for sticky behavior */
.filter-container {
  position: relative;
}

.filter-placeholder {
  height: 80px; /* Approximate height of the filter when sticky */
  width: 100%;
}
</style>
