<template>
  <BaseGlass v-bind="props">
    <div class="olive"></div>
  </BaseGlass>
</template>

<script>
import { defineComponent } from 'vue'
import BaseGlass from 'src/components/flavor/glass/Base.vue'

export default defineComponent({
  name: 'BitterGlass',
  components: { BaseGlass },
  props: {
    glassColor: {
      type: String,
      default: '#c3eef4'
    },
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
    // variant: {
    //   type: String,
    //   default: 'bitter',
    //   validator (value) {
    //     return ['bitter', 'boozy', 'tart', 'citrus', 'sweet'].includes(value)
    //   }
    // }
  },
  setup (props) {
    const pickSize = Math.ceil(props.size * (5 / 6)) + 'px'
    return {
      props,
      pickSize
    }
  }
})
</script>

<style lang="scss">
.olive {
  position: absolute;
  background: rgb(138, 98, 50);
  height: calc(v-bind(pickSize) * 1.25);
  width: 2px;
  transform: skewX(140deg);
  // top: calc(v-bind(pickSize) * -1 / 6);
  bottom: 10px;
  left: calc(v-bind(pickSize) * 1.5);

  &::before , &::after {
    position: absolute;
    content: '';
  }
}
</style>
