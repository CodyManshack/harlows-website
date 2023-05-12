<template>
  <q-card square>
    <q-img :src="cocktail.image" height="700px"></q-img>
    <q-card-section class="q-pl-md q-py-md" horizontal>
      <div class="row">
        <div class="col-6">
          <div class="text-h3 poiret-one q-py-lg">{{ cocktail.name }}</div>
          <div class="text-body1 text-justify">{{ cocktail.description }}</div>
        </div>
        <q-separator vertical inset class="q-mx-lg"/>
        <q-card-section class="col-5 q-py-none">
          <div class="text-h5 text-center text-weight-thin q-pt-lg">Flavor Profile</div>
          <FlavorProfileChart v-bind="cocktail"/>
        </q-card-section>
      </div>
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
