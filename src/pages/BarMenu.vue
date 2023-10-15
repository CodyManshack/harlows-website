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
import { computed, defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'BarMenu',
  setup () {
    const { locale } = useI18n({ useScope: 'global' })
    const menuPath = computed(() => { return `${locale.value.toUpperCase()}_Harlows_Menu.pdf` })
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
