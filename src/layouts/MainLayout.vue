<template>
  <q-layout view="hhh lpr fff">
    <q-header>
      <!-- <q-bar dense>
        <div class="row items-center no-wrap">
          <q-btn flat transparent class="poiret-one justify-center">C. Lepant 4, Valencia</q-btn>
        </div>
      </q-bar> -->
      <q-toolbar class="q-pa-lg">
        <q-space />
        <q-img src="~/assets/logo.png" width="360px" class="q-mt-md"/>
        <q-space />
      </q-toolbar>
      <q-toolbar>
        <q-space />
        <q-btn-dropdown flat transparent label="Menu">
          <q-list>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>Espanol</q-item-label>
              </q-item-section>
            </q-item>
            <q-item clickable v-close-popup>
              <q-item-section>
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn flat transparent label="About Us"></q-btn>
        <q-btn flat transparent label="Reserve A Table"></q-btn>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered>
      <q-toolbar class="transparent q-pa-md no-wrap justify-center">
        <q-item dense>
          <q-item-section>
            <q-item-label>Wednesday – Sunday</q-item-label>
            <q-item-label>20:00 – 01:30</q-item-label>
          </q-item-section>
        </q-item>
        <q-btn flat icon="ion-logo-instagram"/>
        <q-btn flat icon="ion-logo-facebook"/>
        <q-btn flat icon="ion-mail"/>
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
.q-footer {
  background-color: #D65F27;
}
.q-toolbar {
  background-color: #16342A;
}
</style>
