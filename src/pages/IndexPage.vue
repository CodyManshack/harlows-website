<template>
  <q-page class="cool-background">
    <div class="column justify-center items-center landing-hero">
      <h1 class="poiret-one no-margin text-white text-center text-shadow">HARLOW<span>'</span>s</h1>
      <DiamondDivider style="width: 540px;"/>
      <q-list dark class="q-mt-md">
        <q-item clickable>
          <q-item-label class="text-white poiret-one text-h3 text-center text-shadow">menu</q-item-label>
        </q-item>
        <q-item clickable>
          <q-item-label class="text-white poiret-one text-h3 text-center text-shadow">gallery</q-item-label>
        </q-item>
        <q-item clickable>
          <q-item-label class="text-white poiret-one text-h3 text-center text-shadow">about us</q-item-label>
        </q-item>
        <q-item clickable>
          <q-item-label class="text-white poiret-one text-h3 text-center text-shadow">socials</q-item-label>
        </q-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
import DiamondDivider from '../components/DiamondDivider.vue'
</script>

<style lang="scss" scoped>
.poiret-one {
  font-weight: 600;
}
.text-shadow {
  text-shadow: 2px 2px #000;
}
.cool-background {
  background-image: linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0.6)), url('../assets/dope-background.svg');
}
.landing-hero {
  height: 1000px;
  position: relative;
}
.q-item__label{
  width: 100%;
}
</style>
