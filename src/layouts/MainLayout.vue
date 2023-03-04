<template>
  <q-layout view="hHh lpr fFf">
    <!-- <q-header reveal flat>
      <q-toolbar></q-toolbar>
    </q-header> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MainLayout',
  components: {},
  setup () {
    return {}
  }
})
</script>
