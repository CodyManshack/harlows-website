<template>
  <div class="menu-item">
    <div class="menu-item-header">
      <span class="menu-item-name">{{ item.name }}</span>
      <span class="menu-item-price">{{ item.price | currency }}</span>
    </div>
    <div v-if="item.description" class="menu-item-description">
      {{ item.description }}
    </div>
    <div v-if="item.seasonal" class="menu-item-seasonal">Seasonal</div>
  </div>
</template>

<script setup>
defineProps({
  item: Object,
});
</script>

<script>
export default {
  filters: {
    currency(value) {
      if (typeof value !== "number") return value;
      return "$" + value;
    },
  },
};
</script>

<style scoped>
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
  color: #2c3e50;
  font-weight: 400;
  text-transform: capitalize;
  flex: 1;
}

.menu-item-price {
  font-family: "Poiret One", cursive;
  font-size: 1.3rem;
  color: #e74c3c;
  font-weight: 400;
  margin-left: 1rem;
}

.menu-item-description {
  font-size: 1rem;
  color: #5a6c7d;
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
</style>
