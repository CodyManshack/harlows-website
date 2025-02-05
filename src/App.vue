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
        keywords: { name: 'keywords', content: 'bar, cocktail bar, cocktail, great cocktails, coctelería, bars, valencia, bares, copas, speakeasy' },
        equiv: { 'http-equiv': 'Content-Type', content: 'text/html; charset=UTF-8' }
      }
    })
    return { t, locale }
  }
})
</script>

<style lang="scss">
@media (max-width: $breakpoint-sm-max) {
  body.body--dark {
    background: linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('./assets/location/bar/0.25x.png') no-repeat fixed;
    background-position: 57% 0%;
    background-size: cover;
    background-attachment: fixed;
  }
}
@media (max-width: $breakpoint-lg-max) {
  body.body--dark {
    background: linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('./assets/location/bar/0.33x.png') no-repeat fixed;
    background-position: 57% 0%;
    background-size: cover;
    background-attachment: fixed;
  }
}
@media (min-width: $breakpoint-xl-min) {
  body.body--dark {
    background: linear-gradient(180deg, rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url('./assets/location/bar/0.5x.png') no-repeat fixed;
    background-position: 57% 45%;
    background-size: cover;
    background-attachment: fixed;
  }
}
</style>
