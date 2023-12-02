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
    }
  },
  setup (props) {
    const rotation = computed(() => {
      return props.rotate + "deg"
    })
    return {
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
  transform: rotate(v-bind(rotation)) translate(0, -20px);
  transform-origin: bottom center;

  &::before, &::after {
    position: absolute;
    content: '';
  }

  &::before {
    z-index: -2;
    width: 2px;
    height: 20px;
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
