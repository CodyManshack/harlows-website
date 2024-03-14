<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useMeta, useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'App',
  setup () {
    const { t, locale } = useI18n()
    const $q = useQuasar()
    $q.dark.set(true)
    useMeta({
      meta: {
        keywords: { name: 'keywords', content: 'bar, cocktail bar, cocktail, great cocktails, coctelería, bars, valencia, bares, copas' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
      }
    })
    return { t, locale }
  }
})
</script>

<style lang="scss">
body.body--dark {
  background: linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('./assets/location/bar/0.25x.png') no-repeat fixed;
  background-size: cover;
  background-position: 57% 0%;
  background-attachment: fixed;
}
</style>
