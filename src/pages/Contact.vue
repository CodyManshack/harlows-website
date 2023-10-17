<template>
  <q-page>
    <section class="row justify-center">
      <div class="col-12">
        <q-carousel
          animated
          v-model="state.slide"
          infinite
          autoplay
        >
          <q-carousel-slide v-for="(image, index) in images" :key="index" :name="index" :img-src="image" />
        </q-carousel>
      </div>
    </section>
    <section>
      <div class="row justify-center items-center text-center q-my-lg">
        <div class="col-md-8 col-sm-12">
          <h2 class="q-mb-sm">{{ t('title') }}</h2>
          <h3 class="text-subtitle1">{{  t('subtitle') }}</h3>
          <div class="row justify-center items-center q-gutter-lg q-my-xl">
            <q-btn
              square
              class="col-md-3 col-sm-8 bg-secondary"
              style="height: 200px;"
              href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9"
              target="_blank"
            >
              <div class="row justify-center items-center">
                <div class="col-12">
                  <q-icon name="ion-pin" size="lg" color="accent" class="q-py-lg"/>
                </div>
                <h5 class="q-my-sm text-weight-medium col-12">{{ t('address') }}</h5>
                <p class="text-caption">Carrer de Lepant 4,<br />46008 València</p>
              </div>
            </q-btn>
            <q-btn
              square
              class="col-md-3 col-sm-8 bg-secondary"
              style="height: 200px;"
              href="https://api.whatsapp.com/send?phone=34692940844"
            >
              <div class="row justify-center items-center">
                <div class="col-12">
                  <q-icon name="ion-logo-whatsapp" size="lg" color="accent" class="q-py-lg"/>
                </div>
                <h5 class="q-my-sm text-weight-medium col-12">{{ t('phone') }}</h5>
                <p class="text-caption">(+34) 692 940 844</p>
              </div>
            </q-btn>
            <q-btn
              square
              class="col-md-3 col-sm-8 bg-secondary"
              style="height: 200px;"
              href="mailto:info@harlows.bar"
            >
              <div class="row justify-center items-center">
                <div class="col-12">
                  <q-icon name="ion-mail" size="lg" color="accent" class="q-py-lg"/>
                </div>
                <h5 class="q-my-sm text-weight-medium col-12">{{ t('email') }}</h5>
                <p class="text-caption">info@harlows.bar</p>
              </div>
            </q-btn>
          </div>
        </div>
      </div>
    </section>
    <section>
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.7956147359905!2d-0.38684602266516505!3d39.47394581247808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604fe3f94d65cf%3A0x4471acc1b9c7ad98!2sHarlow&#39;s%20Bar!5e0!3m2!1sen!2ses!4v1697395155698!5m2!1sen!2ses"
        width="100%"
        height="450"
        style="border:0;"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, maxLength } from '@vuelidate/validators'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Contact',
  setup () {
    const state = reactive({
      name: '',
      email: '',
      message: '',
      slide: 1
    })
    const rules = {
      name: { required, minLength: minLength(3), maxLength: maxLength(64) },
      email: { required, email, maxLength: maxLength(64) },
      message: { required, minLength: minLength(5), maxLength: maxLength(800) }
    }

    const v$ = useVuelidate(rules, state)

    const images = ['cocktails/Sidecar.jpg', 'cocktails/BlackMojito.jpg', 'cocktails/HemingwaySpecial.jpg']

    const { t } = useI18n({
      messages: {
        en: {
          title: 'Contact Us',
          subtitle: "For reservations and inquiries, simply send a carrier pigeon to the address listed. We can't wait to make your acquaintance!",
          address: "address",
          phone: "WhatsApp",
          email: 'email'
        },
        es: {
          title: 'Contactar',
          subtitle: "Para reservas y consultas, basta con enviar una paloma mensajera a la dirección indicada. Estamos impacientes por conocerle.",
          address: 'dirección',
          phone: "WhatsApp",
          email: 'correo electrónico'
        }
      }
    })

    return { state, v$, images, t }
  },
  methods: {}
})
</script>

<style lang="scss">
.q-field__label::first-letter { // ensure that all fields have a capital letter
  text-transform: capitalize;
}
iframe {
  display: block; // block fixes pixel buffer issue on bottom of iframe element
}
</style>
