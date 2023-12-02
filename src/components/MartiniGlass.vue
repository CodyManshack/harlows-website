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
    const stemHeight = props.size / 6 + 'px'
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
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 60px solid #c3eef4;
  transform: rotate(v-bind(rotation)) translate(0, v-bind(stemHeightNeg));
  transform-origin: bottom center;

  &::before, &::after {
    position: absolute;
    content: '';
  }

  &::before {
    z-index: -2;
    width: 2px;
    height: v-bind(stemHeight);
    top: -1px;
    left: -1px;
    background: #c3eef4;
  }

  // &::after {
  //   width: 40px;
  //   height: 2px;
  //   top: 51px;
  //   left: -19px;
  //   background: #c3eef4;
  // }
}
</style>
