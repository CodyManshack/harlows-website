<template>
  <div class="flavor-chart">
    <MartiniGlass
      v-for="(flavor, index) in flavorOrder"
      :key="index"
      :rotate="72 * index"
    />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import MartiniGlass from 'src/components/MartiniGlass.vue'

const flavorRangeValidator = function (value) {
  return (value >= 0 && value <= 5)
}
export default defineComponent({
  name: 'FlavorProfile',
  components: { MartiniGlass },
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
    }
  },
  setup (props) {
    const flavorOrder = ['bitter', 'boozy', 'tart', 'citrus', 'sweet']
    return {
      flavorOrder
    }
  }
})
</script>

<style lang="scss">
  .flavor-chart {
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    height: 300px;
    width: 300px;
  }
</style>
