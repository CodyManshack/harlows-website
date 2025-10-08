<template>
  <q-page class="single-page-layout">
    <!-- Hero Section -->
    <section id="hero" class="hero-section">
      <div class="hero-overlay"></div>
      <div :class="heroContentClasses">
        <div class="hero-content-wrapper">
          <div class="hero-text spectral">
            <h1 :class="headlineClasses">
              {{ t('headline') }}
            </h1>
            <h2 class="subtitle-text text-h6 text-weight-regular q-mt-md">
              {{ t('subtitle') }}
            </h2>
          </div>
          <div class="hero-actions">
            <q-btn-dropdown
              square
              color="accent"
              padding="md xl"
              :size="$q.screen.xs ? 'lg' : 'xl'"
              content-class="bg-accent no-border-radius"
              no-caps
              aria-label="View Menu"
              class="hero-menu-btn"
            >
              <template v-slot:label>
                <span class="text-h5 spectral text-weight-regular capitalize-first-letter">
                  {{ t('viewMenu') }}
                </span>
              </template>

              <q-list separator>
                <q-item
                  v-for="lang in localeOptions"
                  :key="lang.value"
                  @click="goToMenu(lang.value)"
                  v-close-popup
                  clickable
                  v-ripple
                >
                  <q-item-section>
                    <q-item-label class="text-h6 text-weight-regular spectral">
                      {{ lang.label }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-btn-dropdown>
            
            <!-- Quick Action Buttons for Mobile -->
            <div class="quick-actions">
              <q-btn
                round
                color="secondary"
                icon="call"
                size="lg"
                href="https://api.whatsapp.com/send?phone=34692940844"
                target="_blank"
                aria-label="Contact via WhatsApp"
                class="quick-action-btn"
              />
              <q-btn
                round
                color="secondary"
                icon="place"
                size="lg"
                href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9"
                target="_blank"
                aria-label="Get Directions"
                class="quick-action-btn"
              />
              <q-btn
                round
                color="secondary"
                icon="expand_more"
                size="lg"
                @click="scrollToSection('gallery')"
                aria-label="View Gallery"
                class="quick-action-btn scroll-down-btn"
              />
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title spectral text-h3 text-weight-regular text-italic text-center">
            {{ t('gallery') }}
          </h2>
          <p class="section-subtitle text-center q-mt-md">
            {{ t('galleryDescription') }}
          </p>
        </div>
        
        <div class="gallery-grid">
          <div
            v-for="image in images"
            :key="image.id"
            class="gallery-item"
          >
            <q-intersection
              once
              transition="fade"
              :threshold="0.1"
            >
              <q-card flat class="bg-transparent gallery-card">
                <q-img
                  :src="image.src"
                  :srcset="image.srcset"
                  :alt="image.alt"
                  loading="lazy"
                  spinner-color="accent"
                  :ratio="4/3"
                  fit="cover"
                  class="gallery-image"
                  sizes="(max-width: 600px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  no-spinner-delay
                >
                  <div
                    v-if="image.title"
                    class="spectral text-h6 absolute-bottom text-right image-title"
                  >
                    {{ image.title }}
                  </div>
                </q-img>
              </q-card>
            </q-intersection>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="container">
        <div class="section-header">
          <h2 class="section-title spectral text-h3 text-weight-regular text-italic text-center">
            {{ t('contact') }}
          </h2>
        </div>

        <!-- Social Media -->
        <div class="social-section text-center q-mb-xl">
          <h3 class="spectral text-h4 text-weight-regular text-italic q-mb-md">
            {{ t('followUs') }}
          </h3>
          <q-btn
            square
            color="accent"
            padding="md xl"
            :size="$q.screen.xs ? 'lg' : 'xl'"
            no-caps
            icon-right="ion-logo-instagram"
            href="https://www.instagram.com/harlows.bar/"
            target="_blank"
            class="instagram-btn"
          >
            <span class="text-h6 text-weight-regular capitalize-first-letter">
              {{ t('viewInsta') }}
            </span>
          </q-btn>
        </div>

        <!-- Contact Cards -->
        <div class="contact-cards">
          <q-card
            v-for="contact in contactInfo"
            :key="contact.title"
            class="contact-card"
            flat
            bordered
          >
            <q-card-section class="text-center">
              <q-icon
                :name="`ion-${contact.icon}`"
                size="2rem"
                color="accent"
                class="q-mb-md"
              />
              <h4 class="text-h6 text-weight-medium q-mb-sm">
                {{ t(contact.title) }}
              </h4>
              <p class="text-body2 text-grey-7 q-mb-md">
                {{ contact.subtitle }}
              </p>
              <q-btn
                color="secondary"
                outline
                :href="contact.href"
                target="_blank"
                no-caps
                class="full-width"
              >
                {{ t(contact.action) }}
              </q-btn>
            </q-card-section>
          </q-card>
        </div>

        <!-- Map -->
        <div class="map-container q-mt-xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.7956147359905!2d-0.38684602266516505!3d39.47394581247808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604fe3f94d65cf%3A0x4471acc1b9c7ad98!2sHarlow&#39;s%20Bar!5e0!3m2!1sen!2ses!4v1697395155698!5m2!1sen!2ses"
            width="100%"
            height="400"
            style="border:0; border-radius: 8px;"
            loading="lazy"
            referrerpolicy="no-referrer-when-downgrade"
          ></iframe>
        </div>
      </div>
    </section>

    <!-- Floating Action Button for Mobile -->
    <q-page-sticky position="bottom-right" :offset="[18, 18]" class="mobile-only">
      <q-btn
        fab
        icon="menu"
        color="accent"
        @click="showMobileMenu = true"
        aria-label="Open mobile menu"
      />
    </q-page-sticky>

    <!-- Mobile Menu Dialog -->
    <q-dialog v-model="showMobileMenu" position="bottom">
      <q-card class="mobile-menu-card">
        <q-card-section>
          <div class="text-h6 q-mb-md spectral">Quick Actions</div>
          <div class="mobile-menu-actions">
            <q-btn
              flat
              icon="restaurant_menu"
              :label="t('viewMenu')"
              @click="openMenuDialog"
              class="full-width q-mb-sm"
            />
            <q-btn
              flat
              icon="call"
              label="WhatsApp"
              href="https://api.whatsapp.com/send?phone=34692940844"
              target="_blank"
              class="full-width q-mb-sm"
            />
            <q-btn
              flat
              icon="place"
              label="Directions"
              href="https://maps.app.goo.gl/y8zXASHuxx2pLbyf9"
              target="_blank"
              class="full-width q-mb-sm"
            />
            <q-btn
              flat
              icon="ion-logo-instagram"
              label="Instagram"
              href="https://www.instagram.com/harlows.bar/"
              target="_blank"
              class="full-width"
            />
          </div>
        </q-card-section>
      </q-card>
    </q-dialog>

    <!-- Menu Language Selection Dialog -->
    <q-dialog v-model="menuDialog">
      <q-card>
        <q-card-section>
          <div class="text-h6 spectral">{{ t('viewMenu') }}</div>
        </q-card-section>
        <q-card-section>
          <q-list>
            <q-item
              v-for="lang in localeOptions"
              :key="lang.value"
              @click="goToMenu(lang.value)"
              v-close-popup="menuDialog"
              clickable
              v-ripple
            >
              <q-item-section>
                <q-item-label class="text-h6 text-weight-regular spectral">
                  {{ lang.label }}
                </q-item-label>
              </q-item-section>
            </q-item>
          </q-list>
        </q-card-section>
      </q-card>
    </q-dialog>
  </q-page>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useMeta, useQuasar } from 'quasar'

const router = useRouter()
const $q = useQuasar()
const { t, locale } = useI18n({ useScope: 'global' })

// Reactive state
const showMobileMenu = ref(false)
const menuDialog = ref(false)

// Static data
const localeOptions = [
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Español' }
]

// Contact information
const contactInfo = [
  {
    icon: 'pin',
    title: 'address',
    subtitle: 'Carrer de Lepant 4, 46008 Valencia',
    href: 'https://maps.app.goo.gl/y8zXASHuxx2pLbyf9',
    action: 'getDirections'
  },
  {
    icon: 'logo-whatsapp',
    title: 'phone',
    subtitle: '(+34) 692 940 844',
    href: 'https://api.whatsapp.com/send?phone=34692940844',
    action: 'sendMessage'
  },
  {
    icon: 'mail',
    title: 'email',
    subtitle: 'info@harlows.bar',
    href: 'mailto:info@harlows.bar',
    action: 'sendEmail'
  }
]

// Gallery images configuration
const imageConfigs = [
  {
    basePath: 'cocktails/dirtymartini',
    sizes: { small: '0.1x', medium: '0.33x', large: '0.5x' },
    title: 'Dirty Martini'
  },
  {
    basePath: 'cocktails/whiskeysour',
    sizes: { small: '0.1x', medium: '0.33x', large: '0.5x' },
    title: 'Whiskey Sour'
  },
  {
    basePath: 'cocktails/aviation',
    sizes: { small: '0.1x', medium: '0.33x', large: '0.5x' },
    title: 'Aviation'
  },
  {
    basePath: 'cocktails/orangeblossom',
    sizes: { small: '0.1x', medium: '0.33x', large: '0.5x' },
    title: 'Orange Blossom'
  },
  {
    basePath: 'cocktails/rustynail',
    sizes: { small: '0.1x', medium: '0.33x', large: '0.5x' },
    title: 'Rusty Nail'
  },
  {
    basePath: 'cocktails/amarettosour',
    sizes: { small: '0.1x', medium: '0.33x', large: '0.5x' },
    title: 'Amaretto Sour'
  },
  {
    basePath: 'cocktails/bacardicocktail',
    sizes: { small: '0.1x', medium: '0.25x', large: '0.33x' },
    title: 'Bacardi Cocktail'
  },
  {
    basePath: 'cocktails/mulledwine',
    sizes: { small: '0.1x', medium: '0.25x', large: '0.33x' },
    title: 'Mulled Wine'
  },
  {
    basePath: 'cocktails/boulevardier',
    sizes: { small: '0.1x', medium: '0.25x', large: '0.33x' },
    title: 'Boulevardier'
  },
  {
    basePath: 'location/stairs',
    sizes: { small: '0.1x', medium: '0.25x', large: '0.33x' },
    title: null
  },
  {
    basePath: 'location/bar',
    sizes: { small: '0.1x', medium: '0.33x', large: '0.5x' },
    title: null
  },
  {
    basePath: 'cocktails/blackmojito',
    sizes: { small: '0.1x', medium: '0.33x', large: '0.5x' },
    title: 'Black Mojito'
  },
  {
    basePath: 'cocktails/hemingwayspecial',
    sizes: { small: '0.1x', medium: '0.33x', large: '0.5x' },
    title: 'Hemingway Special'
  }
]

// Computed properties
const menuPath = computed(() => `${locale.value.toUpperCase()}_Harlow's Menu_16.04.pdf`)

const heroContentClasses = computed(() => [
  'hero-content',
  'full-width',
  'full-height'
])

const headlineClasses = computed(() => [
  $q.screen.gt.sm ? 'text-h1' : $q.screen.gt.xs ? 'text-h2' : 'text-h3',
  'text-weight-regular text-italic hero-headline'
])

// Gallery images with responsive srcsets
const images = computed(() =>
  imageConfigs.map((config, index) => {
    const preferredSize = config.sizes.large || config.sizes.medium || config.sizes.small

    return {
      id: `gallery-image-${index}`,
      src: new URL(`../assets/${config.basePath}/${preferredSize}.png`, import.meta.url).href,
      srcset: `
        ${new URL(`../assets/${config.basePath}/${config.sizes.small}.png`, import.meta.url).href} 1x,
        ${config.sizes.medium ? new URL(`../assets/${config.basePath}/${config.sizes.medium}.png`, import.meta.url).href + ' 2x,' : ''}
        ${config.sizes.large ? new URL(`../assets/${config.basePath}/${config.sizes.large}.png`, import.meta.url).href + ' 3x' : ''}
      `.trim().replace(/,\s*$/, ''),
      title: config.title,
      alt: config.title || `${config.basePath.split('/').pop()} image`
    }
  })
)

// Functions
const scrollToSection = (sectionId) => {
  const element = document.getElementById(sectionId)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}

const openMenuDialog = () => {
  showMobileMenu.value = false
  menuDialog.value = true
}

const goToMenu = (lang) => {
  locale.value = lang
  const routeData = router.resolve({ path: menuPath.value })
  window.open(routeData.href, '_blank')
  menuDialog.value = false
}

// Meta setup
useMeta(() => ({
  title: t('pageTitle') || 'Harlow\'s Bar – Classic Cocktail Lounge',
  meta: {
    description: {
      name: 'description',
      content: t('pageDescription') || 'Vintage, prohibition-era classic cocktails in a relaxed 1920s lounge.'
    },
    keywords: {
      name: 'keywords',
      content: 'classic cocktails, bar valencia, prohibition era, gin tonic, whiskey sour, martini, vintage bar'
    }
  }
}))

// Component lifecycle
onMounted(() => {
  // Preload menu PDFs
  const menuPaths = ['EN_Harlow\'s Menu_16.04.pdf', 'ES_Harlow\'s Menu_16.04.pdf']
  menuPaths.forEach(path => {
    const link = document.createElement('link')
    link.rel = 'prefetch'
    link.href = path
    link.as = 'document'
    document.head.appendChild(link)
  })

  // Preload critical gallery images
  images.value.slice(0, 6).forEach(image => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = image.src
    document.head.appendChild(link)
  })
})
</script>

<style lang="scss" scoped>
// Global styles
.capitalize-first-letter::first-letter {
  text-transform: uppercase;
}

.spectral {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

.single-page-layout {
  overflow-x: hidden;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

// Hero Section
.hero-section {
  min-height: 100vh;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  background-image: url('../assets/location/bar/0.33x.png');
  background-size: cover;
  background-position: center;
  background-attachment: fixed;

  @media (max-width: $breakpoint-sm-max) {
    background-attachment: scroll;
    min-height: 90vh;
  }
}

.hero-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: linear-gradient(
    rgba(0, 0, 0, 0.6),
    rgba(0, 0, 0, 0.4)
  );
  z-index: 1;
}

.hero-content {
  position: relative;
  z-index: 2;
  text-align: center;
  color: white;
  padding: 2rem;
  max-width: 800px;
}

.hero-content-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2rem;

  @media (max-width: $breakpoint-xs-max) {
    gap: 1.5rem;
  }
}

.hero-text {
  text-align: center;
}

.hero-headline {
  text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.8);
  margin-bottom: 1rem;
}

.subtitle-text {
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.6);
  max-width: 600px;
  line-height: 1.6;

  @media (max-width: $breakpoint-xs-max) {
    font-size: 1rem;
  }
}

.hero-actions {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1.5rem;
}

.hero-menu-btn {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 200px;
}

.quick-actions {
  display: flex;
  gap: 1rem;
  justify-content: center;
  flex-wrap: wrap;

  @media (max-width: $breakpoint-xs-max) {
    gap: 0.5rem;
  }
}

.quick-action-btn {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &.scroll-down-btn {
    animation: bounce 2s infinite;
  }
}

@keyframes bounce {
  0%, 20%, 50%, 80%, 100% {
    transform: translateY(0);
  }
  40% {
    transform: translateY(-10px);
  }
  60% {
    transform: translateY(-5px);
  }
}

// Gallery Section
.gallery-section {
  padding: 4rem 0;
  background: linear-gradient(to bottom, #f8f9fa, #ffffff);
}

.section-header {
  margin-bottom: 3rem;
  text-align: center;
}

.section-title {
  color: #333;
  margin-bottom: 1rem;
}

.section-subtitle {
  color: #666;
  max-width: 600px;
  margin: 0 auto;
  font-size: 1.1rem;
}

.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;

  @media (max-width: $breakpoint-sm-max) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: $breakpoint-xs-max) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.gallery-item {
  position: relative;
}

.gallery-card {
  border-radius: 12px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
  }
}

.gallery-image {
  border-radius: 12px;
  transition: opacity 0.3s ease;
}

.image-title {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
  font-size: 1.2rem;

  @media (max-width: $breakpoint-xs-max) {
    padding: 0.5rem;
    font-size: 1rem;
  }
}

// Contact Section
.contact-section {
  padding: 4rem 0;
  background: linear-gradient(135deg, #1a1a1a 0%, #2d2d2d 100%);
  color: white;
}

.social-section {
  margin-bottom: 3rem;
}

.instagram-btn {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  min-width: 220px;
}

.contact-cards {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;

  @media (max-width: $breakpoint-sm-max) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
}

.contact-card {
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 12px;
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-3px);
  }
}

.map-container {
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
}

// Mobile-specific styles
.mobile-only {
  @media (min-width: $breakpoint-sm-min) {
    display: none !important;
  }
}

.mobile-menu-card {
  border-radius: 16px 16px 0 0;
  max-height: 80vh;
}

.mobile-menu-actions {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

// Performance optimizations
.animated {
  animation-fill-mode: both;
}

// Accessibility improvements
@media (prefers-reduced-motion: reduce) {
  .gallery-card,
  .contact-card,
  .quick-action-btn {
    transition: none;
  }

  .scroll-down-btn {
    animation: none;
  }
}

// Dark mode support
@media (prefers-color-scheme: dark) {
  .gallery-section {
    background: linear-gradient(to bottom, #1a1a1a, #2d2d2d);
  }

  .section-title {
    color: #fff;
  }

  .section-subtitle {
    color: #ccc;
  }
}
</style>
