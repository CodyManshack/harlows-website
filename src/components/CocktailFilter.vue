<template>
  <!-- In-place bar keeps the ref and observers; hidden when sticky -->
  <div class="cocktail-filter" ref="filterBar" v-show="!isSticky">
    <div class="cocktail-filter__content">
      <span class="cocktail-filter__label">{{ t("filter.label") }}</span>
      <div class="cocktail-filter__tags">
        <button
          v-for="tag in availableTags"
          :key="tag.id"
          :class="[
            'cocktail-filter__tag',
            { 'is-active': selectedTags.includes(tag.id) },
          ]"
          @click="toggleTag(tag.id)"
        >
          {{ tag.label }}
        </button>
      </div>
      <button
        v-if="selectedTags.length > 0"
        class="cocktail-filter__clear"
        @click="clearAllFilters"
      >
        {{ t("filter.clear") }}
      </button>
    </div>

    <!-- Flavor Profile Legend -->
    <div class="cocktail-filter__legend">
      <div class="cocktail-filter__legendCaption">
        {{ t("filter.legend.caption") }}
      </div>
      <FlavorProfileDots
        :profile="sampleProfile"
        :show-labels="true"
        :legend="true"
        :active-keys="activeSortKeys"
        @pick="onFlavorPick"
      />
    </div>
  </div>

  <!-- Teleport sticky bar to body to avoid transformed/contained ancestors -->
  <teleport to="body">
    <div v-if="isSticky" class="cocktail-filter cocktail-filter--sticky">
      <div class="cocktail-filter__content">
        <span class="cocktail-filter__label">{{ t("filter.label") }}</span>
        <div class="cocktail-filter__tags">
          <button
            v-for="tag in availableTags"
            :key="tag.id"
            :class="[
              'cocktail-filter__tag',
              { 'is-active': selectedTags.includes(tag.id) },
            ]"
            @click="toggleTag(tag.id)"
          >
            {{ tag.label }}
          </button>
        </div>
        <button
          v-if="selectedTags.length > 0"
          class="cocktail-filter__clear"
          @click="clearAllFilters"
        >
          {{ t("filter.clear") }}
        </button>
      </div>

      <!-- Flavor Profile Legend -->
      <div class="cocktail-filter__legend">
        <div class="cocktail-filter__legendCaption">
          {{ t("filter.legend.caption") }}
        </div>
        <FlavorProfileDots
          :profile="sampleProfile"
          :show-labels="true"
          :legend="true"
          :active-keys="activeSortKeys"
          @pick="onFlavorPick"
        />
      </div>
    </div>
  </teleport>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick,
  watch,
} from "vue";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import FlavorProfileDots from "./FlavorProfileDots.vue";

const props = defineProps({
  cocktails: Array,
});

const emit = defineEmits(["filter-change", "sticky-change", "sort-change"]);

const filterBar = ref(null);
const isSticky = ref(false);
const isVisible = ref(false);
const nextTitleVisible = ref(false);
const selectedTags = ref([]);
const parentSection = ref(null);
const activeSortKeys = ref([]); // e.g., ['boozy','bitter'] in order clicked
// Cached DOM refs for fallback computations
const sectionTitleEl = ref(null);
const bottomBoundEl = ref(null);
const nextSectionTitleEl = ref(null);

const { t, locale } = useI18n();
const $q = useQuasar();

// IntersectionObserver tuning
const OBS_DEBOUNCE_MS = 60; // reduce flicker by debouncing observer callbacks

function debounce(fn, delay) {
  let timer = null;
  const debounced = (...args) => {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };
  return debounced;
}

const availableTags = computed(() => [
  { id: "seasonal", label: t("filter.tags.seasonal") },
  { id: "egg", label: t("filter.tags.egg") },
  { id: "fruity", label: t("filter.tags.fruity") },
  { id: "spicy", label: t("filter.tags.spicy") },
  { id: "under10", label: t("filter.tags.under10") },
  { id: "premium", label: t("filter.tags.premium") },
]);

const sampleProfile = {
  boozy: 5,
  bitter: 5,
  sweet: 5,
  citrus: 5,
  tart: 5,
};

// Responsive bottom buffer to avoid covering the next section title.
// Combines header height, filter height, and an extra margin that is larger on small screens.
function getBottomBufferPx() {
  const appBarH = 0;
  const filterH = filterBar.value?.offsetHeight || 80;
  // Extra margin by breakpoint
  let extra = 16; // desktop default
  if ($q?.screen?.xs === true || $q?.screen?.lt?.sm === true)
    extra = 56; // phones
  else if ($q?.screen?.lt?.md === true) extra = 32; // small tablets
  return Math.round(appBarH + filterH + extra);
}

// i18n-aware value resolver for strings or {en, es} objects
function trVal(value) {
  if (value && typeof value === "object") {
    const loc = (locale.value || "en").toString();
    return value[loc] ?? value.en ?? Object.values(value)[0] ?? "";
  }
  return value ?? "";
}
function nameOf(item) {
  return String(trVal(item?.name) || "");
}
function descOf(item) {
  return String(trVal(item?.description) || "").toLowerCase();
}

const filteredCocktails = computed(() => {
  const source = Array.isArray(props.cocktails) ? props.cocktails : [];
  if (selectedTags.value.length === 0) {
    return [...source].sort((a, b) => nameOf(a).localeCompare(nameOf(b)));
  }

  let filtered = [...source];

  // Threshold for flavor profile matching (0-5 scale). A value ≥ threshold counts as matching
  const threshold = 3;

  // Apply all selected tag filters (AND logic - cocktail must match ALL selected tags)
  filtered = filtered.filter((cocktail) => {
    return selectedTags.value.every((tag) => {
      const loc = (locale.value || "en").toString();
      const kw = {
        fruity: {
          en: ["fruit", "berry", "cherry", "apple", "pomegranate", "raspberry"],
          es: ["fruta", "baya", "cereza", "manzana", "granada", "frambuesa"],
        },
        spicy: {
          en: ["spicy", "spice", "chili", "pepper", "cinnamon"],
          es: ["picante", "especia", "chile", "pimienta", "canela"],
        },
      };
      const words = (key) =>
        (kw[key]?.[loc] || kw[key]?.en || []).map((w) => w.toLowerCase());
      switch (tag) {
        case "seasonal":
          return cocktail.seasonal;
        case "egg":
          return cocktail.egg;
        case "boozy":
          return (cocktail.profile?.boozy ?? 0) >= threshold;
        case "sweet":
          return (cocktail.profile?.sweet ?? 0) >= threshold;
        case "strong":
          return (cocktail.profile?.boozy ?? 0) >= threshold; // map 'strong' to 'boozy'
        case "citrus":
          return (cocktail.profile?.citrus ?? 0) >= threshold;
        case "fruity":
          // no dedicated profile key; fall back to keyword match
          return words("fruity").some((w) => descOf(cocktail).includes(w));
        case "bitter":
          return (cocktail.profile?.bitter ?? 0) >= threshold;
        case "spicy":
          // not part of profile; keep keyword matching
          return words("spicy").some((w) => descOf(cocktail).includes(w));
        case "tart":
          return (cocktail.profile?.tart ?? 0) >= threshold;
        case "under10":
          return cocktail.price < 10;
        case "premium":
          return cocktail.price >= 12;
        default:
          return true;
      }
    });
  });

  // Always sort alphabetically by localized/display name
  return filtered.sort((a, b) => nameOf(a).localeCompare(nameOf(b)));
});

// Functions for tag management
const toggleTag = (tagId) => {
  const index = selectedTags.value.indexOf(tagId);
  if (index > -1) {
    selectedTags.value.splice(index, 1);
  } else {
    selectedTags.value.push(tagId);
  }
};

const clearAllFilters = () => {
  selectedTags.value = [];
};

// Handle clicks on flavor profile legend to toggle sort key
function onFlavorPick(key) {
  const idx = activeSortKeys.value.indexOf(key);
  if (idx >= 0) {
    // Clicking again removes that key
    activeSortKeys.value.splice(idx, 1);
  } else {
    activeSortKeys.value.push(key);
  }
  emit("sort-change", [...activeSortKeys.value]);
}

// Watch for filter changes and emit to parent
watch(
  selectedTags,
  () => {
    emit("filter-change", filteredCocktails.value);
  },
  { deep: true }
);

// Intersection Observer approach for better reliability
onMounted(() => {
  console.log(
    "🚀 CocktailFilter onMounted - Setting up Intersection Observers"
  );

  // Store parent section reference
  parentSection.value = filterBar.value?.closest(".menu-section");
  console.log(
    "Found parent section:",
    parentSection.value?.querySelector(".menu-section-title")?.textContent
  );

  if (!parentSection.value) {
    console.error("Could not find parent section");
    return;
  }

  // Find the section title and last cocktail item
  const sectionTitle = parentSection.value.querySelector(".menu-section-title");
  // Prefer a dedicated bottom sentinel if present; fallback to last cocktail item
  const bottomSentinel = parentSection.value.querySelector(
    ".cocktail-section-end-sentinel"
  );
  const cocktailItems = parentSection.value.querySelectorAll(".menu-item");
  const lastCocktailItem = cocktailItems[cocktailItems.length - 1];
  // Attempt to find the next section's title for early hide behavior
  const nextSectionTitle =
    parentSection.value.nextElementSibling?.querySelector?.(
      ".menu-section-title"
    );

  // Cache elements for fallback recompute
  sectionTitleEl.value = sectionTitle || null;
  bottomBoundEl.value = bottomSentinel || lastCocktailItem || null;
  nextSectionTitleEl.value = nextSectionTitle || null;

  console.log("Section title found:", !!sectionTitle);
  console.log(
    "Bottom sentinel found:",
    !!bottomSentinel,
    "last item:",
    !!lastCocktailItem
  );

  // Create observer options (no header offset needed)
  const createObserverOptions = () => ({
    threshold: 0,
    rootMargin: "0px 0px 0px 0px",
  });

  if (sectionTitle && (bottomSentinel || lastCocktailItem)) {
    // Observer for the section title (to determine sticky behavior)
    const onTitle = (entry) => {
      const appBarHeight = 0;
      const titleScrolledPast =
        !entry.isIntersecting && entry.boundingClientRect.top < appBarHeight;
      const shouldBeSticky = titleScrolledPast;
      if (isSticky.value !== shouldBeSticky) {
        isSticky.value = shouldBeSticky;
        emit("sticky-change", shouldBeSticky);
      }
    };
    const debouncedOnTitle = debounce(onTitle, OBS_DEBOUNCE_MS);
    let titleObserver = new IntersectionObserver(
      (entries) => debouncedOnTitle(entries[0]),
      createObserverOptions()
    );

    // Observer for the end of section (bottom sentinel or last item)
    const onSectionEnd = (entry) => {
      const appBarHeight = 0;
      const sectionTitle = parentSection.value?.querySelector?.(
        ".menu-section-title"
      );
      const sectionTitleRect = sectionTitle?.getBoundingClientRect();
      const topPassed =
        !!sectionTitleRect && sectionTitleRect.top <= appBarHeight;
      const boundBottom = entry.boundingClientRect.bottom;
      const bottomBuffer = getBottomBufferPx();
      const bottomNotPassed = boundBottom > bottomBuffer;
      const inSection = topPassed && bottomNotPassed;

      if (isVisible.value !== inSection) {
        isVisible.value = inSection;
        if (!inSection && isSticky.value) {
          isSticky.value = false;
          emit("sticky-change", false);
        } else if (inSection && !isSticky.value && topPassed) {
          isSticky.value = true;
          emit("sticky-change", true);
        }
      }
    };
    const debouncedOnSectionEnd = debounce(onSectionEnd, OBS_DEBOUNCE_MS);
    const sectionEndObserver = new IntersectionObserver(
      (entries) => debouncedOnSectionEnd(entries[0]),
      createObserverOptions()
    );

    // Optional: Observer for the NEXT section title — when it reaches the top zone, hide filter early
    let nextTitleObserver = null;
    if (nextSectionTitle) {
      const onNextTitle = (entry) => {
        nextTitleVisible.value = entry.isIntersecting;
      };
      const debouncedOnNextTitle = debounce(onNextTitle, OBS_DEBOUNCE_MS);
      nextTitleObserver = new IntersectionObserver(
        (entries) => debouncedOnNextTitle(entries[0]),
        createObserverOptions()
      );
      filterBar.value._debouncedNextTitleHandler = debouncedOnNextTitle;
    }

    // Start observing
    titleObserver.observe(sectionTitle);
    sectionEndObserver.observe(bottomSentinel || lastCocktailItem);
    if (nextSectionTitle && nextTitleObserver) {
      nextTitleObserver.observe(nextSectionTitle);
      filterBar.value._nextTitleObserver = nextTitleObserver;
    }

    // Store observers and debounced handlers for cleanup
    filterBar.value._titleObserver = titleObserver;
    filterBar.value._sectionEndObserver = sectionEndObserver;
    filterBar.value._debouncedTitleHandler = debouncedOnTitle;
    filterBar.value._debouncedSectionEndHandler = debouncedOnSectionEnd;

    console.log("✅ Intersection observers set up successfully");
  }

  // Initial filter emission
  emit("filter-change", filteredCocktails.value);

  // Fallback: scroll/resize recompute in case IntersectionObserver is flaky/minified
  const recomputeStickyVisibility = () => {
    try {
      const titleEl = sectionTitleEl.value;
      const boundEl = bottomBoundEl.value;
      if (!titleEl || !boundEl) return;
      const appBarHeight = 0;
      const titleRect = titleEl.getBoundingClientRect();
      const boundRect = boundEl.getBoundingClientRect();
      const topPassed = titleRect.top <= appBarHeight;
      const bottomBuffer = getBottomBufferPx();
      const bottomNotPassed = boundRect.bottom > bottomBuffer;
      const inSection = topPassed && bottomNotPassed;

      // Update sticky state
      const shouldBeSticky = topPassed && inSection;
      if (isSticky.value !== shouldBeSticky) {
        isSticky.value = shouldBeSticky;
        emit("sticky-change", shouldBeSticky);
      }
      if (isVisible.value !== inSection) {
        isVisible.value = inSection;
      }
    } catch (e) {
      // no-op
    }
  };

  // Debounced listeners
  const onScroll = debounce(recomputeStickyVisibility, 50);
  const onResize = debounce(() => {
    // Recompute after layout changes
    recomputeStickyVisibility();
  }, 120);

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);

  // Stash for cleanup
  filterBar.value._onScroll = onScroll;
  filterBar.value._onResize = onResize;

  // Run once after mount
  nextTick(() => recomputeStickyVisibility());
});

onBeforeUnmount(() => {
  console.log("🧹 Cleaning up intersection observers");

  if (filterBar.value?._titleObserver) {
    filterBar.value._titleObserver.disconnect();
  }

  if (filterBar.value?._sectionEndObserver) {
    filterBar.value._sectionEndObserver.disconnect();
  }
  if (filterBar.value?._nextTitleObserver) {
    filterBar.value._nextTitleObserver.disconnect();
  }
  // Cancel debounced handlers
  if (filterBar.value?._debouncedTitleHandler) {
    filterBar.value._debouncedTitleHandler.cancel?.();
    filterBar.value._debouncedTitleHandler = null;
  }
  if (filterBar.value?._debouncedSectionEndHandler) {
    filterBar.value._debouncedSectionEndHandler.cancel?.();
    filterBar.value._debouncedSectionEndHandler = null;
  }
  if (filterBar.value?._debouncedNextTitleHandler) {
    filterBar.value._debouncedNextTitleHandler.cancel?.();
    filterBar.value._debouncedNextTitleHandler = null;
  }
  // Cleanup fallback listeners
  if (filterBar.value?._onScroll) {
    window.removeEventListener("scroll", filterBar.value._onScroll);
    filterBar.value._onScroll = null;
  }
  if (filterBar.value?._onResize) {
    window.removeEventListener("resize", filterBar.value._onResize);
    filterBar.value._onResize = null;
  }
});
</script>

<style scoped lang="scss">
.cocktail-filter {
  --cf-bg: rgba(247, 245, 237, 0.95);
  background: var(--cf-bg);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-bottom: 1px solid #e8e8e8;
  padding: 1rem 0;
  margin: 0;
  margin-top: -1rem;
  transition: all 0.3s ease;
  z-index: 100;

  &--sticky {
    position: fixed !important;
    top: 0 !important; // No header offset
    left: 0 !important;
    right: 0 !important; /* allow full width without forcing 100vw */
    width: auto !important;
    max-width: 100vw !important; /* cap at viewport in case parent constraints apply */
    box-sizing: border-box;
    margin: 0 !important;
    border-radius: 0;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
    background: var(--cf-bg) !important; // keep same background as non-sticky
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
    z-index: 1000 !important;
  }

  &__content {
    max-width: 900px;
    margin: 0 auto;
    display: flex;
    gap: 0.5rem;
    padding: 0 12px;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
  }

  &__label {
    font-size: 0.8rem;
    color: #2c3e50;
    font-weight: 600;
    white-space: nowrap;
  }

  &__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.4rem;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

  &__tag {
    font-family: "Inter", "Roboto", Arial, sans-serif;
    padding: 0.25rem 0.6rem;
    border: 1px solid #d4d4d4;
    border-radius: 4px;
    background: white;
    font-size: 0.75rem;
    color: #2c3e50;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    flex: 0 0 auto;
    text-align: center;

    &:hover {
      border-color: #3498db;
      background: #f8f9fa;
    }
    &.is-active {
      background: #4c2a26;
      color: #fff;
      border-color: #4c2a26;
    }
  }

  &__clear {
    padding: 0.25rem 0.6rem;
    border: 1px solid #e74c3c;
    border-radius: 16px;
    background: white;
    font-size: 0.75rem;
    color: #e74c3c;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;

    &:hover {
      background: #e74c3c;
      color: #fff;
    }
  }

  &__legend {
    background: transparent; // avoid double alpha over parent bg
    border-top: 1px solid #e9ecef;
    padding-top: 12px;
    margin-top: 12px;
    max-width: 900px;
    margin-left: auto;
    margin-right: auto;
  }
  &__legendCaption {
    font-size: 0.8rem;
    color: #2c3e50; /* align with filter label */
    font-weight: 600; /* align with filter label */
    margin-bottom: 12px;
    text-align: center;
  }

  @media (max-width: 768px) {
    &__content {
      gap: 0.5rem;
      padding: 0 8px;
    }
    &__tags {
      gap: 0.3rem;
    }
    &__tag,
    &__clear {
      font-size: 0.75rem;
      padding: 0.25rem 0.6rem;
    }
  }
}

// Legend tooltip helpers (if still used anywhere else)
.legend-container {
  display: grid;
  gap: 4px;
}
.legend-row {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 0.85rem;
}
.legend-swatch {
  width: 10px;
  height: 10px;
  border-radius: 2px;
  display: inline-block;
}
</style>
