<template>
  <q-layout container style="height: 100svh;" view="hHh lpr fff">
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
