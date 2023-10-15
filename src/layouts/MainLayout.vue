<template>
  <q-layout view="hhh lpr fff">
    <q-header>
      <Bar />
      <AppBar />
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>

    <AppFooter />
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import AppBar from '../components/AppBar.vue'
import Bar from '../components/Bar.vue'
import AppFooter from '../components/AppFooter.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { AppBar, Bar, AppFooter },
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
