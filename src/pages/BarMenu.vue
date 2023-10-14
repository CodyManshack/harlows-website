<template>
  <q-page class="flex justify-center">
    <iframe
      :key="menuPath"
      :src="menuPath"
      frameborder="0"
      class="pdf-container"
    ></iframe>
  </q-page>
</template>

<script>
import { defineComponent, ref, watch } from 'vue'

export default defineComponent({
  name: 'BarMenu',
  props: {
    lang: {
      type: String,
      default: 'es'
    }
  },
  setup (props) {
    const menuPath = ref(`${props.lang.toUpperCase()}_Harlows_Menu.pdf`)
    watch(() => props.lang, (lang) => {
      menuPath.value = `${lang.toUpperCase()}_Harlows_Menu.pdf`
    })
    return {
      menuPath
    }
  }
})
</script>

<style lang="scss">
.pdf-container {
  display: flex;
  align-items: stretch;
  flex-grow: 1;
  max-width: 1020px;
}
</style>
