<template>
  <q-page>
    <section class="">
      <div class="row justify-center text-center">
        <div class="col-xs-12">
          <h3 class="capitalize-first-letter text-h3 text-weight-regular spectral text-italic">{{ t('gallery') }}</h3>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-xs-12 items-center text-center">
          <q-intersection
            v-for="(image, i) in images"
            :key="i"
            transition="scale"
          >
            <q-card flat class="bg-transparent q-mb-xl">
              <q-img :src="image.src">
                <div v-if="image.title" class="spectral text-h5 absolute-bottom text-right">{{ image.title }}</div>
              </q-img>
            </q-card>
          </q-intersection>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

import amarettosour010 from '../assets/cocktails/amarettosour/0.1x.png'
import aviation010 from '../assets/cocktails/aviation/0.1x.png'
import bacardicocktail010 from '../assets/cocktails/bacardicocktail/0.1x.png'
import blackmojito025 from '../assets/cocktails/blackmojito/0.25x.png'
import boulevardier010 from '../assets/cocktails/boulevardier/0.1x.png'
import dirtymartini010 from '../assets/cocktails/dirtymartini/0.1x.png'
import hemingwayspecial010 from '../assets/cocktails/hemingwayspecial/0.1x.png'
import mulledwine010 from '../assets/cocktails/mulledwine/0.1x.png'
import orangeblossom010 from '../assets/cocktails/orangeblossom/0.1x.png'
import rustynail010 from '../assets/cocktails/rustynail/0.1x.png'
import stairs010 from '../assets/location/stairs/0.1x.png'
import whiskeysour033 from '../assets/cocktails/whiskeysour/0.33x.png'

export default defineComponent({
  name: 'Gallery',
  setup () {
    const images = [
      {
        src: dirtymartini010,
        title: 'Dirty Martini'
      },
      {
        src: whiskeysour033,
        title: 'Whiskey Sour'
      },
      {
        src: aviation010,
        title: 'Aviation'
      },
      {
        src: orangeblossom010,
        title: 'Orange Blossom'
      },
      {
        src: rustynail010,
        title: 'The Rusty Nail'
      },
      {
        src: amarettosour010,
        title: 'Amaretto Sour'
      },
      {
        src: bacardicocktail010,
        title: 'Bacardi Cocktail'
      },
      {
        src: mulledwine010,
        title: 'Mulled Wine'
      },
      {
        src: boulevardier010,
        title: 'Boulevardier'
      },
      {
        src: blackmojito025,
        title: 'Black Mojito'
      },
      {
        src: hemingwayspecial010,
        title: 'Hemingway Special'
      },
      {
        src: stairs010
      }
    ]
    const { t } = useI18n({})
    return { images, t }
  },
  methods: {}
})
</script>

<style lang="scss">
.capitalize-first-letter::first-letter {
  text-transform: capitalize;
}
</style>
