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
      title: 'Harlow\'s Bar - Vintage Cocktail Lounge',
      meta: {
        description: { name: 'description', content: 'Vintage, prohibition-era cocktails in a relaxed 1920s lounge.' },
        keywords: { name: 'keywords', content: 'bar, cocktail bar, cocktail, coctelería, bars, valencia, bares, cocteleria, copas' }
      }
    })
    return { t, locale }
  }
})
</script>
