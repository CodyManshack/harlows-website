<template>
  <div :class="['menu-item', liquor ? 'menu-item-liquor' : '']">
    <div class="menu-item-header" v-if="item.sizes">
      <span class="menu-item-name">{{ item.name }}</span>
      <div class="menu-item-sizes">
        <div class="menu-item-sizes-row menu-item-sizes-header">
          <span
            v-for="(price, size) in item.sizes"
            :key="size"
            class="menu-item-size-label"
            >{{ size }}</span
          >
        </div>
        <div class="menu-item-sizes-row menu-item-sizes-prices">
          <span
            v-for="(price, size) in item.sizes"
            :key="size + '-price'"
            class="menu-item-size-price"
            >{{ price }}</span
          >
        </div>
      </div>
    </div>
    <div class="menu-item-header" v-else>
      <span class="menu-item-name">{{ item.name }}</span>
      <span class="menu-item-price">{{ item.price }}</span>
    </div>
    <div v-if="item.description" class="menu-item-description">
      {{ item.description }}
    </div>
    <div v-if="item.seasonal" class="menu-item-seasonal">Seasonal</div>
    <div v-if="item.egg" class="menu-item-allergy">
      <q-icon name="ion-egg" color="orange" size="1rem">
        <q-tooltip class="bg-black text-white"> Contains egg white </q-tooltip>
      </q-icon>
    </div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
  liquor: Boolean,
});
</script>

<style scoped>
/* Sizing columns for beers/wines */
.menu-item-sizes {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1rem;
}
.menu-item-sizes-row {
  display: flex;
  gap: 1.5rem;
}
.menu-item-sizes-header {
  font-size: 1.1rem;
  font-weight: 600;
  color: #555;
  font-family: "Poiret One", cursive;
  margin-bottom: 0.1rem;
}
.menu-item-size-label {
  min-width: 48px;
  text-align: center;
}
.menu-item-sizes-prices {
  font-size: 1.15rem;
  font-weight: 700;
  color: #000;
  font-family: "Poiret One", cursive;
}
.menu-item-size-price {
  min-width: 48px;
  text-align: center;
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

.menu-item-allergy {
  display: inline-block;
  margin-top: 0.3rem;
  cursor: pointer;
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
