<template>
  <q-layout container style="height: 100svh" view="hHh lpr fff">
    <AppBar />
    <q-page-container>
      <NuxtPage />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import AppBar from "src/components/AppBar.vue";
</script>
