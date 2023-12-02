<template>
  <div class="flavor-chart">
    <MartiniGlass />
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import MartiniGlass from 'src/components/MartiniGlass.vue'

export default defineComponent({
  name: 'FlavorProfile',
  components: { MartiniGlass },
  setup () {
    return {}
  }
})
</script>

<style lang="scss">
  .flavor-chart {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 300px;
    width: 300px;
  }
</style>
