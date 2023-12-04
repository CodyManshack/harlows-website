<template>
  <BaseGlass v-bind="props" liquidColor="rgba(222, 102, 8, 0.5)">
  </BaseGlass>
</template>

<script>
import { defineComponent } from 'vue'
import BaseGlass from 'src/components/flavor/glass/Base.vue'

export default defineComponent({
  name: 'Citrus',
  components: { BaseGlass },
  props: {
    liquidColor: {
      type: String,
      default: '#60D4CB'
    },
    liquidLevel: {
      type: Number,
      default: 1
    },
    rotate: {
      type: Number,
      default: 0
    },
    size: {
      type: Number,
      default: 60
    }
  },
  setup (props) {
    return {
      props
    }
  }
})
</script>

<style lang="scss" scoped>
</style>
