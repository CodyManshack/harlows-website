<template>
  <q-card square>
    <q-img :src="cocktail.image"></q-img>
    <q-card-section class="">
      <div class="text-h4 poiret-one">{{ cocktail.name }}</div>
      <div class="text-caption">{{ cocktail.description }}</div>
    </q-card-section>
    <q-card-actions align="center">
      <template v-for="(spirit, index) in cocktail.spirits" :key="index">
        <div class="text-h6 text-subtitle2 text-weight-light q-px-lg">{{ spirit }}</div>
      </template>
    </q-card-actions>
  </q-card>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'CocktailCard',
  props: {
    cocktail: {
      name: String,
      description: String,
      spirits: Array,
      image: String
    }
  },
  setup (props) {
    return {}
  }
})
</script>
