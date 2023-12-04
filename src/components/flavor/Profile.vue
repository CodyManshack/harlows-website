<template>
  <div class="flavor-chart">
    <component
      v-for="(flavor, index) in flavorOrder"
      :is="flavor"
      :key="index"
      :rotate="72 * index"
      :size="martiniGlassSize"
      :liquidLevel="props[flavor]"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import Bitter from 'src/components/flavor/glass/Bitter.vue'
import Boozy from 'src/components/flavor/glass/Boozy.vue'
import Citrus from 'src/components/flavor/glass/Citrus.vue'
import Sweet from 'src/components/flavor/glass/Sweet.vue'
import Tart from 'src/components/flavor/glass/Tart.vue'

const flavorRangeValidator = function (value) {
  return (value >= 0 && value <= 5)
}
export default defineComponent({
  name: 'FlavorProfile',
  components: {
    Bitter,
    Boozy,
    Citrus,
    Sweet,
    Tart
  },
  props: {
    bitter: {
      type: Number,
      default: 0,
      validator (value) {
        return flavorRangeValidator(value)
      }
    },
    boozy: {
      type: Number,
      default: 0,
      validator (value) {
        return flavorRangeValidator(value)
      }
    },
    tart: {
      type: Number,
      default: 0,
      validator (value) {
        return flavorRangeValidator(value)
      }
    },
    citrus: {
      type: Number,
      default: 0,
      validator (value) {
        return flavorRangeValidator(value)
      }
    },
    sweet: {
      type: Number,
      default: 0,
      validator (value) {
        return flavorRangeValidator(value)
      }
    },
    size: {
      type: Number,
      default: 200
    }
  },
  setup (props) {
    const flavorOrder = ['bitter', 'boozy', 'tart', 'citrus', 'sweet']
    const martiniGlassSize = props.size * (1 / 3)
    const containerSize = props.size + 'px'
    return {
      containerSize,
      flavorOrder,
      martiniGlassSize,
      props
    }
  }
})
</script>

<style lang="scss">
  .flavor-chart {
    display: flex;
    justify-content: center;
    position: relative;
    height: v-bind(containerSize);
    width: v-bind(containerSize);
  }
</style>
