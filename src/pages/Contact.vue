<template>
  <q-page>
    <section class="q-py-xl">
      <div class="row justify-center items-center text-center">
        <div class="col-xs-12 col-md-8 col-lg-6 col-xl-4 spectral">
          <div :class="[$q.screen.gt.sm ? 'text-h2' : 'text-h3', 'text-italic' ]">{{ t('followUs') }}</div>
          <div :class="[$q.screen.gt.sm ? 'text-h6' : 'text-body1', 'text-weight-regular q-mt-md']">{{ t('vibePics') }}</div>
          <q-btn
            square
            color="accent"
            padding="sm lg"
            :size="$q.screen.xs ? 'lg' : 'xl'"
            no-caps
            class="q-mt-lg"
          >
            <span class="text-h5 text-weight-regular capitalize-first-letter">{{ t('viewInsta') }}</span>
          </q-btn>
        </div>
      </div>
    </section>
    <section class="q-pb-xl">
      <div class="row justify-center items-center text-center q-pb-lg">
        <div class="col-xs-12 col-md-8 col-lg-6 col-xl-4 spectral">
          <div class="row justify-center items-center q-gutter-lg q-my-md">
            <transition-group appear enter-active-class="animated zoomIn" leave-active-class="animated zoomOut">
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
                  <h5 class="text-weight-thin q-my-sm col-12">{{ t(button.title) }}</h5>
                  <p class="text-caption text-grey-4 col-7 col-md-10">{{ button.subtitle }}</p>
                </div>
              </q-btn>
            </transition-group>
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
          email: 'email',
          followUs: 'Follow us on Instagram',
          vibePics: 'For vibe pics and mouth-watering cocktails',
          viewInsta: 'View our Instagram'
        },
        es: {
          title: 'Contactar',
          subtitle: "Para reservas y consultas, basta con enviar una paloma mensajera a la dirección indicada. Estamos impacientes por conocerle.",
          address: 'dirección',
          phone: "WhatsApp",
          email: 'correo electrónico',
          followUs: 'Síguenos en Instagram',
          vibePics: 'Para fotos de ambiente y cócteles deliciosos',
          viewInsta: 'Ver nuestro Instagram'
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
.q-field__label::first-letter {
  text-transform: capitalize;
}
iframe {
  display: block; // block fixes pixel buffer issue on bottom of iframe element
}
</style>
