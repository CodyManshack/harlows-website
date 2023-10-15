<template>
  <q-footer bordered class="bg-accent">
    <q-toolbar class="transparent q-pa-md no-wrap justify-center">
      <q-item dense>
        <q-item-section>
          <q-item-label>C. Lepant 4, Valencia</q-item-label>
        </q-item-section>
      </q-item>
      <q-item dense>
        <q-item-section>
          <q-item-label>Wednesday – Sunday</q-item-label>
          <q-item-label>20:00 – 01:30</q-item-label>
        </q-item-section>
      </q-item>
      <q-btn flat icon="ion-logo-instagram" href="https://www.instagram.com/harlows.bar/" target="_blank"/>
      <q-btn flat icon="ion-logo-facebook" href="https://www.facebook.com/people/Harlows-Bar/100093700941605/" target="_blank"/>
      <q-btn flat icon="ion-mail" href="mailto:kalen@harlows.bar"/>
      <q-btn flat icon="ion-navigate" href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9" target="_blank"/>
    </q-toolbar>
  </q-footer>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppFooter',
  setup () {
    const { t } = useI18n({
      locale: 'en',
      messages: {
        en: {
          daysOpen: 'Wed. – Sun.'
        },
        es: {
          daysOpen: 'X – D'
        }
      }
    })
    return { t }
  }
})
</script>
