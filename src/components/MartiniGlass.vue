<template>
  <div class="martini">
    <div class="glass">
      <div class="liquid"></div>
    </div>
  </div>
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
    const sideBorder = Math.ceil(props.size * (5 / 6)) + 'px'
    const topBorder = props.size + 'px'
    const liquidSideBorder = Math.ceil((parseInt(sideBorder) - 8) * (5 / 5)) + 'px'
    const liquidTopBorder = Math.ceil((parseInt(topBorder) - 8) * (5 / 5)) + 'px'
    const stemHeight = Math.ceil(props.size / 4) + 'px'
    const stemWidth = Math.ceil(parseInt(stemHeight) / 5) + 'px'
    const circleSize = Math.ceil(parseInt(stemHeight) / 4) + 'px'
    const circleSpacer = Math.ceil(parseInt(stemHeight) - (parseInt(circleSize) / 2)) + 'px'
    return {
      circleSize,
      circleSpacer,
      sideBorder,
      topBorder,
      liquidSideBorder,
      liquidTopBorder,
      stemHeight,
      stemWidth,
      rotation
    }
  }
})
</script>

<style lang="scss" scoped>
.martini {
  position: absolute;
  transform: rotate(v-bind(rotation)) translate(0, calc(-1 * v-bind(stemHeight)));
  transform-origin: bottom center;

  .glass {
    position: relative;
    border-left: v-bind(sideBorder) solid transparent;
    border-right: v-bind(sideBorder) solid transparent;
    border-top: v-bind(topBorder) solid #c3eef4;

    &::before, &::after {
      content: '';
      overflow: hidden;
    }

    &::before, &::after, .liquid {
      position: absolute;
    }

    &::before { // stem
      z-index: -2;
      width: v-bind(stemWidth);
      height: v-bind(stemHeight);
      top: calc(v-bind(stemWidth) / -2);
      left: calc(v-bind(stemWidth) / -2);
      background: #c3eef4;
    }

    &::after { // central circle
      width: v-bind(circleSize);
      height: v-bind(circleSize);
      top: v-bind(circleSpacer);
      left: calc(v-bind(circleSize) / -2 );
      background: #c3eef4;
      border-radius: 50%;
    }

    .liquid {
      bottom: 4px;
      right: calc(v-bind(liquidSideBorder) * -1);
      border-left: v-bind(liquidSideBorder) solid transparent;
      border-right: v-bind(liquidSideBorder) solid transparent;
      border-top: v-bind(liquidTopBorder) solid #60D4CB;
    }
  }
}
</style>
