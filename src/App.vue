<template>
  <router-view />
</template>

<script setup>
import { useMeta, useQuasar } from "quasar";

const $q = useQuasar();
$q.dark.set(true);
useMeta({
  meta: {
    keywords: {
      name: "keywords",
      content:
        "bar, cocktail bar, cocktail, great cocktails, coctelería, bars, valencia, bares, copas, speakeasy",
    },
    equiv: {
      "http-equiv": "Content-Type",
      content: "text/html; charset=UTF-8",
    },
  },
});
</script>
