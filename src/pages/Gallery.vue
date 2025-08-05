<template>
  <q-page>
    <section class="gallery-section">
      <div class="row justify-center text-center">
        <div class="col-xs-12">
          <transition
            appear
            enter-active-class="animated fadeIn slower"
            leave-active-class="animated fadeOut"
            mode="out-in"
          >
            <h1 class="capitalize-first-letter text-h3 text-weight-regular spectral text-italic">
              {{ t('gallery') }}
            </h1>
          </transition>
        </div>
      </div>
      <div class="row justify-center">
        <div class="col-xs-12 col-sm-10 col-lg-8 col-xl-6">
          <div :class="gutterClasses">
            <div
              v-for="image in images"
              :key="image.id"
              class="col-xs-12 col-sm-10 col-md-4 col-lg-3"
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
                      class="spectral text-h5 absolute-bottom text-right image-title"
                    >
                      {{ image.title }}
                    </div>
                  </q-img>
                </q-card>
              </q-intersection>
            </div>
          </div>
        </div>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useMeta, useQuasar } from 'quasar'

const $q = useQuasar()
const { t } = useI18n({ useScope: 'global' })

// Optimized image configuration with lazy imports
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

// Computed property for responsive images with stable loading
const images = computed(() =>
  imageConfigs.map((config, index) => {
    // Use the largest available size to avoid reloading on resize
    const preferredSize = config.sizes.large || config.sizes.medium || config.sizes.small

    return {
      id: `gallery-image-${index}`,
      src: new URL(`../assets/${config.basePath}/${preferredSize}.png`, import.meta.url).href,
      srcset: `
        ${new URL(`../assets/${config.basePath}/${config.sizes.small}.png`, import.meta.url).href} 1x,
        ${config.sizes.medium ? new URL(`../assets/${config.basePath}/${config.sizes.medium}.png`, import.meta.url).href + ' 2x,' : ''}
        ${config.sizes.large ? new URL(`../assets/${config.basePath}/${config.sizes.large}.png`, import.meta.url).href + ' 3x' : ''}
      `.trim().replace(/,\s*$/, ''), // Clean up trailing comma
      title: config.title,
      alt: config.title || `${config.basePath.split('/').pop()} image`
    }
  })
)

// Computed classes
const gutterClasses = computed(() => [
  $q.screen.gt.sm ? 'q-gutter-xl' : 'q-gutter-y-xl',
  'row justify-center'
])

// Preload critical images for better performance
onMounted(() => {
  // Preload the first few images for better perceived performance
  images.value.slice(0, 4).forEach(image => {
    const link = document.createElement('link')
    link.rel = 'preload'
    link.as = 'image'
    link.href = image.src
    document.head.appendChild(link)
  })
})

// Reactive meta tags
useMeta(() => ({
  title: `${t('gallery')} – Harlow's Bar`,
  meta: {
    description: {
      name: 'description',
      content: t('galleryDescription') || 'Photo gallery of our classic cocktails and location'
    },
    keywords: {
      name: 'keywords',
      content: 'gin tonic, amaretto sour, aviation, bacardi cocktail, black mojito, mojito, boulevardier, martini, dirty martini, vesper martini, daiquiri, hemingway special, wine, mulled wine, orange blossom, rusty nail, whiskey sour'
    }
  }
}))
</script>

<style lang="scss" scoped>
.capitalize-first-letter::first-letter {
  text-transform: capitalize;
}

.gallery-section {
  padding: 2rem 0;
  min-height: 100vh;
}

.gallery-card {
  border-radius: 8px;
  overflow: hidden;

  &:hover {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
}

.gallery-image {
  border-radius: 8px;
  transition: opacity 0.3s ease;

  // Ensure smooth loading states
  &.q-img--loading {
    opacity: 0.8;
  }

  &.q-img--loaded {
    opacity: 1;
  }
}

// Prevent layout shift during image loading
.q-img__container {
  background-color: rgba(255, 255, 255, 0.05);
}

// Optimize spinner appearance
.q-img__loading {
  backdrop-filter: blur(2px);
  background-color: rgba(0, 0, 0, 0.1);
}

.image-title {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.7));
  font-size: 1.6rem;
  padding: 1rem;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.8);
}

// Performance optimizations
.spectral {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Intersection observer optimization
.q-intersection {
  min-height: 200px; // Prevent layout shift
}

// Animation optimizations
.animated {
  animation-fill-mode: both;
}

// Responsive optimizations
@media (max-width: $breakpoint-sm-max) {
  .gallery-section {
    padding: 1rem 0;
  }

  .image-title {
    font-size: 1.4rem;
    padding: 0.5rem;
  }
}

@media (prefers-reduced-motion: reduce) {
  .gallery-card {
    transition: none;
  }

  .animated {
    animation: none;
  }
}
</style>
