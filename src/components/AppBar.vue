<template>
  <div class="appbar bg-primary">
    <q-toolbar class="app-toolbar justify-center">
      <q-btn
        flat
        dense
        icon="menu"
        style="position: absolute; left: 14px; top: 14px"
        @click="drawer = !drawer"
        aria-label="Menu"
      />
      <router-link :to="`/${currentLocale}`" aria-label="Home">
        <q-img
          src="/logo-0.1x.png"
          :width="
            $q.screen.xs
              ? '160px'
              : $q.screen.sm
              ? '180px'
              : $q.screen.md
              ? '200px'
              : $q.screen.lg
              ? '220px'
              : '260px'
          "
          alt="Harlow's Bar Logo"
          :style="{
            marginTop: $q.screen.gt.sm ? '6px' : '0',
            marginBottom: $q.screen.gt.sm ? '6px' : '0',
          }"
        />
      </router-link>

      <!-- Language Toggle in top right -->
      <q-btn
        flat
        dense
        :label="nextLanguage.toUpperCase()"
        @click="toggleLanguage"
        class="text-white"
        style="
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 0.8rem;
          min-height: 32px;
        "
      />
    </q-toolbar>
    <q-bar :class="['hours-bar']">
      <div
        :class="[
          $q.screen.gt.sm ? 'text-body1' : 'text-caption',
          'row no-wrap full-width justify-evenly hours-content items-center',
        ]"
      >
        <div
          v-for="group in dayHourCombos"
          :key="group.label + group.hours"
          :class="['hours-item', { 'is-today': group.isToday }]"
        >
          <span
            :class="[
              $q.screen.lt.sm ? 'q-pr-xs' : 'q-pr-md',
              group.isToday ? 'hours-today' : 'hours-other',
            ]"
          >
            {{ group.label }}
          </span>
          <span :class="group.isToday ? 'hours-today' : 'hours-other'">{{
            group.hours
          }}</span>
        </div>
      </div>
    </q-bar>
  </div>
  <q-drawer
    v-model="drawer"
    class="bg-primary"
    :width="$q.screen.gt.sm ? 280 : 240"
    dark
    behavior="mobile"
  >
    <q-list padding>
      <!-- Navigation -->
      <q-item-label header class="text-body1">Navigation</q-item-label>

      <!-- Home Page Link -->
      <q-item clickable v-ripple @click="goToHome" v-close-popup>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-regular">Home</q-item-label>
        </q-item-section>
      </q-item>

      <!-- Menu Page Link -->
      <q-item clickable v-ripple @click="goToMenuPage" v-close-popup>
        <q-item-section>
          <q-item-label class="text-h6 text-weight-regular">Menu</q-item-label>
        </q-item-section>
      </q-item>

      <q-separator spaced />

      <!-- Menu Sections -->
      <q-item-label header class="text-body1">Menu Sections</q-item-label>
      <q-item
        v-for="link in menuSectionLinks"
        :key="link.anchor"
        clickable
        v-ripple
        @click="goToMenuAnchor(link.anchor)"
        v-close-popup
        class="q-pl-lg"
      >
        <q-item-section>
          <q-item-label class="text-h6 text-weight-regular">{{
            link.label
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="full-width text-center" style="position: fixed; bottom: 12px">
      <div class="text-caption text-grey-6">
        © {{ new Date().getFullYear() }} Harlow's Bar
      </div>
    </div>
  </q-drawer>
</template>

<script setup>
import { computed, ref } from "vue";
import { useRouter, useRoute } from "vue-router";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import menu from "src/menu.js";

const router = useRouter();
const route = useRoute();
const $q = useQuasar();
const { t, locale } = useI18n({ useScope: "global" });
const drawer = ref(false);
import { businessHoursByDay, jsDayToKey } from "../businessHours.js";

// List of days in display order
const displayDays = ["mon", "tue", "wed", "thu", "fri", "sat", "sun"];

function groupDaysByHours() {
  const groups = [];
  let currentGroup = null;
  for (const day of displayDays) {
    const hours = businessHoursByDay[day];
    if (!currentGroup || currentGroup.hours !== hours) {
      if (currentGroup) groups.push(currentGroup);
      currentGroup = { days: [day], hours };
    } else {
      currentGroup.days.push(day);
    }
  }
  if (currentGroup) groups.push(currentGroup);
  return groups;
}

function formatHourString(hours) {
  // Replace times like '19:00' with '19', '01:00' with '01', etc.
  return hours.replace(/(\d{1,2}):00/g, "$1");
}

function getActiveDayKey() {
  const now = new Date();
  const todayIdx = now.getDay();
  const todayKey = jsDayToKey[todayIdx];
  const yesterdayIdx = (todayIdx + 6) % 7;
  const yesterdayKey = jsDayToKey[yesterdayIdx];
  // Check if yesterday was open late and still open now
  const yesterdayHours = businessHoursByDay[yesterdayKey];
  const match =
    yesterdayHours &&
    yesterdayHours.match(/(\d{1,2}):(\d{2})\s*-\s*(\d{1,2}):(\d{2})/);
  if (match) {
    let [_, openH, openM, closeH, closeM] = match;
    openH = parseInt(openH, 10);
    openM = parseInt(openM, 10);
    closeH = parseInt(closeH, 10);
    closeM = parseInt(closeM, 10);
    const openTime = new Date(now);
    openTime.setDate(openTime.getDate() - 1);
    openTime.setHours(openH, openM, 0, 0);
    let closeTime = new Date(now);
    closeTime.setDate(closeTime.getDate());
    closeTime.setHours(closeH, closeM, 0, 0);
    if (closeH < openH || (closeH === openH && closeM < openM)) {
      // If now is after midnight but before close, highlight yesterday
      if (now >= openTime && now <= closeTime) {
        return yesterdayKey;
      }
    }
  }
  return todayKey;
}

const activeDayKey = computed(() => getActiveDayKey());

const dayHourCombos = computed(() => {
  return groupDaysByHours()
    .filter((group) => group.hours && group.hours.trim() !== "")
    .map((group) => {
      const isToday = group.days.includes(activeDayKey.value);
      const localizedDays = group.days.map((dk) => t("days." + dk)).join(" & ");
      return {
        label: localizedDays,
        hours: formatHourString(group.hours),
        isToday,
      };
    });
});

const currentLocale = computed(() => {
  return (route.params.locale || locale.value || "es").toString();
});

const toggleLanguage = () => {
  const next = nextLanguage.value;
  locale.value = next;
  // Always navigate using path based routing for Nuxt
  const path = route.name === "menu" ? `/${next}/menu` : `/${next}`;
  router.push(path);
};

const nextLanguage = computed(() => (locale.value === "en" ? "es" : "en"));

const goToHome = () => {
  const loc = currentLocale.value;
  router.push(`/${loc}`);
};

const goToMenuPage = () => {
  drawer.value = false;
  const loc = currentLocale.value;
  router.push(`/${loc}/menu`);
};

const goToMenuAnchor = async (anchor) => {
  drawer.value = false;
  const loc = currentLocale.value;
  const isMenu = route.name === "menu";
  if (!isMenu) {
    await router.push(`/${loc}/menu`);
    // Wait a tick for DOM
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 250);
  } else {
    const el = document.getElementById(anchor);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }
};

const slugify = (str) =>
  (str || "")
    .toString()
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "")
    .trim();

const menuSectionLinks = computed(() => {
  const sections = [];
  Object.entries(menu).forEach(([key, section]) => {
    // Use label if present, else key. Support {en, es} object via t-like fallback
    let label = section?.label ?? key;
    if (label && typeof label === "object") {
      const loc = currentLocale.value || "en";
      label = label[loc] ?? label.en ?? Object.values(label)[0] ?? key;
    }
    sections.push({ label, anchor: `menu-section-${slugify(key)}` });
  });
  return sections;
});
</script>

<style lang="scss">
.hours-other {
  font-size: 0.7rem;
  opacity: 0.8;
}
.hours-today {
  color: #fff !important;
  font-size: 0.75rem;
  font-weight: bold;
  text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
}
.q-item__label::first-letter {
  text-transform: capitalize;
}

// Normal-flow app bar (scrolls with content)
.appbar.bg-primary {
  width: 100%;
  transition: background-color 0.3s;
}
/* Increased header and hours bar sizes for breathing room */
.app-toolbar {
  min-height: 64px;
  padding-top: 6px;
  padding-bottom: 6px;
}
.hours-bar {
  min-height: 30px;
}
.hours-item {
  display: flex;
  align-items: center;
}
.hours-item.is-today::before {
  content: "";
  display: inline-block;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background-color: #fff;
  margin-right: 2px;
  box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
}

/* Tighter baseline and consistent line height to avoid vertical shift */
.hours-content {
  line-height: 1.3;
}
</style>
