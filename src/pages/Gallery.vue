<template>
  <q-page>
    <section class="">
      <div class="row justify-center text-center">
        <div class="col-xs-12">
          <transition appear enter-active-class="animated fadeIn slower" leave-active-class="animated fadeOut">
            <h1 key="text" class="capitalize-first-letter text-h3 text-weight-regular spectral text-italic">{{ t('gallery') }}</h1>
          </transition>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-xs-12 col-sm-10 col-lg-8 col-xl-6">
          <div :class="[$q.screen.gt.sm ? 'q-gutter-xl' : 'q-gutter-y-xl', 'row justify-center']">
            <div
              class="col-xs-12 col-sm-10 col-md-4 col-lg-3"
              v-for="(image, i) in images"
              :key="i"
            >
              <q-intersection
                :key="i"
                once
                transition="fade"
              >
                <q-card flat class="bg-transparent">
                  <q-img :src="image.src" loading="lazy" :alt="image.title">
                    <div v-if="image.title" class="spectral text-h5 absolute-bottom text-right">{{ image.title }}</div>
                  </q-img>
                </q-card>
              </q-intersection>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

import amarettosour010 from '../assets/cocktails/amarettosour/0.1x.png'
import amarettosour033 from '../assets/cocktails/amarettosour/0.33x.png'
import amarettosour050 from '../assets/cocktails/amarettosour/0.5x.png'
import aviation010 from '../assets/cocktails/aviation/0.1x.png'
import aviation033 from '../assets/cocktails/aviation/0.33x.png'
import aviation050 from '../assets/cocktails/aviation/0.5x.png'
import bacardicocktail010 from '../assets/cocktails/bacardicocktail/0.1x.png'
import bacardicocktail025 from '../assets/cocktails/bacardicocktail/0.25x.png'
import bacardicocktail033 from '../assets/cocktails/bacardicocktail/0.33x.png'
import bar010 from '../assets/location/bar/0.1x.png'
import bar033 from '../assets/location/bar/0.33x.png'
import bar050 from '../assets/location/bar/0.5x.png'
import blackmojito010 from '../assets/cocktails/blackmojito/0.1x.png'
import blackmojito033 from '../assets/cocktails/blackmojito/0.33x.png'
import blackmojito050 from '../assets/cocktails/blackmojito/0.5x.png'
import boulevardier010 from '../assets/cocktails/boulevardier/0.1x.png'
import boulevardier025 from '../assets/cocktails/boulevardier/0.25x.png'
import boulevardier033 from '../assets/cocktails/boulevardier/0.33x.png'
import dirtymartini010 from '../assets/cocktails/dirtymartini/0.1x.png'
import dirtymartini033 from '../assets/cocktails/dirtymartini/0.33x.png'
import dirtymartini050 from '../assets/cocktails/dirtymartini/0.5x.png'
import hemingwayspecial010 from '../assets/cocktails/hemingwayspecial/0.1x.png'
import hemingwayspecial033 from '../assets/cocktails/hemingwayspecial/0.33x.png'
import hemingwayspecial050 from '../assets/cocktails/hemingwayspecial/0.5x.png'
import mulledwine010 from '../assets/cocktails/mulledwine/0.1x.png'
import mulledwine025 from '../assets/cocktails/mulledwine/0.25x.png'
import mulledwine033 from '../assets/cocktails/mulledwine/0.33x.png'
import orangeblossom010 from '../assets/cocktails/orangeblossom/0.1x.png'
import orangeblossom033 from '../assets/cocktails/orangeblossom/0.33x.png'
import orangeblossom050 from '../assets/cocktails/orangeblossom/0.5x.png'
import rustynail010 from '../assets/cocktails/rustynail/0.1x.png'
import rustynail033 from '../assets/cocktails/rustynail/0.33x.png'
import rustynail050 from '../assets/cocktails/rustynail/0.5x.png'
import stairs010 from '../assets/location/stairs/0.1x.png'
import stairs025 from '../assets/location/stairs/0.25x.png'
import stairs033 from '../assets/location/stairs/0.33x.png'
import whiskeysour010 from '../assets/cocktails/whiskeysour/0.1x.png'
import whiskeysour033 from '../assets/cocktails/whiskeysour/0.33x.png'
import whiskeysour050 from '../assets/cocktails/whiskeysour/0.5x.png'

export default defineComponent({
  name: 'Gallery',
  setup () {
    const $q = useQuasar()

    const images = [
      {
        src: $q.screen.gt.md ? dirtymartini050 : $q.screen.gt.sm ? dirtymartini033 : dirtymartini010,
        title: 'Dirty Martini'
      },
      {
        src: $q.screen.gt.md ? whiskeysour050 : $q.screen.gt.sm ? whiskeysour033 : whiskeysour010,
        title: 'Whiskey Sour'
      },
      {
        src: $q.screen.gt.md ? aviation050 : $q.screen.gt.sm ? aviation033 : aviation010,
        title: 'Aviation'
      },
      {
        src: $q.screen.gt.md ? orangeblossom050 : $q.screen.gt.sm ? orangeblossom033 : orangeblossom010,
        title: 'Orange Blossom'
      },
      {
        src: $q.screen.gt.md ? rustynail050 : $q.screen.gt.sm ? rustynail033 : rustynail010,
        title: 'Rusty Nail'
      },
      {
        src: $q.screen.gt.md ? amarettosour050 : $q.screen.gt.sm ? amarettosour033 : amarettosour010,
        title: 'Amaretto Sour'
      },
      {
        src: $q.screen.gt.md ? bacardicocktail033 : $q.screen.gt.sm ? bacardicocktail025 : bacardicocktail010,
        title: 'Bacardi Cocktail'
      },
      {
        src: $q.screen.gt.md ? mulledwine033 : $q.screen.gt.sm ? mulledwine025 : mulledwine010,
        title: 'Mulled Wine'
      },
      {
        src: $q.screen.gt.md ? boulevardier033 : $q.screen.gt.sm ? boulevardier025 : boulevardier010,
        title: 'Boulevardier'
      },
      {
        src: $q.screen.gt.md ? stairs033 : $q.screen.gt.sm ? stairs025 : stairs010
      },
      {
        src: $q.screen.gt.md ? bar050 : $q.screen.gt.sm ? bar033 : bar010
      },
      {
        src: $q.screen.gt.md ? blackmojito050 : $q.screen.gt.sm ? blackmojito033 : blackmojito010,
        title: 'Black Mojito'
      },
      {
        src: $q.screen.gt.md ? hemingwayspecial050 : $q.screen.gt.sm ? hemingwayspecial033 : hemingwayspecial010,
        title: 'Hemingway Special'
      }
    ]
    const { t } = useI18n({})
    return { images, t, $q }
  },
  methods: {}
})
</script>

<style lang="scss">
.capitalize-first-letter::first-letter {
  text-transform: capitalize;
}
</style>
