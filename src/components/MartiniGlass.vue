<template>
  <div class="martini-glass"></div>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'MartiniGlass',
  setup () {
    return {}
  }
})
</script>

<style lang="scss">
.martini-glass {
  position: relative;
  border-left: 50px solid transparent;
  border-right: 50px solid transparent;
  border-top: 60px solid #c3eef4;

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
