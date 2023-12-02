<template>
  <div class="martini-glass"></div>
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'MartiniGlass',
  props: {
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
    const rotation = computed(() => {
      return props.rotate + 'deg'
    })
    const sideBorder = props.size * (5 / 6) + 'px'
    const topBorder = props.size + 'px'
    const stemHeight = props.size / 4 + 'px'
    const stemHeightNeg = '-' + stemHeight
    return {
      sideBorder,
      topBorder,
      stemHeight,
      stemHeightNeg,
      rotation
    }
  }
})
</script>

<style lang="scss" scoped>
.martini-glass {
  position: absolute;
  border-left: v-bind(sideBorder) solid transparent;
  border-right: v-bind(sideBorder) solid transparent;
  border-top: v-bind(topBorder) solid #c3eef4;
  transform: rotate(v-bind(rotation)) translate(0, v-bind(stemHeightNeg));
  transform-origin: bottom center;

  &::before, &::after {
    position: absolute;
    content: '';
  }

  &::before {
    z-index: -2;
    width: 4px;
    height: v-bind(stemHeight);
    top: -2px;
    left: -2px;
    background: #c3eef4;
  }

  &::after {
    width: 8px;
    height: 8px;
    top: 51px;
    left: -19px;
    background: #c3eef4;
  }
}
</style>
