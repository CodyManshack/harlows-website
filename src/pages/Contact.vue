<template>
  <q-page>
    <section class="row justify-center">
      <div class="col-12">
        <q-carousel
          animated
          v-model="state.slide"
          navigation
          infinite
          autoplay
        >
          <q-carousel-slide v-for="(image, index) in images" :key="index" :name="index" :img-src="image" />
        </q-carousel>
      </div>
    </section>
    <section class="row justify-center items-center">
      <q-card square flat class="col-md-6 col-sm-12 bg-primary">
        <q-card-section class="text-center">
          <div class="poiret-one text-h2">Contact Us</div>
        </q-card-section>
        <q-card-section>
          <q-form @submit.stop="onSubmit" class="q-gutter-sm">
            <q-input
              v-model="state.name"
              @blur="v$.name.$touch()"
              :error="v$.name.$error"
              :error-message="v$.name.$error ? v$.name.$errors[0].$message : ''"
              filled
              type="text"
              label="Name"
              required
            >
              <template v-slot:prepend>
                <q-icon name="ion-happy" />
              </template>
            </q-input>
            <q-input
              v-model="state.email"
              @blur="v$.email.$touch()"
              :error="v$.email.$error"
              :error-message="v$.email.$error ? v$.email.$errors[0].$message : ''"
              filled
              type="email"
              label="Email"
              required
            >
              <template v-slot:prepend>
                <q-icon name="ion-mail" />
              </template>
            </q-input>
            <q-input
              v-model="state.message"
              @blur="v$.message.$touch()"
              :error="v$.message.$error"
              :error-message="v$.message.$error ? v$.message.$errors[0].$message : ''"
              filled
              type="textarea"
              label="Message"
              rows="10"
            >
              <template v-slot:prepend>
                <q-icon name="ion-create" />
              </template>
            </q-input>
          </q-form>
        </q-card-section>
        <q-card-actions class="q-px-md q-pb-md">
          <q-btn label="Send Message" type="submit" icon-right="ion-send" size="md" color="accent" />
        </q-card-actions>
      </q-card>
    </section>
  </q-page>
</template>

<script>
import { defineComponent, reactive } from 'vue'
import { useVuelidate } from '@vuelidate/core'
import { email, required, minLength, maxLength } from '@vuelidate/validators'

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

    return { state, v$, images }
  },
  methods: {}
})
</script>
