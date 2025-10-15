<template>
  <div class="appbar bg-primary">
    <q-toolbar class="appbar__toolbar">
      <q-btn
        flat
        dense
        icon="menu"
        class="appbar__menu-btn"
        @click="drawer = !drawer"
        aria-label="Menu"
      />

      <router-link
        :to="{ name: 'home' }"
        aria-label="Home"
        class="appbar__logo"
      >
        <q-img
          src="~/assets/logo-0.1x.png"
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
        />
      </router-link>

      <q-btn
        flat
        dense
        icon="language"
        :label="nextLanguage.toUpperCase()"
        @click="toggleLanguage"
        class="appbar__language-switch"
        aria-label="Switch language"
      />
    </q-toolbar>

    <q-bar class="appbar__hours-bar">
      <div class="appbar__hours-content">
        <div
          v-for="group in dayHourCombos"
          :key="group.label + group.hours"
          :class="['appbar__hours-item', { 'is-today': group.isToday }]"
        >
          <span class="appbar__hours-label">{{ group.label }}</span>
          <span class="appbar__hours-value">{{ group.hours }}</span>
        </div>
      </div>
    </q-bar>
  </div>

  <q-drawer
    v-model="drawer"
    class="appbar__drawer bg-primary"
    :width="$q.screen.gt.sm ? 280 : 240"
    dark
    behavior="mobile"
  >
    <q-list padding class="appbar__nav">
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
        class="appbar__menu-section-link"
      >
        <q-item-section>
          <q-item-label class="text-h6 text-weight-regular">{{
            link.label
          }}</q-item-label>
        </q-item-section>
      </q-item>
    </q-list>

    <div class="appbar__copyright">
      <div class="text-caption">
        © {{ new Date().getFullYear() }} Harlow's Bar
      </div>
    </div>
  </q-drawer>
</template>
<script setup>
import { computed, ref } from "vue";
import { useRouter } from "vue-router";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import menu from "src/menu.js";

const router = useRouter();
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

const toggleLanguage = () => {
  const next = nextLanguage.value;
  locale.value = next;
  const name = router.currentRoute.value.name;
  const params = { ...router.currentRoute.value.params, locale: next };
  const query = router.currentRoute.value.query;
  if (name) {
    router.push({ name, params, query });
  } else {
    router.push({ path: `/${next}` });
  }
};

const nextLanguage = computed(() => (locale.value === "en" ? "es" : "en"));

const goToHome = () => {
  const loc = router.currentRoute.value.params.locale || locale.value || "es";
  router.push({ name: "home", params: { locale: loc } });
};

const goToMenuPage = () => {
  const loc = router.currentRoute.value.params.locale || locale.value || "es";
  router.push({ name: "menu", params: { locale: loc } });
};

const goToMenuAnchor = async (anchor) => {
  drawer.value = false;
  const loc = router.currentRoute.value.params.locale || locale.value || "es";
  const isMenu = router.currentRoute.value.name === "menu";
  if (!isMenu) {
    await router.push({ name: "menu", params: { locale: loc } });
    // Wait for next tick so DOM is ready
    setTimeout(() => {
      const el = document.getElementById(anchor);
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }, 250);
  } else {
    // Already on menu page
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
      const loc = (locale.value || "en").toString();
      label = label[loc] ?? label.en ?? Object.values(label)[0] ?? key;
    }
    sections.push({ label, anchor: `menu-section-${slugify(key)}` });
  });
  return sections;
});
</script>

<style lang="scss">
// AppBar BEM & nesting refactor
.appbar {
  &.bg-primary {
    width: 100%;
    transition: background-color 0.3s;
  }

  &__toolbar {
    min-height: 64px;
    padding-top: 6px;
    padding-bottom: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }

  &__menu-btn {
    position: absolute;
    left: 14px;
    top: 14px;
  }

  &__logo {
    margin: 0;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    img {
      display: block;
      max-width: 100%;
      height: auto;
    }
  }

  &__language-switch {
    position: absolute;
    right: 14px;
    top: 50%;
    transform: translateY(-50%);
    font-size: 0.8rem;
    min-height: 32px;
    color: #fff;
  }

  &__hours-bar {
    min-height: 30px;
  }

  &__hours-content {
    line-height: 1.3;
    display: flex;
    flex-wrap: nowrap;
    justify-content: space-evenly;
    align-items: center;
    width: 100%;
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  &__hours-item {
    display: flex;
    align-items: center;
    font-size: 0.7rem;
    opacity: 0.85;

    &.is-today {
      font-size: 0.75rem;
      font-weight: 700;
      color: #fff !important;
      text-shadow: 0 1px 4px rgba(0, 0, 0, 0.35);
      opacity: 1;

      &::before {
        content: "";
        display: inline-block;
        width: 6px;
        height: 6px;
        border-radius: 50%;
        background-color: #fff;
        margin-right: 2px;
        box-shadow: 0 0 6px rgba(0, 0, 0, 0.25);
      }
    }
  }

  &__hours-label {
    margin-right: 6px;
  }

  &__drawer {
    .appbar__nav {
      .q-item__label {
        &::first-letter {
          text-transform: capitalize;
        }
      }
    }

    .appbar__menu-section-link {
      padding-left: 1.5rem;
    }

    .appbar__copyright {
      position: fixed;
      bottom: 12px;
      width: 100%;
      text-align: center;
      .text-caption {
        color: #888;
      }
    }
  }
}
</style>
