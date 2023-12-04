<template>
  <BaseGlass v-bind="props">
    <div class="pick">
      <div class="olive"></div>
      <div class="olive"></div>
      <div class="olive"></div>
    </div>
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
    const oliveSize = Math.ceil(props.size * (1 / 5)) + 'px'
    return {
      props,
      pickSize,
      oliveSize
    }
  }
})
</script>

<style lang="scss">
.pick {
  position: absolute;
  background: rgb(138, 98, 50);
  height: calc(v-bind(pickSize) * 1.25);
  width: 2px;
  transform: skewX(140deg);
  bottom: 10px;
  left: calc(v-bind(pickSize) * 1.5);

  &::before, &::after {
    position: absolute;
    content: '';
  }
  .olive {
    position: absolute;
    border-radius: 50%;
    width: v-bind(oliveSize);
    height: v-bind(oliveSize);
    transform: skewX(35deg);
    background: rgb(101, 112, 97);
    // left: calc(v-bind(oliveSize) * 1.5);
    left: calc(v-bind(oliveSize) * -1 / 2);

    &:nth-child(1) {
      bottom: calc(v-bind(oliveSize) * .3);
    }
    &:nth-child(2) {
      bottom: calc(v-bind(oliveSize) * 1.15);
    }
    &:nth-child(3) {
      bottom: calc(v-bind(oliveSize) * 2);
    }

    &::before, &::after{
      position: absolute;
      content: '';
    }
  }
}
</style>
