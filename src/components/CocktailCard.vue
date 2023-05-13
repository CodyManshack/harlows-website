<template>
  <q-card square flat>
    <q-img :src="cocktail.image" height="400px"></q-img>
    <q-card-section class="q-py-none">
      <div class="text-h3 poiret-one q-py-lg">{{ cocktail.name }}</div>
      <div class="text-h5 text-center text-weight-thin q-pt-lg">Flavor Profile</div>
      <FlavorProfileChart v-bind="cocktail"/>
    </q-card-section>
    <q-separator inset />
    <q-card-section class="q-pl-md q-py-md">
      <div class="text-body2 text-justify">{{ cocktail.description }}</div>
    </q-card-section>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'
import FlavorProfileChart from './FlavorProfileChart.vue'

export default defineComponent({
  name: 'CocktailCard',
  components: {
    FlavorProfileChart
  },
  props: {
    cocktail: {
      name: String,
      description: String,
      image: String,
      flavorProfile: Array
    }
  },
  setup (props) {
    return {}
  }
})
</script>

<style lang="scss">
</style>
