<template>
  <q-page>
    <section class="q-pb-xl">
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Gallery',
  setup () {
    const images = [
      'cocktails/sidecar/0.25x.png',
      'cocktails/blackmojito/0.33x.png',
      'cocktails/hemingwayspecial/0.25x.png'
    ]
    const { t } = useI18n({})
    return { images, t }
  },
  methods: {}
})
</script>

<style lang="scss">
</style>
