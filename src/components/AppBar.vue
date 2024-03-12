<template>
  <q-header class="bg-primary">
    <q-toolbar class="q-py-sm justify-center">
      <q-btn
        flat
        dense
        icon="menu"
        style="position: absolute; left: 12px; top: 8px;"
        @click="drawer = !drawer"
      />
      <router-link :to="{ name: 'home' }">
        <q-img
          src="~/assets/logo-0.1x.png"
          :width="$q.screen.gt.md ? '260px' : '140px'"
          style="color: #7a3c18;"
        />
      </router-link>
    </q-toolbar>
  </q-header>
  <q-drawer
    v-model="drawer"
    show-if-above
    class="bg-primary"
    :width="180"
    dark
  >
    <q-list padding>
      <q-item-label header>{{ t('menuCondensed') }}</q-item-label>
      <q-item
        v-for="(lang, i) in localeOptions"
        :key="i"
        @click="goToMenu(lang.value)"
        v-close-popup
        clickable
        v-ripple
        class="q-pl-lg"
      >
        <q-item-section>
          <q-item-label>{{ lang.label }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>Gallery</q-item-label>
          <q-item-label caption>Our pride and joy</q-item-label>
        </q-item-section>
      </q-item>
      <!-- <q-item
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>About Us</q-item-label>
        </q-item-section>
      </q-item> -->
      <q-item
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>{{ t('contact') }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="full-width text-center" style="position: fixed; bottom: 12px;">
      <div class="text-caption text-grey-6">© {{ new Date().getFullYear() }} Harlow's Bar</div>
    </div>
  </q-drawer>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'AppBar',
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const { t, locale } = useI18n({ useScope: 'global' })
    const menuPath = computed(() => { return `${locale.value.toUpperCase()}_Harlow's Menu_06.03.pdf` })
    return {
      drawer: ref(false),
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
.q-item__label::first-letter {
  text-transform: capitalize;
}
</style>
