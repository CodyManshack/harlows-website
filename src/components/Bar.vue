<template>
  <q-bar class="bg-accent">
    <q-space/>
    <q-btn
      flat
      transparent
      class="text-weight-regular"
      size="md"
      href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9"
      target="_blank"
    >
      C. Lepant 4, Valencia
    </q-btn>
    <div class="text-uppercase" style="font-size: 14px;">{{ t('daysOpen') }}</div>
    <div style="font-size: 14px;">20:00 – 01:30</div>
    <q-space/>
  </q-bar>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Bar',
  setup () {
    const { t } = useI18n({})
    return { t }
  }
})
</script>
