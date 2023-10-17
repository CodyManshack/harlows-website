<template>
  <q-page>
    <video autoplay loop muted>
      <source type="video/mp4" src="~/assets/video/cadillac-margarita.mp4">
    </video>
    <section>
      <div class="row">
        <div class="col-md-4 col-sm-12 bg-secondary text-center flex items-center">
          <div class="row justify-center q-pa-lg">
            <div style="width: 80%;"><DiamondDivider /></div>
            <h2 class="poiret-one text-uppercase">{{ t('sections[0].title') }}</h2>
            <p class="text-subtitle1">{{ t('sections[0].content') }}</p>
            <div class="q-mt-xl" style="width: 80%;"><DiamondDivider /></div>
          </div>
        </div>
        <div class="col-md-8 col-sm-12">
          <img src="cocktails/BlackMojito.jpg" style="width: 100%; height: 100%"/>
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <div class="col-md-8 col-sm-12">
          <img src="cocktails/Sidecar.jpg" style="width: 100%; height: 100%"/>
        </div>
        <div class="col-md-4 col-sm-12 bg-accent text-center flex items-center">
          <div class="row justify-center q-pa-lg">
            <div style="width: 80%;"><DiamondDivider /></div>
            <h2 class="poiret-one text-uppercase">{{ t('sections[1].title') }}</h2>
            <p class="text-subtitle1">{{ t('sections[1].content') }}</p>
            <div class="q-mt-xl" style="width: 80%;"><DiamondDivider /></div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <div class="col-md-4 col-sm-12 text-center flex items-center">
          <div class="row justify-center q-pa-lg">
            <div style="width: 80%;"><DiamondDivider /></div>
            <h2 class="poiret-one text-uppercase">{{ t('sections[2].title') }}</h2>
            <p class="text-subtitle1">{{ t('sections[2].content') }}</p>
            <q-btn :label="t('inquire')" class="q-mt-lg" color="accent" href="mailto:info@harlows.bar"></q-btn>
            <div class="q-mt-xl" style="width: 80%;"><DiamondDivider /></div>
          </div>
        </div>
        <div class="col-md-8 col-sm-12">
          <img src="cocktails/HemingwaySpecial.jpg" style="width: 100%; height: 100%"/>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import DiamondDivider from 'src/components/DiamondDivider.vue'

export default defineComponent({
  name: 'Home',
  components: { DiamondDivider },
  setup () {
    const { t } = useI18n({
      messages: {
        en: {
          sections: [
            {
              title: 'American Revival',
              content: "Nestled in the heart of El Botanic, Harlow's teleports you to the gilded ages of the 1920s with its opulent geometric motifs, jazz melodies, and marble surfaces. Whether you're savoring a classic martini or discovering a signature concoction, Harlow's promises an unparalleled experience, where every sip is a journey into the golden age of glamour."
            },
            {
              title: 'Tradition & Heritage',
              content: "Indulge in a carefully curated selection of traditional cocktails. We are passionate about preserving the authenticity of the classics. Our work is our art, and our commitment to precision ensures that every cocktail we create is a continuance of the craftsmanship of the past."
            },
            {
              title: "Let's Party",
              content: "Elevate your private gatherings to unparalleled heights by hosting your event at Harlows. Our intimate venue offers a captivating blend of timeless glamour and modern luxury, setting the stage for a celebration like no other. Whether it's an intimate soirée or a lively gathering, our dedicated team will work closely with you to curate an experience tailored to your vision. Indulge in handcrafted cocktails, complemented by a diverse selection of high-quality spirits, all served by neighbors you know and trust. With our attention to detail and commitment to excellence, your event will be an unforgettable affair."
            }
          ]
        },
        es: {
          sections: [
            {
              title: 'Renacimiento Americano',
              content: "Enclavado en el corazón de El Botánico, Harlow's te teletransporta a la época dorada de los años 20 con sus opulentos motivos geométricos, melodías de jazz y superficies de mármol. Ya sea saboreando un martini clásico o descubriendo un brebaje de autor, Harlow's promete una experiencia sin igual, donde cada sorbo es un viaje a la edad dorada del glamour."
            },
            {
              title: 'Tradición & Patrimonio',
              content: "Deléitese con una cuidada selección de cócteles tradicionales. Nos apasiona preservar la autenticidad de los clásicos. Nuestro trabajo es nuestro arte, y nuestro compromiso con la precisión garantiza que cada cóctel que creamos sea una continuación de la artesanía del pasado."
            },
            {
              title: 'Vamos de Fiesta',
              content: "Eleve sus reuniones privadas a cotas incomparables celebrando su evento en Harlows. Nuestro íntimo local ofrece una cautivadora mezcla de glamour atemporal y lujo moderno, preparando el escenario para una celebración sin igual. Tanto si se trata de una velada íntima como de una animada reunión, nuestro equipo trabajará estrechamente con usted para crear una experiencia a la medida de sus deseos. Deléitese con cócteles artesanales, complementados con una variada selección de licores de alta calidad, todo ello servido por vecinos que conoce y en los que confía. Con nuestra atención al detalle y nuestro compromiso con la excelencia, su evento será inolvidable."
            }
          ]
        }
      }
    })
    return {
      t,
      sources: [
        {
          src: '~/assets/video/cadillac-margarita.mp4',
          type: 'video/mp4'
        }
      ]
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
