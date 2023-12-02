<template>
  <q-page>
    <section>
      <FlavorProfile style="height: 100%"></FlavorProfile>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import FlavorProfile from 'src/components/FlavorProfile.vue'

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
    return {
      cocktails
    }
  }
})
</script>
