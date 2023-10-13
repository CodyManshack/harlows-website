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
.harlows-light-green {
  background-color: #334D44;
}
</style>
