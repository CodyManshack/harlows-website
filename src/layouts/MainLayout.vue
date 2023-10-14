<template>
  <q-layout view="hhh lpr fff">
    <q-header>
      <q-bar class="bg-accent">
        <q-space/>
        <q-btn
          flat
          transparent
          class="text-weight-regular"
          size="md"
          href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9"
          target="_blank"
        >
        C. Lepant 4, Valencia <span class="spacer"/>Wednesday – Sunday <span class="spacer"/>20:00 – 01:30
        </q-btn>
        <q-space/>
      </q-bar>
      <q-toolbar class="q-pa-lg">
        <q-space />
        <router-link :to="{ name: 'home' }">
          <q-img src="~/assets/logo.png" width="360px" class="q-mt-md"/>
        </router-link>
        <q-space />
      </q-toolbar>
      <q-toolbar>
        <q-space />
        <q-btn-dropdown flat transparent label="Menu" class="text-weight-regular">
          <q-list>
            <q-item :to="{ name: 'menu', params: { lang: 'es'} }" v-close-popup>
              <q-item-section>
                <q-item-label>Espanol</q-item-label>
              </q-item-section>
            </q-item>
            <q-item :to="{ name: 'menu', params: { lang: 'en'} }" v-close-popup>
              <q-item-section>
                <q-item-label>English</q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-btn-dropdown>
        <q-btn :to="{ name: 'contact' }" flat transparent label="Contact" class="text-weight-regular"></q-btn>
        <q-btn flat transparent label="Reserve A Table" class="text-weight-regular"></q-btn>
        <q-space />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer bordered class="bg-accent">
      <q-toolbar class="transparent q-pa-md no-wrap justify-center">
        <q-item dense>
          <q-item-section>
            <q-item-label>C. Lepant 4, Valencia</q-item-label>
          </q-item-section>
        </q-item>
        <q-item dense>
          <q-item-section>
            <q-item-label>Wednesday – Sunday</q-item-label>
            <q-item-label>20:00 – 01:30</q-item-label>
          </q-item-section>
        </q-item>
        <q-btn flat icon="ion-logo-instagram" href="https://www.instagram.com/harlows.bar/" target="_blank"/>
        <q-btn flat icon="ion-logo-facebook" href="https://www.facebook.com/people/Harlows-Bar/100093700941605/" target="_blank"/>
        <q-btn flat icon="ion-mail" href="mailto:kalen@harlows.bar"/>
        <q-btn flat icon="ion-navigate" href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9" target="_blank"/>
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
.spacer {
  padding: 0 10px;
}
</style>
