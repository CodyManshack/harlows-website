<template>
  <q-header :class="['bg-primary', { 'appbar-transparent': isTransparent }]">
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
        <div v-for="dayHour in dayHourCombos" :key="`${dayHour.day}-${locale.value}`">
          <span :class="[ $q.screen.lt.sm ? 'q-pr-xs' : 'q-pr-md' ]">{{ dayHour.day }}</span>
          {{ dayHour.hours }}
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
        @click="scrollToSection('gallery')"
        v-close-popup
      >
        <q-item-section>
          <q-item-label class="text-h6 text-weight-regular">{{ t('gallery') }}</q-item-label>
        </q-item-section>
      </q-item>
      <q-item
        clickable
        v-ripple
        @click="scrollToSection('contact')"
        v-close-popup
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

<script setup>
import { computed, ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()
const { t, locale } = useI18n({ useScope: 'global' })
const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' }
]
const drawer = ref(false)
const isTransparent = ref(false)
const scrollTarget = ref(null)

// Listen for scroll to toggle transparency, using the real scroll container
const onScroll = () => {
  const el = scrollTarget.value
  let scrollTop = 0
  if (el && typeof el.scrollTop === 'number') {
    scrollTop = el.scrollTop
  } else {
    scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  }
  isTransparent.value = scrollTop > 20
}

onMounted(() => {
  const el = document.querySelector('.scroll') || document.querySelector('.main-content') || window
  scrollTarget.value = el
  const target = el === window ? window : el
  target.addEventListener('scroll', onScroll, { passive: true })
  onScroll()
})

onUnmounted(() => {
  const el = scrollTarget.value
  const target = el === window ? window : el
  if (target && target.removeEventListener) {
    target.removeEventListener('scroll', onScroll)
  }
})
const menuPath = computed(() => { return `${locale.value.toUpperCase()}_Harlow's Menu_16.04.pdf` })
const dayHourCombos = computed(() => {
  // Explicitly access locale.value to ensure reactivity
  // eslint-disable-next-line no-unused-vars
  const currentLocale = locale.value
  return [
    { day: t('wedThurs'), hours: '19 – 01' },
    { day: t('friyay'), hours: '19 – 01:30' },
    { day: t('sat'), hours: '18 – 01:30' },
    { day: t('sun'), hours: '19 – 00' }
  ]
})

const selectLocale = (lang) => {
  locale.value = lang
}

const goToMenu = (lang) => {
  selectLocale(lang)
  const routeData = router.resolve({ path: menuPath.value })
  window.open(routeData.href, '_blank')
}

const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  }
}
</script>

<style lang="scss">
.q-item__label::first-letter {
  text-transform: capitalize;
}

.q-header.bg-primary {
  background-color: #16342A !important; /* solid primary by default */
  transition: background-color 0.3s;
}

.q-header.appbar-transparent {
  background-color: rgba(22, 52, 42, 0.7) !important; /* slightly transparent when scrolled */
}
</style>
