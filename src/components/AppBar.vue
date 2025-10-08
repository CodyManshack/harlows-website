<template>
  <q-header :class="['bg-primary', { 'is-transparent': isTransparent }]">
    <q-toolbar class="app-toolbar justify-center">
      <q-btn
        flat
        dense
        icon="menu"
        style="position: absolute; left: 14px; top: 14px;"
        @click="drawer = !drawer"
        aria-label="Menu"
      />
      <router-link :to="{ name: 'home' }" aria-label="Home">
        <q-img
          src="~/assets/logo-0.1x.png"
          :width="$q.screen.gt.sm ? '260px' : '140px'"
          alt="Harlow's Bar Logo"
        />
      </router-link>
    </q-toolbar>
  <q-bar :class="['bg-accent hours-bar', { 'is-transparent': isTransparent }]">
      <div :class="[ $q.screen.gt.sm ? 'text-body1' : 'text-caption', 'row no-wrap full-width justify-evenly spectral hours-content']">
        <div
          v-for="group in dayHourCombos"
          :key="group.label + group.hours"
          :class="['hours-item', { 'is-today': group.isToday }]"
        >
          <span :class="[ $q.screen.lt.sm ? 'q-pr-xs' : 'q-pr-md', group.isToday ? 'hours-today' : '' ]">{{ group.label }}</span>
          <span :class="group.isToday ? 'hours-today' : ''">{{ group.hours }}</span>
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
import { businessHours, jsDayToKey } from './businessHours'

const todayIdx = new Date().getDay()
const todayKey = jsDayToKey[todayIdx]
const dayHourCombos = computed(() => {
  return businessHours.map(group => {
    // Is today in this group?
    const isToday = group.days.includes(todayKey)
    return {
      label: t(group.labelKey),
      hours: group.hours,
      isToday,
      days: group.days.map(dk => t(dk)).join(', ')
    }
  })
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

// Solid backgrounds by default
.q-header.bg-primary {
  background-color: #16342A !important;
  transition: background-color 0.3s;
}
.q-bar.bg-accent {
  background-color: #95572F !important;
  transition: background-color 0.3s;
}

// Shared transparency class for both
.q-header.is-transparent {
  background-color: rgba(22, 52, 42, 0.7) !important;
}
.q-bar.is-transparent {
  background-color: rgba(149, 87, 47, 0.7) !important;
}
.hours-today {
  color: #fff !important;
  font-weight: bold;
  text-shadow: 0 1px 4px rgba(0,0,0,0.35);
}

/* Increased header and hours bar sizes for breathing room */
.app-toolbar {
  min-height: 64px;
  padding-top: 6px;
  padding-bottom: 6px;
}
.hours-bar {
  min-height: 30px;
}
.hours-content {
  font-size: 13px !important;
}
.hours-item {
  display: flex;
  align-items: center;
}
.hours-item.is-today::before {
  content: '';
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 2px;
  box-shadow: 0 0 6px rgba(0,0,0,0.25);
}

/* Tighter baseline and consistent line height to avoid vertical shift */
.hours-content {
  line-height: 1.3;
}
</style>
