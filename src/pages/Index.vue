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
              <h2 class="poiret-one text-uppercase">{{ t(`sections[${index}].title`) }}</h2>
              <p class="text-subtitle1">{{ t(`sections[${index}].content`) }}</p>
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
              title: 'American Revival',
              content: "Nestled in the heart of El Botanic, Harlow's teleports you to the gilded ages of the 1920s with its opulent geometric motifs, jazz melodies, and marble surfaces. Whether you're savoring a classic martini or discovering a signature concoction, Harlow's promises an unparalleled experience."
            },
            {
              title: 'Tradition & Heritage',
              content: "Indulge in a carefully curated selection of traditional cocktails. We are passionate about preserving the authenticity of the classics. Our work is our art, and our commitment to precision ensures that every cocktail we create is a continuance of the craftsmanship of the past."
            },
            {
              title: "Let's Party",
              content: "Elevate your private gatherings to unparalleled heights by hosting your event at Harlows. Our intimate venue offers a captivating blend of timeless glamour and modern luxury, setting the stage for a celebration like no other. Whether it's an intimate soirée or a lively gathering, our dedicated team will work closely with you to curate an experience tailored to your vision. Indulge in handcrafted cocktails, complemented by a diverse selection of high-quality spirits, all served by neighbors you know and trust."
            }
          ]
        },
        es: {
          inquire: 'consultar',
          sections: [
            {
              title: 'Renacimiento Americano',
              content: "Enclavado en el corazón de El Botánico, Harlow's te teletransporta a la época dorada de los años 20 con sus opulentos motivos geométricos, melodías de jazz y superficies de mármol. Ya sea saboreando un martini clásico o descubriendo un brebaje de autor, Harlow's promete una experiencia sin igual."
            },
            {
              title: 'Tradición & Patrimonio',
              content: "Deléitese con una cuidada selección de cócteles tradicionales. Nos apasiona preservar la autenticidad de los clásicos. Nuestro trabajo es nuestro arte, y nuestro compromiso con la precisión garantiza que cada cóctel que creamos sea una continuación de la artesanía del pasado."
            },
            {
              title: 'Vamos de Fiesta',
              content: "Eleve sus reuniones privadas a cotas incomparables celebrando su evento en Harlows. Nuestro íntimo local ofrece una cautivadora mezcla de glamour atemporal y lujo moderno, preparando el escenario para una celebración sin igual. Tanto si se trata de una velada íntima como de una animada reunión, nuestro equipo trabajará estrechamente con usted para crear una experiencia a la medida de sus deseos. Deléitese con cócteles artesanales, complementados con una variada selección de licores de alta calidad, todo ello servido por vecinos que conoce y en los que confía."
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
        background: 'bg-secondary',
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
