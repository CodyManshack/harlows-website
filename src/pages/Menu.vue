<template>
  <q-page padding>
    <FlavorProfile v-bind="testProfile" :size="400" style="margin-top: 50px;"></FlavorProfile>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import FlavorProfile from 'src/components/flavor/Profile.vue'

export default defineComponent({
  name: 'BarMenu',
  components: { FlavorProfile },
  setup () {
    const cocktails = [
      {
        name: 'Old Fashioned',
        description: 'sweet bourbon with bitter notes',
        price: 11
      }
    ]
    const testProfile = {
      bitter: 3,
      boozy: 2,
      tart: 1,
      citrus: 5,
      sweet: 4
    }
    return {
      cocktails,
      testProfile
    }
  }
})
</script>
