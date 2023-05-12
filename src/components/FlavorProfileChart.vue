<template>
  <apexchart height="300px" type="radar" :labels="labels" :series="series" :options="options" />
</template>

<script>
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'FlavorProfileChart',
  props: {
    flavorProfile: {
      required: true,
      type: Array
    }
  },
  setup (props) {
    const labels = [
      'Sweet',
      'Sour',
      'Bitter',
      'Smoke',
      'Spice',
      'Herbal / Floral',
      'Alcohol',
      'Fruit'
    ]
    const options = {
      chart: {
        toolbar: {
          show: false
        }
      },
      markers: {
        size: 0
      },
      xaxis: {
        categories: labels,
        labels: {
          show: true,
          style: {
            fontSize: '10px'
          }
        }
      }
    }
    const series = computed(() => {
      return [
        {
          name: 'FlavorProfile',
          data: props.flavorProfile
        }
      ]
    })

    return {
      labels,
      series,
      options
    }
  }
})
</script>
