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
          <div class="col-xs-10 col-sm-8 col-md-6 col-lg-5 col-xl-4">
            <div class="hero-separation-card text-center">
              <div class="hero-text-overlay">
                <h1 class="text-h2 hero-seasons">
                  {{ t("hero.headline") }}
                </h1>
                <h2
                  class="text-h6 text-weight-light q-mt-md q-mb-xl hero-subtitle"
                >
                  {{ t("hero.subtitle") }}
                </h2>
              </div>
              <q-btn
                color="accent"
                padding="lg xl"
                :size="$q.screen.xs ? 'lg' : 'xl'"
                content-class="bg-accent"
                no-caps
                aria-label="View Menu"
                class="hero-menu-btn"
                @click="goToMenu()"
              >
                <span
                  class="text-h5 text-weight-regular capitalize-first-letter"
                >
                  {{ t("menu.view") }}
                </span>
              </q-btn>
            </div>
          </div>
        </div>
      </transition>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="contact-section">
      <div class="q-pb-xl">
        <div class="row justify-center items-center text-center q-pb-lg">
          <div class="col-xs-12 col-md-8 col-lg-6">
            <div class="row justify-center items-center q-gutter-lg q-my-md">
              <transition-group
                appear
                enter-active-class="animated zoomIn"
                leave-active-class="animated zoomOut"
              >
                <q-btn
                  class="col-xs-8 col-sm-6 col-md-3 col-lg-4 bg-primary"
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
          style="border: 0; display: block"
          loading="lazy"
          referrerpolicy="no-referrer-when-downgrade"
          title="Google Maps"
        ></iframe>
      </div>
    </section>
  </q-page>
</template>

<script setup>
import { computed } from "vue";
import { useRouter, useRoute } from "vue-router";
import { buildRestaurantJsonLd, absoluteUrl } from "src/seo.js";
import { useI18n } from "vue-i18n";
import { useMeta, useQuasar } from "quasar";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const { t, locale } = useI18n({ useScope: "global" });

// Contact buttons data
const contactButtons = [
  {
    icon: "logo-instagram",
    title: "instagram",
    subtitle: "@harlows.bar",
    href: "https://www.instagram.com/harlows.bar",
  },
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

// Computed classes for better performance
const heroContentClasses = computed(() => [
  $q.screen.xs ? "justify-between" : "justify-center",
  "row full-width hero-content",
]);

useMeta(() => ({
  title: t("page.title") || "Harlow's Bar – Classic Cocktail Lounge",
  meta: {
    description: {
      name: "description",
      content:
        t("page.description") ||
        "Vintage, prohibition-era classic cocktails in a relaxed 1920s lounge.",
    },
    // Open Graph tags for social sharing
    "og:title": {
      property: "og:title",
      content: t("page.title") || "Harlow's Bar – Classic Cocktail Lounge",
    },
    "og:description": {
      property: "og:description",
      content:
        t("page.description") ||
        "1920s cocktails made according to the original recipes — Valencia, Spain",
    },
    "og:image": {
      property: "og:image",
      content: absoluteUrl("/icons/og-image.png"),
    },
    "og:image:secure_url": {
      property: "og:image:secure_url",
      content: absoluteUrl("/icons/og-image.png"),
    },
    "og:image:alt": {
      property: "og:image:alt",
      content:
        t("page.ogImageAlt") ||
        "Signature cocktails at Harlow's Bar in Valencia, Spain",
    },
    "og:image:width": {
      property: "og:image:width",
      content: "1200",
    },
    "og:image:height": {
      property: "og:image:height",
      content: "630",
    },
    "og:url": {
      property: "og:url",
      content: absoluteUrl(`/${route.params.locale || locale.value || "es"}`),
    },
    "og:type": {
      property: "og:type",
      content: "restaurant",
    },
    "og:site_name": {
      property: "og:site_name",
      content: "Harlow's Bar",
    },
    "og:locale": {
      property: "og:locale",
      content:
        (route.params.locale || locale.value || "es") === "es"
          ? "es_ES"
          : "en_US",
    },
    // Locale alternates to help platforms understand available translations
    "og:locale:alternate:es": {
      property: "og:locale:alternate",
      content: "es_ES",
    },
    "og:locale:alternate:en": {
      property: "og:locale:alternate",
      content: "en_US",
    },
    // Twitter Card tags (mirror OG)
    "twitter:card": {
      name: "twitter:card",
      content: "summary_large_image",
    },
    "twitter:title": {
      name: "twitter:title",
      content: t("page.title") || "Harlow's Bar – Classic Cocktail Lounge",
    },
    "twitter:description": {
      name: "twitter:description",
      content:
        t("page.description") ||
        "1920s cocktails made according to the original recipes — Valencia, Spain",
    },
    "twitter:image": {
      name: "twitter:image",
      content: absoluteUrl("/icons/og-image.png"),
    },
  },
  link: [
    { rel: "alternate", hreflang: "es", href: absoluteUrl("/es") },
    { rel: "alternate", hreflang: "en", href: absoluteUrl("/en") },
    { rel: "alternate", hreflang: "x-default", href: absoluteUrl("/es") },
    {
      rel: "canonical",
      href: absoluteUrl(`/${route.params.locale || locale.value || "es"}`),
    },
  ],
  script: [
    {
      type: "application/ld+json",
      children: JSON.stringify(
        buildRestaurantJsonLd({
          locale: (route.params.locale || locale.value || "es").toString(),
        })
      ),
    },
  ],
}));

const goToMenu = () => {
  const loc = router.currentRoute.value.params.locale || locale.value || "es";
  router.push({ name: "menu", params: { locale: loc } });
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

.hero-seasons {
  font-family: "the-seasons", sans-serif;
  font-weight: 700;
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
    margin-top: 0;
    margin-bottom: 1rem;
    letter-spacing: 1px;
  }

  h2 {
    color: rgba(255, 255, 255, 0.9) !important;
    line-height: 1.4;
  }
}

.hero-subtitle {
  max-width: 400px;
  margin: 1rem auto 0 auto;
}

.hero-menu-btn {
  margin-top: 1rem;
}

// Contact section styles - keeping original layout
.contact-section {
  background-color: rgba(22, 52, 42, 0.03); // Using your primary color
}
</style>
