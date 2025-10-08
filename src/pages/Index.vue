<template>
  <q-page class="single-page-layout">
    <!-- Hero Section -->
    <section id="hero" class="hero">
      <transition
        appear
        enter-active-class="animated fadeIn slower"
        leave-active-class="animated fadeOut"
        mode="out-in"
      >
        <div :class="heroContentClasses">
          <div class="col-xs-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 spectral">
            <div class="hero-content-wrapper text-center">
              <div class="hero-separation-card">
                <div class="hero-text-overlay">
                  <h1 :class="headlineClasses">
                    {{ t("hero.headline") }}
                  </h1>
                  <h2
                    class="text-h6 text-weight-regular q-mt-md q-mb-xl hero-subtitle"
                  >
                    {{ t("hero.subtitle") }}
                  </h2>
                </div>
                <q-btn-dropdown
                  color="accent"
                  padding="lg xl"
                  :size="$q.screen.xs ? 'lg' : 'xl'"
                  content-class="bg-accent"
                  no-caps
                  aria-label="View Menu"
                  class="hero-menu-btn"
                >
                  <template v-slot:label>
                    <span
                      class="text-h5 spectral text-weight-regular capitalize-first-letter"
                    >
                      {{ t("menu.view") }}
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
                        <q-item-label
                          class="text-h6 text-weight-regular spectral"
                        >
                          {{ lang.label }}
                        </q-item-label>
                      </q-item-section>
                    </q-item>
                  </q-list>
                </q-btn-dropdown>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </section>

    <!-- Gallery Section -->
    <section id="gallery" class="gallery-section q-py-xl">
      <div class="row justify-center text-center">
        <div class="col-xs-12">
          <transition
            appear
            enter-active-class="animated fadeIn slower"
            leave-active-class="animated fadeOut"
            mode="out-in"
          >
            <h1
              class="capitalize-first-letter text-h3 text-weight-regular spectral text-italic"
            >
              {{ t("gallery.title") }}
            </h1>
          </transition>
        </div>
      </div>
      <div class="masonry-grid-wrapper">
        <div class="masonry-grid">
          <div
            v-for="image in galleryImages"
            :key="image.id"
            class="masonry-item"
          >
            <q-intersection once transition="fade" :threshold="0.1">
              <q-card flat class="bg-transparent gallery-card">
                <q-img
                  :src="image.src"
                  :srcset="image.srcset"
                  :alt="image.alt"
                  loading="lazy"
                  spinner-color="accent"
                  :ratio="4 / 3"
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
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="q-py-xl">
        <div class="row justify-center items-center text-center">
          <transition
            appear
            enter-active-class="animated fadeIn slower"
            leave-active-class="animated fadeOut"
          >
            <div class="col-xs-12 col-md-8 col-lg-6 col-xl-4 spectral">
              <div
                :class="[
                  $q.screen.gt.sm ? 'text-h2' : 'text-h3',
                  'text-italic',
                ]"
              >
                {{ t("instagram.follow") }}
              </div>
              <q-btn
                color="accent"
                padding="sm lg"
                :size="$q.screen.xs ? 'lg' : 'xl'"
                no-caps
                class="q-mt-lg"
                icon-right="ion-logo-instagram"
                href="https://www.instagram.com/harlows.bar/"
                target="_blank"
              >
                <span
                  class="text-h5 text-weight-regular capitalize-first-letter"
                  >{{ t("instagram.view") }}</span
                >
              </q-btn>
            </div>
          </transition>
        </div>
      </div>
      <div class="q-pb-xl">
        <div class="row justify-center items-center text-center q-pb-lg">
          <div class="col-xs-12 col-md-8 col-lg-6 col-xl-4 spectral">
            <div class="row justify-center items-center q-gutter-lg q-my-md">
              <transition-group
                appear
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut"
              >
                <q-btn
                  class="col-md-3 col-8 bg-primary"
                  style="height: 200px"
                  v-for="button in contactButtons"
                  :key="button.title"
                  :href="button.href"
                  target="_blank"
                >
                  <div class="row justify-center items-center">
                    <div class="col-12">
                      <q-icon
                        :name="`ion-${button.icon}`"
                        size="lg"
                        color="accent"
                        class="q-py-lg"
                      />
                    </div>
                    <h5 class="text-weight-thin q-my-sm col-12">
                      {{ t("contact." + button.title) }}
                    </h5>
                    <p class="text-caption text-grey-4 col-7 col-md-10">
                      {{ button.subtitle }}
                    </p>
                  </div>
                </q-btn>
              </transition-group>
            </div>
          </div>
        </div>
      </div>
      <div>
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3079.7956147359905!2d-0.38684602266516505!3d39.47394581247808!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xd604fe3f94d65cf%3A0x4471acc1b9c7ad98!2sHarlow&#39;s%20Bar!5e0!3m2!1sen!2ses!4v1697395155698!5m2!1sen!2ses"
          width="100%"
          height="510"
          style="border: 0"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { computed, onMounted } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useMeta, useQuasar } from "quasar";

const router = useRouter();
const $q = useQuasar();
const { t, locale } = useI18n({ useScope: "global" });

// Move static data outside of reactive context
const localeOptions = [
  { value: "en", label: "English" },
  { value: "es", label: "Español" },
];

// Gallery image configurations
const imageConfigs = [
  {
    basePath: "cocktails/dirtymartini",
    sizes: { small: "0.1x", medium: "0.33x", large: "0.5x" },
    title: "Dirty Martini",
  },
  {
    basePath: "cocktails/whiskeysour",
    sizes: { small: "0.1x", medium: "0.33x", large: "0.5x" },
    title: "Whiskey Sour",
  },
  {
    basePath: "cocktails/aviation",
    sizes: { small: "0.1x", medium: "0.33x", large: "0.5x" },
    title: "Aviation",
  },
  {
    basePath: "cocktails/orangeblossom",
    sizes: { small: "0.1x", medium: "0.33x", large: "0.5x" },
    title: "Orange Blossom",
  },
  {
    basePath: "cocktails/rustynail",
    sizes: { small: "0.1x", medium: "0.33x", large: "0.5x" },
    title: "Rusty Nail",
  },
  {
    basePath: "cocktails/amarettosour",
    sizes: { small: "0.1x", medium: "0.33x", large: "0.5x" },
    title: "Amaretto Sour",
  },
  {
    basePath: "cocktails/blackmojito",
    sizes: { small: "0.1x", medium: "0.33x", large: "0.5x" },
    title: "Black Mojito",
  },
  {
    basePath: "cocktails/hemingwayspecial",
    sizes: { small: "0.1x", medium: "0.33x", large: "0.5x" },
    title: "Hemingway Special",
  },
];

// Contact buttons data
const contactButtons = [
  {
    icon: "pin",
    title: "address",
    subtitle: "Carrer de Lepant 4, 46008 Valencia",
    href: "https://maps.app.goo.gl/y8zXASHuxx2pLbyf9",
  },
  {
    icon: "logo-whatsapp",
    title: "whatsapp",
    subtitle: "(+34) 692 940 844",
    href: "https://wa.me/34657123456",
  },
  {
    icon: "mail",
    title: "email",
    subtitle: "info@harlows.bar",
    href: "mailto:info@harlows.bar",
  },
];

// Optimize computed property
const menuPath = computed(
  () => `${locale.value.toUpperCase()}_Harlow's Menu_16.04.pdf`
);

// Computed classes for better performance
const heroContentClasses = computed(() => [
  $q.screen.xs ? "justify-between" : "justify-center",
  "row full-width hero-content",
]);

const headlineClasses = computed(() => [
  $q.screen.gt.xs ? "text-h2" : "text-h3",
  "text-weight-regular text-italic",
]);

// Gallery computed properties
const galleryImages = computed(() => {
  return imageConfigs.map((config, index) => {
    const srcPath = `src/assets/${config.basePath}/${config.sizes.small}.png`;
    const srcsetParts = Object.entries(config.sizes).map(
      ([size, filename]) =>
        `src/assets/${config.basePath}/${filename}.png ${getScreenDensity(
          size
        )}`
    );

    return {
      id: `image-${index}`,
      src: srcPath,
      srcset: srcsetParts.join(", "),
      alt: config.title || `${config.basePath.split("/").pop()} image`,
      title: config.title,
    };
  });
});

const gutterClasses = computed(() => [
  "row",
  $q.screen.xs ? "q-gutter-xs" : "q-gutter-md",
]);

// Helper function for screen density
const getScreenDensity = (size) => {
  const densityMap = {
    "0.1x": "0.1x",
    "0.33x": "0.33x",
    "0.5x": "0.5x",
  };
  return densityMap[size] || "1x";
}; // Optimize meta setup
useMeta(() => ({
  title: t("page.title") || "Harlow's Bar – Classic Cocktail Lounge",
  meta: {
    description: {
      name: "description",
      content:
        t("page.description") ||
        "Vintage, prohibition-era classic cocktails in a relaxed 1920s lounge.",
    },
  },
}));

// Preload menu PDFs on component mount for instant access
onMounted(() => {
  // Preload both menu PDFs for instant viewing
  const menuPaths = [
    "EN_Harlow's Menu_16.04.pdf",
    "ES_Harlow's Menu_16.04.pdf",
  ];

  menuPaths.forEach((path) => {
    const link = document.createElement("link");
    link.rel = "prefetch";
    link.href = path;
    link.as = "document";
    document.head.appendChild(link);
  });
});

const goToMenu = (lang) => {
  locale.value = lang;
  const routeData = router.resolve({ path: menuPath.value });
  window.open(routeData.href, "_blank");
};
</script>

<style lang="scss" scoped>
.capitalize-first-letter::first-letter {
  text-transform: uppercase;
}

// Single page layout
.single-page-layout {
  display: flex;
  flex-direction: column;
}

// Hero section styles - keeping original design with your branding
.hero {
  display: flex;
  flex: 1;
  min-height: calc(100vh - 92px); // Adjust for header height
}

.hero-content {
  align-items: center;
  justify-content: center;

  // Use more specific breakpoints and combine rules
  @media (max-width: $breakpoint-xs-max) {
    flex-direction: column;
    justify-content: center;
  }
}

.hero-content-wrapper {
  padding: 1rem;
}

.hero-separation-card {
  background: rgba(0, 0, 0, 0.85);
  border-radius: 16px;
  padding: 3rem 2rem;
  box-shadow: 0 12px 48px rgba(0, 0, 0, 0.4);
  border: 1px solid rgba(255, 255, 255, 0.12);

  @media (max-width: $breakpoint-xs-max) {
    padding: 2rem 1.5rem;
    border-radius: 12px;
  }
}

.hero-text-overlay {
  margin-bottom: 2rem;

  h1 {
    color: white !important;
    margin-bottom: 1rem;
    font-weight: 300;
    letter-spacing: 1px;
  }

  h2 {
    color: rgba(255, 255, 255, 0.9) !important;
    font-weight: 300;
    line-height: 1.4;
  }
}

.hero-subtitle {
  max-width: 400px;
  margin: 1rem auto 0 auto;
}

.hero-menu-btn {
  margin-top: 1rem;
} // Gallery section styles - restored with better spacing

.gallery-section {
  background-color: rgba(0, 0, 0, 0.02);
}

.masonry-grid-wrapper {
  display: flex;
  justify-content: center;
  padding: 0 1rem;
}

.masonry-grid {
  column-count: 1;
  column-gap: 1.5rem;
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;

  @media (min-width: 600px) {
    column-count: 2;
  }
  @media (min-width: 900px) {
    column-count: 3;
  }
  @media (min-width: 1200px) {
    column-count: 4;
  }
}

.masonry-item {
  break-inside: avoid;
  margin-bottom: 1.5rem;
  width: 100%;
}

.gallery-card {
  border-radius: 24px;
  overflow: hidden;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  }
}

.gallery-image {
  border-radius: 24px;
}

.image-title {
  background: linear-gradient(transparent, rgba(0, 0, 0, 0.8));
  padding: 16px;
  color: white;
  text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
}

// Contact section styles - keeping original layout
.contact-section {
  background-color: rgba(22, 52, 42, 0.03); // Using your primary color
}

// Add performance optimizations
.animated {
  animation-fill-mode: both;
}

// Optimize for better text rendering
.spectral {
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

// Smooth scrolling for anchor links
html {
  scroll-behavior: smooth;
}
</style>
