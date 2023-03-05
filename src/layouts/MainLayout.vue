<template>
  <q-layout view="hHh lpr fFf">
    <q-toolbar class="transparent">
      <q-space />
      <div class="column items-center q-py-lg">
        <h1 class="poiret-one no-margin text-h2 text-white text-center text-shadow">HARLOW<span>'</span>s</h1>
        <DiamondDivider style="width: 340px;" class="q-pt-xs"/>
      </div>
      <q-space />
    </q-toolbar>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import DiamondDivider from '../components/DiamondDivider.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { DiamondDivider },
  setup () {
    return {}
  }
})
</script>

<style lang="scss">
body {
  background-image: linear-gradient(0deg, rgba(0,0,0,0.75), rgba(0,0,0,0.6)), url('../assets/dope-background.svg');
  background-position: 26.75% 12%;
}
</style>
