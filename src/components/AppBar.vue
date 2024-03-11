<template>
  <q-header class="bg-transparent">
    <q-toolbar class="q-py-md justify-center">
      <q-btn
        flat
        dense
        icon="menu"
        style="position: absolute; left: 12px; top: 12px;"
        @click="drawer = !drawer"
      />
      <router-link :to="{ name: 'home' }">
        <q-img
          src="~/assets/logo.png"
          :width="$q.screen.gt.md ? '260px' : '180px'"
          style="color: white;"
        />
      </router-link>
      <!-- <q-btn-dropdown
        flat
        square
        transparent
        :label="t('menuCondensed')"
        class="text-weight-regular"
        content-class="no-border-radius no-box-shadow"
      >
        <q-list separator>
          <q-item
            v-for="(lang, i) in localeOptions"
            :key="i"
            @click="goToMenu(lang.value)"
            v-close-popup
            clickable
          >
            <q-item-section>
              <q-item-label>{{ lang.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown>
      <q-btn
        flat
        square
        transparent
        label="gallery"
      />
      <q-btn
        flat
        square
        transparent
        :label="t('contact')"
      /> -->

    </q-toolbar>
      <!-- <q-btn-dropdown v-if="$q.screen.gt.sm" flat transparent icon="ion-globe" class="text-weight-regular">
        <q-list class="bg-primary">
          <q-item
            v-for="(lang, i) in localeOptions"
            :key="i"
            @click="selectLocale(lang.value)"
            v-close-popup
            clickable
          >
            <q-item-section>
              <q-item-label>{{ lang.label }}</q-item-label>
            </q-item-section>
          </q-item>
        </q-list>
      </q-btn-dropdown> -->
  </q-header>
  <q-drawer
    v-model="drawer"
    show-if-above
    bordered
  >
    <q-list padding>
      <q-item
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>Menu</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list padding>
      <q-item
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>Gallery</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
    <q-list padding>
      <q-item
        clickable
        v-ripple
      >
        <q-item-section>
          <q-item-label>About Us</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="full-width text-center" style="position: fixed; bottom: 12px;">
      <div class="text-caption text-grey-4">© 2023 Harlow's Bar</div>
    </div>
  </q-drawer>
</template>

<script>
import { computed, defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useQuasar } from 'quasar'

export default defineComponent({
  name: 'AppBar',
  setup () {
    const router = useRouter()
    const $q = useQuasar()
    const { t, locale } = useI18n({ useScope: 'global' })
    const menuPath = computed(() => { return `${locale.value.toUpperCase()}_Harlow's Menu_06.03.pdf` })
    return {
      drawer: ref(false),
      router,
      $q,
      menuPath,
      t,
      locale,
      localeOptions: [
        { value: 'en', label: 'English' },
        { value: 'es', label: 'Español' }
      ]
    }
  },
  methods: {
    selectLocale (lang) {
      this.locale = lang
    },
    goToMenu (lang) {
      this.selectLocale(lang)
      const routeData = this.router.resolve({ path: this.menuPath })
      window.open(routeData.href, '_blank')
    }
  }
})
</script>

<style lang="scss">
.q-toolbar .q-btn-dropdown:last-child {
  position: absolute;
  right: 12px;
}
</style>
