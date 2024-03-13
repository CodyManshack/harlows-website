<template>
  <q-page class="max-height-full">
    <section>
      <div class="row justify-center" style="padding-top: 14%;">
        <transition appear enter-active-class="animated fadeIn slower">
          <div class="col-xs-10 text-h3 text-weight-regular spectral text-italic" key="text">
            {{ t('headline') }}
          </div>
      </transition>
      </div>
      <div class="row justify-center" style="padding-top: 60%;">
        <div class="col-xs-10 items-center text-center">
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
      </div>
    </section>
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
          inquire: 'inquire',
          headline: 'Classic cocktails & vintage charm',
          sections: [
            {
              title: '1920s Classics',
              content: "A new member in the El Carmen neighborhood of Valencia, Harlow's Bar specializes in classic prohibition-era cocktails and focuses on staying true to the original recipes. This cozy little hole in the wall offers the perfect place to for a night out: comfortable vintage seating, early 20th-century jazz, and an extensive list of both famous cocktails and new surprises for you to discover."
            },
            {
              title: 'A Cut Above',
              content: "We take pride in our curated list of liquors and wines. We forego what is common and what it easy and instead stock our shelves with some of the highest-quality liquors from the peninsula and around the world. Our selection of gourmet and artisan snacks offer you new flavors to explore."
            },
            {
              title: "Party like it's 1929",
              content: "Add a touch of class and coziness to your next gathering by hosting your event at Harlow's. Whether you choose a small gathering in the loft or would like the entire bar to yourself, the team at Harlow's will ensure your event has the perfect ambiance and fantastic cocktails and treats."
            }
          ],
          viewMenu: 'view the menu'
        },
        es: {
          inquire: 'consultar',
          headline: 'Cócteles clásicos y encanto vintage',
          sections: [
            {
              title: 'Clásicos de los años 20',
              content: "Un nuevo miembro en el barrio valenciano del Carmen, el Harlow's Bar se especializa en cócteles clásicos de la época de la prohibición y se centra en mantenerse fiel a las recetas originales. Esta pequeña y acogedora joya ofrece el lugar perfecto para una noche de copas: cómodos asientos de época, jazz de principios del siglo XX y una extensa lista tanto de cócteles famosos como de nuevas sorpresas por descubrir."
            },
            {
              title: 'Por encima de los demás',
              content: "Estamos orgullosos de nuestra selecta lista de licores y vinos. Renunciamos a lo común y a lo fácil y, en su lugar, abastecemos nuestras estanterías con algunos de los licores de mayor calidad de la península y de todo el mundo. Nuestra selección de aperitivos gourmet y artesanos te ofrece nuevos sabores para explorar."
            },
            {
              title: 'Fiesta como si fuera 1929',
              content: "Añada un toque de clase y calidez a su próxima reunión celebrando su evento en Harlow's. Tanto si elige una pequeña reunión en el loft como si desea todo el bar para usted solo, el equipo de Harlow's se asegurará de que su evento tenga el ambiente perfecto y unos cócteles y delicias fantásticos."
            }
          ],
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
</style>
