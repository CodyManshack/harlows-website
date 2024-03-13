<template>
  <q-page class="flex">
    <transition appear enter-active-class="animated fadeIn slower" leave-active-class="animated fadeOut">
      <section class="hero">
          <div class="row justify-center full-width hero-content">
            <div class="col-xs-10 col-md-4 col-lg-3 col-xl-2 items-center text-center">
              <q-btn-dropdown
                square
                color="accent"
                padding="sm lg"
                :size="$q.screen.xs ? 'lg' : 'xl'"
                content-class="bg-accent no-border-radius"
                no-caps
              >
                <template v-slot:label>
                  <span class="text-h5 spectral text-weight-regular capitalize-first-letter">{{ t('viewMenu') }}</span>
                </template>

                <q-list separator>
                  <q-item
                    v-for="(lang, i) in localeOptions"
                    :key="i"
                    @click="goToMenu(lang.value)"
                    v-close-popup
                    clickable
                  >
                    <q-item-section>
                      <q-item-label class="text-h6 text-weight-regular spectral">{{ lang.label }}</q-item-label>
                    </q-item-section>
                  </q-item>
                </q-list>
              </q-btn-dropdown>
            </div>
            <div class="col-xs-10 col-md-4 col-lg-3 spectral" key="text">
              <div :class="[$q.screen.gt.sm ? 'text-h2' : 'text-h3', 'text-weight-regular text-italic' ]">
                {{ t('headline') }}
              </div>
              <div class="gt-sm text-h6 text-weight-regular q-mt-md">
                {{  t('subtitle') }}
              </div>
            </div>
          </div>
      </section>
    </transition>
  </q-page>
</template>

<script>
import { computed, defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
// import DiamondDivider from 'src/components/DiamondDivider.vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Home',
  components: { },
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const { t, locale } = useI18n({
      messages: {
        en: {
          headline: 'Classic cocktails & vintage charm',
          subtitle: 'Classic prohibition-era cocktails with a focus on staying true to the original recipes',
          viewMenu: 'view the menu'
        },
        es: {
          headline: 'Cócteles clásicos y encanto vintage',
          subtitle: 'Cócteles clásicos de la época de la prohibición con un enfoque que se mantiene fiel a las recetas originales',
          viewMenu: 'ver la carta'
        }
      }
    })
    const localeOptions = [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Español' }
    ]
    const menuPath = computed(() => { return `${locale.value.substring(0, 2).toUpperCase()}_Harlow's Menu_06.03.pdf` })
    const sections = [
      {
        background: 'bg-primary',
        img: 'cocktails/dirtymartini/0.25x.png'
      },
      {
        background: 'bg-accent',
        img: 'cocktails/amarettosour/0.25x.png'
      },
      {
        background: 'bg-primary',
        img: 'cocktails/aviation/0.25x.png'
      }
    ]
    return {
      $q,
      t,
      locale,
      localeOptions,
      menuPath,
      router,
      sections
    }
  },
  methods: {
    goToMenu (lang) {
      this.locale = lang
      const routeData = this.router.resolve({ path: this.menuPath })
      window.open(routeData.href, '_blank')
    },
    flipOrder (index) {
      return index === 1 && this.$q.screen.gt.sm
    }
  }
})
</script>

<style lang="scss">
video {
  display: block; // block fixes pixel buffer issue on bottom of video element
  width: 100%;
  height: 100%;
}
.max-height-full {
  max-height: calc(100% - 68px - 50px - 24px);
}
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
}
@media (max-width: $breakpoint-sm-max) {
  .hero-content {
    flex-direction: column-reverse;
    justify-content: space-evenly;
    margin-top: -40%;
  }
}
@media (min-width: $breakpoint-md-min) {
  .hero-content {
    margin-top: 10%;
  }
}
</style>
