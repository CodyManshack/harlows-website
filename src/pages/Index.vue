<template>
  <q-page>
    <video autoplay loop muted>
      <source type="video/mp4" src="~/assets/video/cadillac-margarita.mp4">
    </video>
    <section>
      <div class="row">
        <div class="col-md-4 col-sm-12 harlows-light-green text-center flex items-center">
          <div class="row justify-center q-pa-lg">
            <div style="width: 80%;"><DiamondDivider /></div>
            <h2 class="poiret-one text-uppercase">American Revival</h2>
            <p class="text-subtitle1">Nestled in the heart of El Botanic, Harlow's teleports you to the gilded ages of the 1920s with its opulent geometric motifs, jazz melodies, and marble surfaces. Whether you're savoring a classic martini or discovering a signature concoction, Harlow's promises an unparalleled experience, where every sip is a journey into the golden age of glamour.</p>
            <div class="q-mt-xl" style="width: 80%;"><DiamondDivider /></div>
          </div>
        </div>
        <div class="col-md-8 col-sm-12">
          <img src="~/assets/cocktails/BlackMojito.jpg" style="width: 100%; height: 100%"/>
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <div class="col-md-8 col-sm-12">
          <img src="~/assets/cocktails/Sidecar.jpg" style="width: 100%; height: 100%"/>
        </div>
        <div class="col-md-4 col-sm-12 harlows-orange text-center flex items-center">
          <div class="row justify-center q-pa-lg">
            <div style="width: 80%;"><DiamondDivider /></div>
            <h2 class="poiret-one text-uppercase">Tradition & Heritage</h2>
            <p class="text-subtitle1">Indulge in a carefully curated selection of traditional cocktails. We are passionate about preserving the authenticity of the classics. Our work is our art, and our commitment to precision ensures that every cocktail we create is a continuance of the craftsmanship of the past.</p>
            <div class="q-mt-xl" style="width: 80%;"><DiamondDivider /></div>
          </div>
        </div>
      </div>
    </section>
    <section>
      <div class="row">
        <div class="col-md-4 col-sm-12 harlows-green text-center flex items-center">
          <div class="row justify-center q-pa-lg">
            <div style="width: 80%;"><DiamondDivider /></div>
            <h2 class="poiret-one text-uppercase">Get Bent</h2>
            <p class="text-subtitle1">Elevate your private gatherings to unparalleled heights by hosting your event at Harlows. Our intimate venue offers a captivating blend of timeless glamour and modern luxury, setting the stage for a celebration like no other. Whether it's an intimate soirée or a lively gathering, our dedicated team will work closely with you to curate an experience tailored to your vision. Indulge in handcrafted cocktails, complemented by a diverse selection of high-quality spirits, all served by neighbors you know and trust. With our attention to detail and commitment to excellence, your event will be an unforgettable affair.</p>
            <q-btn label="Inquire" class="harlows-orange q-mt-lg"></q-btn>
            <div class="q-mt-xl" style="width: 80%;"><DiamondDivider /></div>
          </div>
        </div>
        <div class="col-md-8 col-sm-12">
          <img src="~/assets/cocktails/HemingwaySpecial.jpg" style="width: 100%; height: 100%"/>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import DiamondDivider from 'src/components/DiamondDivider.vue'

export default defineComponent({
  name: 'Home',
  components: { DiamondDivider },
  setup () {
    return {
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
