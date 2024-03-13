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
            <q-img
              :src="image.src"
            />
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
import blackmojito033 from '../assets/cocktails/blackmojito/0.33x.png'
import dirtymartini010 from '../assets/cocktails/dirtymartini/0.1x.png'
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
        src: amarettosour010,
        title: 'Amaretto Sour'
      },
      {
        src: blackmojito033,
        title: 'Black Mojito'
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
