<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'App',
  setup () {
    const { t, locale } = useI18n()
    const $q = useQuasar()
    $q.dark.set(true)
    return { t, locale }
  }
})
</script>
