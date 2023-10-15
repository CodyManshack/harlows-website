<template>
  <q-toolbar class="q-pa-lg justify-center">
    <router-link :to="{ name: 'home' }">
      <q-img src="~/assets/logo.png" width="360px" class="q-mt-md"/>
    </router-link>
  </q-toolbar>
  <q-toolbar class="justify-center">
    <q-btn-dropdown flat transparent label="Menu" class="text-weight-regular">
      <q-list class="bg-primary">
        <q-item :to="{ name: 'menu', params: { lang: 'es'} }" v-close-popup>
          <q-item-section>
            <q-item-label>Espanol</q-item-label>
          </q-item-section>
        </q-item>
        <q-item :to="{ name: 'menu', params: { lang: 'en'} }" v-close-popup>
          <q-item-section>
            <q-item-label>English</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn :to="{ name: 'contact' }" flat transparent label="Contact" class="text-weight-regular"></q-btn>
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
    const { locale } = useI18n({ useScope: 'global' })
    return {
      locale,
      localeOptions: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Espanol' }
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
