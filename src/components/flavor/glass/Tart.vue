<template>
  <BaseGlass v-bind="props" liquidColor="rgba(225, 221, 222, 0.6)">
    <div class="lemon"></div>
  </BaseGlass>
</template>

<script>
import { defineComponent } from 'vue'
import BaseGlass from 'src/components/flavor/glass/Base.vue'

export default defineComponent({
  name: 'Tart',
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
    const lemonSize = Math.ceil(props.size * (1 / 3)) + 'px'
    return {
      lemonSize,
      props
    }
  }
})
</script>

<style lang="scss" scoped>
$glassColor: rgba(230,229,234, 0.4);
.lemon {
  position: absolute;
  width: v-bind(lemonSize);
  height: v-bind(lemonSize);
  border: 3px solid #f0c309;
  border-radius: 50%;
  background: repeating-conic-gradient(#f6f0c5 25deg, #f6f0c5 30deg, #ffea00 35deg, #ffea00 70deg);
  top: calc(v-bind(lemonSize) * -1 / 2);
  right: calc(v-bind(lemonSize) * -1 / 3);
  z-index: -1;
}
</style>
