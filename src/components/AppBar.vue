<template>
  <q-toolbar class="q-pa-lg justify-center">
    <router-link :to="{ name: 'home' }">
      <q-img src="~/assets/logo.png" :width="$q.screen.lt.sm ? '300px' : '360px'" class="q-mt-md"/>
    </router-link>
  </q-toolbar>
  <q-toolbar class="justify-center">
    <q-btn-dropdown flat transparent :label="t('menu')" class="text-weight-regular">
      <q-list class="bg-primary">
        <q-item
          v-for="(lang, i) in localeOptions"
          :key="i"
          @click="goToMenu(lang.value)"
          v-close-popup
          clickable
        >
          <q-item-section>
            <q-item-label>{{ lang.label }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-btn-dropdown>
    <q-btn :to="{ name: 'contact' }" flat transparent :label="t('contact')" class="text-weight-regular"></q-btn>
    <q-btn-dropdown v-if="$q.screen.gt.sm" flat transparent icon="ion-globe" class="text-weight-regular">
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
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'AppBar',
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const { t, locale } = useI18n({ useScope: 'global' })
    const menuPath = computed(() => { return `${locale.value.toUpperCase()}_Harlow's_Menu_11.12.pdf` })
    return {
      router,
      $q,
      menuPath,
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
    },
    goToMenu (lang) {
      this.selectLocale(lang)
      const routeData = this.router.resolve({ path: this.menuPath })
      window.open(routeData.href, '_blank')
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
