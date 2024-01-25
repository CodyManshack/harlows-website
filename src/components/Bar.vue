<template>
  <q-bar class="bg-accent">
    <q-space/>
    <q-btn
      flat
      transparent
      class="text-weight-regular"
      :size="$q.screen.lt.sm ? 'sm' : 'md'"
      href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9"
      target="_blank"
    >
      C. Lepant 4, Valencia
      <span :class="[ $q.screen.lt.sm ? 'q-px-sm' : 'q-px-md', 'wrap' ]">{{ t('daysOpen1') }}</span>
      17:00 – 00:00
      <span :class="[ $q.screen.lt.sm ? 'q-px-sm' : 'q-px-md' ]">{{ t('daysOpen2') }}</span>
      17:00 – 01:30
    </q-btn>
    <q-space/>
  </q-bar>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Bar',
  setup () {
    const $q = useQuasar()
    const { t } = useI18n()
    return { $q, t }
  }
})
</script>
