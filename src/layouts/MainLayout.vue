<template>
  <q-layout view="hHh lpr fff">
    <AppBar />

    <q-page-container>
      <router-view />
    </q-page-container>

    <AppFooter />
  </q-layout>
</template>

<script setup>
import AppBar from '../components/AppBar.vue'
import AppFooter from '../components/AppFooter.vue'
</script>
