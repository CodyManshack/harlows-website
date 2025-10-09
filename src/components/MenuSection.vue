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
        <h3 class="menu-subsection-title">{{ subkey }}</h3>
        <MenuItem
          v-for="item in sub.items"
          :key="item.name"
          :item="item"
          :liquor="title === 'liquors' || subkey === 'gin'"
        />
      </div>
    </template>
  </section>
</template>

<script setup>
import MenuItem from "./MenuItem.vue";
defineProps({
  title: String,
  subtitle: String,
  items: Array,
  subsections: Object,
});
</script>

<style scoped>
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

.menu-subsection-title {
  font-size: 1.6rem;
  margin-top: 2rem;
  margin-bottom: 1rem;
  font-family: "Poiret One", cursive;
  color: #000;
  text-transform: capitalize;
  font-weight: 500;
  border-left: 4px solid #3498db;
  padding-left: 1rem;
}
</style>
