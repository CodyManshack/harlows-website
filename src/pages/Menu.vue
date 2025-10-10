<template>
  <q-page>
    <div class="menu-list">
      <MenuContainer section="food" />
      <MenuContainer section="drinks" />
    </div>
  </q-page>
</template>

<script setup>
import MenuContainer from "src/components/MenuContainer.vue";
</script>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Poiret+One&display=swap");

.menu-list {
  width: 100%;
  max-width: 1000px;
  background-color: #f7f5ed;
  background-blend-mode: lighten;
  margin: 0 auto;
  padding: 2rem;
  box-sizing: border-box;
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
