<template>
  <q-page>
    <div class="menu-list">
      <MenuContainer />
    </div>
  </q-page>
</template>

<script setup>
import MenuContainer from "src/components/MenuContainer.vue";
</script>

<style scoped>
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
