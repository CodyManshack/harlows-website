<template>
  <q-footer bordered class="bg-accent">
    <div class="row justify-center items-center q-py-md">
      <div class="col-md-9 col-12 flex items-center justify-center">
        <q-btn flat icon="ion-logo-instagram" href="https://www.instagram.com/harlows.bar/" target="_blank"/>
        <q-btn flat icon="ion-logo-facebook" href="https://www.facebook.com/people/Harlows-Bar/100093700941605/" target="_blank"/>
        <q-btn flat icon="ion-logo-whatsapp" href="https://api.whatsapp.com/send?phone=34692940844" />
        <q-btn flat icon="ion-mail" href="mailto:kalen@harlows.bar"/>
        <q-btn flat icon="ion-navigate" href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9" target="_blank"/>
      </div>
    </div>
    <div class="row justify-center items-center">
      <div class="col-md-9 col-12 text-center">
        <div class="text-caption text-grey-4">© 2023 Harlow's Bar</div>
      </div>
    </div>
  </q-footer>
</template>

<script>
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'AppFooter',
  setup () {
    return {}
  }
})
</script>
