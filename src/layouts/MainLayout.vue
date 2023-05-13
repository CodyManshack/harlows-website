<template>
  <q-layout view="hhh lpr fFf">
    <q-toolbar class="bg-green">
      <q-space />
      <q-btn flat round dense icon="ion-menu" />
      <!-- <q-space />
      <div class="column items-center q-mt-xl">
        <h1 class="poiret-one no-margin text-h2 text-center text-shadow">HARLOW<span>'</span>s</h1>
        <DiamondDivider style="width: 340px;" class="q-pt-xs"/>
      </div>
      <q-space /> -->
    </q-toolbar>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer class="transparent">
      <q-toolbar class="transparent">
        <q-item dense>
          <q-item-section>
            <q-item-label class="poiret-one text-shadow">wednesday – sunday</q-item-label>
            <q-item-label class="poiret-one text-shadow font-weight-thin">17:00 – 01:00</q-item-label>
          </q-item-section>
        </q-item>
        <q-space/>
        <q-btn flat icon="ion-logo-instagram"/>
        <q-btn flat icon="ion-logo-facebook"/>
        <q-btn flat icon="ion-call"/>
        <q-btn flat icon="ion-navigate" />
      </q-toolbar>
    </q-footer>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
// import DiamondDivider from '../components/DiamondDivider.vue'

export default defineComponent({
  name: 'MainLayout',
  // components: { DiamondDivider },
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
.full-width {
  width: 100%;
}
</style>
