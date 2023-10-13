<template>
  <q-card>
    <q-item>
      <q-item-section avatar>
        <q-avatar>
          <img src="https://cdn.quasar.dev/img/avatar2.jpg">
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label>{{ name }}</q-item-label>
        <q-item-label caption>{{ title }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-card>
</template>

<script>
// import { ref } from 'vue'

export default {
  name: 'TeamMember',
  props: ['name', 'title'],
  setup (props) {
    return {
    }
  }
}
</script>
