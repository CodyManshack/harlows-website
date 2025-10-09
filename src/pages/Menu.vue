<template>
  <q-page>
    <div class="menu-tabs">
      <q-tabs
        v-model="activeTab"
        class="menu-tab-nav"
        active-color="primary"
        indicator-color="primary"
      >
        <q-tab
          name="drinks"
          label="Drinks"
          class="menu-tab"
          content-class="menu-tab-label"
        />
        <q-tab
          name="food"
          label="Food"
          class="menu-tab"
          content-class="menu-tab-label"
        />
      </q-tabs>

      <q-tab-panels v-model="activeTab" class="menu-panels">
        <q-tab-panel name="drinks" class="menu-panel">
          <MenuContainer section="drinks" />
        </q-tab-panel>

        <q-tab-panel name="food" class="menu-panel">
          <MenuContainer section="food" />
        </q-tab-panel>
      </q-tab-panels>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue";
import MenuContainer from "src/components/MenuContainer.vue";

const activeTab = ref("drinks"); // Default to drinks since it's a bar
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poiret+One&display=swap");

.menu-tabs {
  width: 100%;
  max-width: 1000px;
  background-color: #f7f5ed;
  background-blend-mode: lighten;
  margin: 0 auto;
}

.menu-tab-nav {
  background: #f7f5ed;
  border-radius: 12px 12px 0 0;
  margin-bottom: 0;
}

.menu-tab {
  font-family: "Poiret One", cursive;
  font-size: 2rem;
  font-weight: 700;
  color: #111;
}

.menu-tab-label {
  font-family: "Poiret One", cursive;
  font-size: 1.2rem;
  font-weight: 600;
  color: #111 !important;
}

.menu-panels {
  background: #f7f5ed;
  min-height: 500px;
}

.menu-title {
  font-size: 3rem;
  margin-bottom: 2rem;
  text-align: center;
  font-family: "Poiret One", cursive;
  color: #2c3e50;
  font-weight: 400;
  text-shadow: 0 2px 4px rgba(44, 62, 80, 0.1);
}
</style>

<style>
.q-tab__label {
  color: #111 !important;
  font-weight: 700 !important;
  font-family: "Poiret One", cursive !important;
  font-size: 1.2rem !important;
}
</style>
