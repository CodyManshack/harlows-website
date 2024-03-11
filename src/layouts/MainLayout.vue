<template>
  <q-layout view="hHh lpr fff">
    <AppBar />

    <q-page-container>
      <router-view />
    </q-page-container>

    <AppFooter />
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'
import AppBar from '../components/AppBar.vue'
// import Bar from '../components/Bar.vue'
import AppFooter from '../components/AppFooter.vue'

export default defineComponent({
  name: 'MainLayout',
  components: { AppBar, AppFooter },
  setup () {
    return {}
  }
})
</script>
