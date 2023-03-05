<template>
  <q-page>
    <div class="column items-center q-pt-xl">
       <q-list dark>
        <q-item clickable>
          <q-item-label class="text-white poiret-one text-h4 text-center text-shadow">menu</q-item-label>
        </q-item>
        <q-item clickable>
          <q-item-label class="text-white poiret-one text-h4 text-center text-shadow">gallery</q-item-label>
        </q-item>
        <q-item clickable>
          <q-item-label class="text-white poiret-one text-h4 text-center text-shadow">about us</q-item-label>
        </q-item>
        <q-expansion-item hide-expand-icon>
          <template v-slot:header>
            <q-item-label class="text-white poiret-one text-h4 text-center text-shadow">socials</q-item-label>
          </template>

          <div class="q-pa-md">
            <q-btn flat label="Instagram" icon="ion-logo-instagram"/>
            <q-btn flat label="Facebook" icon="ion-logo-facebook"/>
            <q-btn flat label="Twitter" icon="ion-logo-twitter"/>
          </div>
        </q-expansion-item>
      </q-list>
    </div>
  </q-page>
</template>

<script setup>
</script>

<style lang="scss" scoped>
.poiret-one {
  font-weight: 600;
}
.q-item__label{
  width: 100%;
}
</style>
