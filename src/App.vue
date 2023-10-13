<template>
  <router-view />
</template>

<script>
import { defineComponent } from 'vue'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'App',
  setup () {
    const $q = useQuasar()
    $q.dark.set(true)
  }
})
</script>

<style lang="scss">
.harlows-light-green {
  background-color: #334D44;
}
.harlows-green {
  background-color: #16342A;
}
.harlows-orange {
  background-color: #D65F27;
}
</style>
