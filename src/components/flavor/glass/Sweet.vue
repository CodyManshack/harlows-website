<template>
  <BaseGlass v-bind="props" liquidColor="rgba(156, 96, 125, 0.9)">
  </BaseGlass>
</template>

<script>
import { defineComponent } from 'vue'
import BaseGlass from 'src/components/flavor/glass/Base.vue'

export default defineComponent({
  name: 'Sweet',
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
