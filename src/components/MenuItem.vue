<template>
  <div :class="['menu-item', liquor ? 'menu-item-liquor' : '']">
    <div
      class="menu-item-header"
      v-if="item.sizes || (headerSizes && headerSizes.length)"
    >
      <span class="menu-item-name">
        {{ item.name }}
        <span v-if="item.sizeLabel" class="menu-item-size-label-inline">{{
          item.sizeLabel
        }}</span>
      </span>
      <div class="menu-item-sizes">
        <div
          class="menu-item-sizes-row menu-item-sizes-header"
          v-if="!hideSizes && item.sizes"
        >
          <span
            v-for="(price, size) in item.sizes"
            :key="size"
            class="menu-item-size-label"
            >{{ size }}</span
          >
        </div>
        <div
          class="menu-item-sizes-row menu-item-sizes-header"
          v-else-if="!hideSizes && headerSizes && headerSizes.length"
        >
          <span
            v-for="size in headerSizes"
            :key="'hdr-' + size"
            class="menu-item-size-label"
            >{{ size }}</span
          >
        </div>
        <div class="menu-item-sizes-row menu-item-sizes-prices">
          <span
            v-for="size in headerSizes && headerSizes.length
              ? headerSizes
              : Object.keys(item.sizes || {})"
            :key="size + '-price'"
            class="menu-item-size-price"
            >{{
              item.sizes && item.sizes[size] !== undefined
                ? item.sizes[size]
                : "—"
            }}</span
          >
        </div>
      </div>
    </div>
    <div class="menu-item-header" v-else>
      <span class="menu-item-name">
        {{ item.name }}
        <span v-if="item.sizeLabel" class="menu-item-size-label-inline">{{
          item.sizeLabel
        }}</span>
        <span v-if="item.egg" class="menu-item-egg">
          <q-icon
            name="ion-egg"
            color="orange"
            size="0.85rem"
            style="opacity: 0.75"
          >
            <q-tooltip class="bg-black text-white"
              >Allergen: Contains Egg White</q-tooltip
            >
          </q-icon>
        </span>
      </span>
      <span class="menu-item-price">{{ item.price }}</span>
    </div>
    <div v-if="item.type || item.year || item.location" class="menu-item-meta">
      {{ [item.type, item.year, item.location].filter(Boolean).join(" · ") }}
    </div>
    <div v-if="item.description" class="menu-item-description">
      {{ item.description }}
    </div>
    <div v-if="item.seasonal" class="menu-item-seasonal">Seasonal</div>
  </div>
</template>

<script setup>
const props = defineProps({
  item: Object,
  liquor: Boolean,
  hideSizes: Boolean,
  headerSizes: Array,
});
</script>

<style scoped>
/* Inline size label for item name */
.menu-item-size-label-inline {
  font-size: 0.95rem;
  font-weight: 500;
  color: #555;
  margin-left: 0.5em;
  font-family: "Poiret One", cursive;
  vertical-align: middle;
}
/* Sizing labels in subsection header */
.menu-subsection-sizes {
  margin-left: 1.5rem;
  display: inline-flex;
  gap: 1.5rem;
  vertical-align: middle;
}
.menu-subsection-size-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #555;
  font-family: "Poiret One", cursive;
  min-width: 48px;
  text-align: center;
}
/* Sizing columns for beers/wines */
.menu-item-sizes {
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
  color: #444;
  font-family: "Poiret One", cursive;
  margin-bottom: 0.1rem;
}
.menu-item-size-label {
  min-width: 64px;
  text-align: center;
  display: inline-block;
}
.menu-item-sizes-prices {
  font-size: 1.15rem;
  font-weight: 700;
  color: #000;
  font-family: "Poiret One", cursive;
}
.menu-item-size-price {
  min-width: 64px;
  text-align: center;
  display: inline-block;
}
.menu-item {
  padding: 1rem 0;
  border-bottom: 1px dotted #d4d4d4;
  margin-bottom: 0.5rem;
}

.menu-item:last-child {
  border-bottom: none;
}

.menu-item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  margin-bottom: 0.5rem;
}

.menu-item-name {
  font-family: "Poiret One", cursive;
  font-size: 1.4rem;
  color: #000;
  font-weight: 600;
  text-transform: capitalize;
  flex: 1;
}

.menu-item-price {
  font-family: "Poiret One", cursive;
  font-size: 1.3rem;
  color: #000;
  font-weight: 600;
  margin-left: 1rem;
}

.menu-item-description {
  font-size: 1.15rem;
  color: #000;
  font-family: "Poiret One", cursive;
  line-height: 1.4;
  margin-top: 0.3rem;
  font-style: italic;
}

/* Wine metadata line under name */
.menu-item-meta {
  font-size: 0.95rem;
  color: #555;
  font-family: "Poiret One", cursive;
  margin-top: -0.25rem; /* tuck closer to name for compact mobile layout */
  margin-bottom: 0.15rem;
}

.menu-item-seasonal {
  font-size: 0.9rem;
  color: #f39c12;
  font-family: "Poiret One", cursive;
  font-style: italic;
  margin-top: 0.3rem;
  background: rgba(243, 156, 18, 0.1);
  padding: 0.2rem 0.5rem;
  border-radius: 4px;
  display: inline-block;
}

/* Inline egg icon after name, less visually demanding */
.menu-item-egg {
  margin-left: 0.35em;
  display: inline-flex;
  align-items: center;
  opacity: 0.65;
  position: relative;
  top: 0.05em;
}
.menu-item-name {
  display: inline-flex;
  align-items: baseline;
}

/* Smaller style for liquor items */
.menu-item-liquor {
  padding: 0.25rem 0;
}
.menu-item-liquor .menu-item-name {
  font-size: 1rem;
  font-weight: 600;
}
.menu-item-liquor .menu-item-price {
  font-size: 0.95rem;
  font-weight: 600;
}
.menu-item-liquor .menu-item-description {
  font-size: 0.9rem;
  margin-top: 0.1rem;
}
</style>
