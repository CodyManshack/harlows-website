<template>
  <q-toolbar class="q-pa-lg justify-center">
    <router-link :to="{ name: 'home' }">
      <q-img src="~/assets/logo.png" width="360px" class="q-mt-md"/>
    </router-link>
  </q-toolbar>
  <q-toolbar class="justify-center">
    <q-btn :to="{ name: 'menu' }" flat transparent :label="t('menu')" class="text-weight-regular"></q-btn>
    <q-btn :to="{ name: 'contact' }" flat transparent :label="t('contact')" class="text-weight-regular"></q-btn>
    <q-btn-dropdown flat transparent icon="ion-globe" class="text-weight-regular">
      <q-list class="bg-primary">
        <q-item
          v-for="(lang, i) in localeOptions"
          :key="i"
          @click="selectLocale(lang.value)"
          v-close-popup
          clickable
        >
          <q-item-section>
            <q-item-label>{{ lang.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
  </q-toolbar>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'AppBar',
  setup () {
    const { t, locale } = useI18n({ useScope: 'global' })
    return {
      t,
      locale,
      localeOptions: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' }
      ]
    }
  },
  methods: {
    selectLocale (lang) {
      this.locale = lang
    }
  }
})
</script>

<style lang="scss">
.q-toolbar .q-btn-dropdown:last-child {
  position: absolute;
  right: 12px;
}
</style>
