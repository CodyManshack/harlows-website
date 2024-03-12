<template>
  <q-page>
    <section class="q-pb-xl" style="background: rgba(0,0,0,.5)">
      <div class="row justify-center items-center text-center q-py-lg">
        <div class="col-md-8 col-sm-12">
          <h2 class="poiret-one q-mb-sm">{{ t('title') }}</h2>
          <h3 class="text-subtitle1 q-px-md text-grey-4">{{  t('subtitle') }}</h3>
          <div class="row justify-center items-center q-gutter-lg q-my-md">
            <q-btn
              square
              class="col-md-3 col-8 bg-secondary"
              style="height: 200px;"
              v-for="button in buttons"
              :key="button.title"
              :href="button.href"
              target="_blank"
            >
              <div class="row justify-center items-center">
                <div class="col-12">
                  <q-icon :name="`ion-${button.icon}`" size="lg" color="accent" class="q-py-lg"/>
                </div>
                <h5 class="poiret-one q-my-sm text-weight-bold col-12">{{ t(button.title) }}</h5>
                <p class="text-caption text-grey-4 col-7 col-md-10">{{ button.subtitle }}</p>
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
        height="510"
        style="border:0;"
        loading="lazy"
        referrerpolicy="no-referrer-when-downgrade"
      ></iframe>
    </section>
  </q-page>
</template>

<script>
import { defineComponent } from 'vue'
import { useI18n } from 'vue-i18n'

export default defineComponent({
  name: 'Contact',
  setup () {
    const images = ['cocktails/sidecar/0.25x.png', 'cocktails/blackmojito/0.33x.png', 'cocktails/hemingwayspecial/0.25x.png']
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

    const buttons = [
      {
        icon: 'pin',
        title: 'address',
        subtitle: 'Carrer de Lepant 4, 46008 Valencia',
        href: 'https://maps.app.goo.gl/y8zXASHuxx2pLbyf9'
      },
      {
        icon: 'logo-whatsapp',
        title: 'phone',
        subtitle: '(+34) 692 940 844',
        href: 'https://api.whatsapp.com/send?phone=34692940844'
      },
      {
        icon: 'mail',
        title: 'email',
        subtitle: 'info@harlows.bar',
        href: 'mailto:info@harlows.bar'
      }
    ]

    return { buttons, images, t }
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
