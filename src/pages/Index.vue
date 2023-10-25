<template>
  <q-page>
    <video autoplay loop muted>
      <source type="video/mp4" src="~/assets/video/cadillac-margarita.mp4">
    </video>
    <section v-for="(section, index) in sections" :key="index" :class="[section.background, 'row', 'justify-center']">
      <div class="col-xs-12 col-md-10 col-lg-6">
        <div class="row justify-center">
          <div class="col-xs-12 col-md-4 text-center flex items-center">
            <div class="row justify-center q-pa-lg">
              <div style="width: 80%;"><DiamondDivider /></div>
              <h3 class="poiret-one text-uppercase">{{ t(`sections[${index}].title`) }}</h3>
              <p class="text-subtitle1 text-grey-4">{{ t(`sections[${index}].content`) }}</p>
              <div class="q-mt-xl" style="width: 80%;"><DiamondDivider /></div>
            </div>
          </div>
          <div :class="[flipOrder(index) ? 'order-first' : '', 'col-md-6', 'col-12', 'flex', 'items-center']">
            <img :src="section.img" style="max-width: 100%;" />
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DiamondDivider from 'src/components/DiamondDivider.vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'Home',
  components: { DiamondDivider },
  setup () {
    const $q = useQuasar()
    const { t } = useI18n({
      messages: {
        en: {
          inquire: 'inquire',
          sections: [
            {
              title: '1920s Classics',
              content: "A new member in the El Botànic neighborhood of Valencia, Harlow's Bar specializes in classic prohibition-era cocktails and focuses on staying true to the original recipes. This cozy little hole in the wall offers the perfect place to for a night out: comfortable vintage seating, early 20th-century jazz, and an extensive list of both famous cocktails and new surprises for you to discover."
            },
            {
              title: 'A Cut Above',
              content: "We take pride in our curated list of liquors and wines. We forego what is common and what it easy and instead stock our shelves with some of the highest-quality liquors from the peninsula and around the world. Our selection of tapas includes items inspired by mediterranean cuisine and our home state of Texas."
            },
            {
              title: "Party like it's 1929",
              content: "Add a touch of class and coziness to your next gathering by hosting your event at Harlow's. Whether you choose a small gathering in the loft or would like the entire bar to yourself, the team at Harlow's will ensure your event has the perfect ambiance and fantastic cocktails and tapas."
            }
          ]
        },
        es: {
          inquire: 'consultar',
          sections: [
            {
              title: 'Clásicos de los años 20',
              content: "Un nuevo miembro en el barrio valenciano de El Botànic, el Harlow's Bar se especializa en cócteles clásicos de la época de la prohibición y se centra en mantenerse fiel a las recetas originales. Esta pequeña y acogedora joya ofrece el lugar perfecto para una noche de copas: cómodos asientos de época, jazz de principios del siglo XX y una extensa lista tanto de cócteles famosos como de nuevas sorpresas por descubrir."
            },
            {
              title: 'Por encima de los demás',
              content: "Estamos orgullosos de nuestra selecta lista de licores y vinos. Renunciamos a lo común y a lo fácil y, en su lugar, abastecemos nuestras estanterías con algunos de los licores de mayor calidad de la península y de todo el mundo. Nuestra selección de tapas incluye artículos inspirados en la cocina mediterránea y en nuestro estado de origen, Texas."
            },
            {
              title: 'Fiesta como si fuera 1929',
              content: "Añada un toque de clase y calidez a su próxima reunión celebrando su evento en Harlow's. Tanto si elige una pequeña reunión en el loft como si desea todo el bar para usted solo, el equipo de Harlow's se asegurará de que su evento tenga el ambiente perfecto y unos cócteles y tapas fantásticos."
            }
          ]
        }
      }
    })
    const sections = [
      {
        background: 'bg-primary',
        img: 'cocktails/blackmojito/0.25x.png'
      },
      {
        background: 'bg-accent',
        img: 'cocktails/brandyalexander/0.25x.png'
      },
      {
        background: 'bg-primary',
        img: 'cocktails/hemingwayspecial/0.25x.png'
      }
    ]
    return {
      $q,
      t,
      sections,
      sources: [
        {
          src: '~/assets/video/cadillac-margarita.mp4',
          type: 'video/mp4'
        }
      ]
    }
  },
  methods: {
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
</style>
