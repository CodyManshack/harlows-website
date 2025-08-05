<template>
  <q-page class="flex">
    <transition
      appear
      enter-active-class="animated fadeIn slower"
      leave-active-class="animated fadeOut"
      mode="out-in"
    >
      <section class="hero">
        <div :class="heroContentClasses">
          <div class="col-xs-10 col-sm-5 col-md-4 col-lg-3 col-xl-2 items-center text-center">
            <q-btn-dropdown
              square
              color="accent"
              padding="sm lg"
              :size="$q.screen.xs ? 'lg' : 'xl'"
              content-class="bg-accent no-border-radius"
              no-caps
              aria-label="View Menu"
            >
              <template v-slot:label>
                <span class="text-h5 spectral text-weight-regular capitalize-first-letter">
                  {{ t('viewMenu') }}
                </span>
              </template>

              <q-list separator>
                <q-item
                  v-for="lang in localeOptions"
                  :key="lang.value"
                  @click="goToMenu(lang.value)"
                  v-close-popup
                  clickable
                  v-ripple
                >
                  <q-item-section>
                    <q-item-label class="text-h6 text-weight-regular spectral">
                      {{ lang.label }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
          </div>
          <div class="col-xs-10 col-sm-5 col-md-4 col-lg-3 spectral">
            <h1 :class="headlineClasses">
              {{ t('headline') }}
            </h1>
            <h2 class="gt-xs text-h6 text-weight-regular q-mt-md">
              {{ t('subtitle') }}
            </h2>
          </div>
        </div>
      </section>
    </transition>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMeta, useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()
const { t, locale } = useI18n({ useScope: 'global' })

// Move static data outside of reactive context
const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' }
]

// Optimize computed property
const menuPath = computed(() => `${locale.value.toUpperCase()}_Harlow's Menu_16.04.pdf`)

// Computed classes for better performance
const heroContentClasses = computed(() => [
  $q.screen.xs ? 'justify-between' : 'justify-center',
  'row full-width hero-content'
])

const headlineClasses = computed(() => [
  $q.screen.gt.xs ? 'text-h2' : 'text-h3',
  'text-weight-regular text-italic'
])

// Optimize meta setup
useMeta(() => ({
  title: t('pageTitle') || 'Harlow\'s Bar – Classic Cocktail Lounge',
  meta: {
    description: {
      name: 'description',
      content: t('pageDescription') || 'Vintage, prohibition-era classic cocktails in a relaxed 1920s lounge.'
    }
  }
}))

// Preload menu PDFs on component mount for instant access
onMounted(() => {
  // Preload both menu PDFs for instant viewing
  const menuPaths = ['EN_Harlow\'s Menu_16.04.pdf', 'ES_Harlow\'s Menu_16.04.pdf']

  menuPaths.forEach(path => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = path
    link.as = 'document'
    document.head.appendChild(link)
  })
})

const goToMenu = (lang) => {
  locale.value = lang
  const routeData = router.resolve({ path: menuPath.value })
  window.open(routeData.href, '_blank')
}
</script>

<style lang="scss" scoped>
.capitalize-first-letter::first-letter {
  text-transform: uppercase;
}

.hero {
  display: flex;
  flex: 1;
}

.hero-content {
  align-items: center;
  justify-content: center;

  // Use more specific breakpoints and combine rules
  @media (max-width: $breakpoint-xs-max) {
    flex-direction: column-reverse;
    justify-content: space-evenly;
    margin-top: -40%;
  }

  @media (min-width: $breakpoint-sm-min) {
    margin-top: 10%;
  }
}

// Add performance optimizations
.animated {
  animation-fill-mode: both;
}

// Optimize for better text rendering
.spectral {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
