<template>
  <q-header class="bg-primary">
    <q-toolbar class="q-py-sm justify-center">
      <q-btn
        flat
        dense
        icon="menu"
        style="position: absolute; left: 12px; top: 8px;"
        @click="drawer = !drawer"
        aria-label="Menu"
      />
      <router-link :to="{ name: 'home' }" aria-label="Home">
        <q-img
          src="~/assets/logo-0.1x.png"
          :width="$q.screen.gt.sm ? '260px' : '140px'"
          style="color: #7a3c18;"
          alt="Harlow's Bar Logo"
        />
      </router-link>
    </q-toolbar>
    <q-bar dense class="bg-accent">
      <div :class="[ $q.screen.gt.sm ? 'text-body1' : 'text-caption', 'row no-wrap full-width justify-evenly spectral']" style="font-size: 12px;">
        <div>
          <span :class="[ $q.screen.lt.sm ? 'q-pr-xs' : 'q-pr-md' ]">{{ t('daysOpen1') }}</span>
          19 – 01
        </div>
        <div>
          <span :class="[ $q.screen.lt.sm ? 'q-pr-xs' : 'q-pr-xs' ]">{{ t('daysOpen2') }}</span>
          18 – 01:30
        </div>
        <div>
          <span :class="[ $q.screen.lt.sm ? 'q-pr-xs' : 'q-pr-xs' ]">{{ t('daysOpen3') }}</span>
          17 – 01:30
        </div>
      </div>
    </q-bar>
  </q-header>
  <q-drawer
    v-model="drawer"
    class="bg-primary"
    :width="$q.screen.gt.sm ? 240 : 180"
    dark
    behavior="mobile"
  >
    <q-list padding class="spectral">
      <q-item-label header class="text-body1">{{ t('menuCondensed') }}</q-item-label>
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
          <q-item-label class="text-h6 text-weight-regular">{{ lang.label }}</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <q-item
        clickable
        v-ripple
        :to="{ name: 'gallery' }"
        active-class="bg-secondary text-white"
      >
        <q-item-section>
          <q-item-label class="text-h6 text-weight-regular">{{ t('gallery') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        :to="{ name: 'contact' }"
        active-class="bg-secondary text-white"
      >
        <q-item-section>
          <q-item-label class="text-h6 text-weight-regular">{{ t('contact') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9"
        target="_blank"
      >
        <q-item-section>
          <q-item-label class="text-h6 text-weight-regular">{{ t('navigate') }}</q-item-label>
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
    const menuPath = computed(() => { return `${locale.value.toUpperCase()}_Harlow's Menu_25.09.pdf` })
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
