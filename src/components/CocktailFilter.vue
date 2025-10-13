<template>
  <div
    class="cocktail-filter cocktail-filter--collapsed"
    ref="filterBar"
    v-show="!isSticky"
  >
    <div class="cocktail-filter__content">
      <!-- Quasar Expansion for non-sticky mode (single source of truth) -->
      <q-expansion-item
        v-model="filtersExpanded"
        dense
        hide-expand-icon
        class="cocktail-filter__expansion"
        header-class="cf-no-xpad"
        :header-style="{
          paddingLeft: '0',
          paddingRight: '0',
          '--q-expansion-padding': '0',
        }"
      >
        <template v-slot:header="props">
          <div
            class="cocktail-filter__header-row"
            :class="{
              'cocktail-filter__header-row--active': selectedTags.length > 0,
              'cocktail-filter__header-row--expanded': props.expanded,
            }"
            v-bind="props.togglerAttrs"
          >
            <div class="cocktail-filter__header-left">
              <q-icon
                name="mdi-filter-variant"
                class="cocktail-filter__header-icon"
              />
              <span class="cocktail-filter__header-text">
                {{ t("filter.label") }}
                <span v-if="selectedTags.length" class="cocktail-filter__count">
                  ({{ selectedTags.length }})
                </span>
              </span>
              <div
                v-if="selectedTags.length > 0"
                class="cocktail-filter__active-indicator"
              ></div>
            </div>
            <div class="cocktail-filter__header-right">
              <q-icon
                :name="props.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                class="cocktail-filter__expand-arrow"
              />
            </div>
          </div>
        </template>

        <div class="cocktail-filter__expanded-body">
          <div class="cocktail-filter__tags-grid">
            <q-btn
              v-for="tag in availableTags"
              :key="'inline-' + tag.id"
              :class="[
                'cocktail-filter__tag-btn',
                {
                  'cocktail-filter__tag-btn--active': selectedTags.includes(
                    tag.id
                  ),
                },
              ]"
              @click.stop="toggleTag(tag.id)"
              flat
              size="sm"
            >
              {{ tag.label }}
            </q-btn>
          </div>
        </div>
      </q-expansion-item>
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
    <div
      v-if="isSticky"
      class="cocktail-filter cocktail-filter--sticky"
      :class="{ 'cocktail-filter--collapsed': isCollapsed }"
    >
      <div class="cocktail-filter__content">
        <!-- Quasar Expansion for sticky mode (single source of truth) -->
        <q-expansion-item
          v-model="filtersExpanded"
          dense
          hide-expand-icon
          class="cocktail-filter__expansion cocktail-filter__expansion--sticky"
          header-class="cf-xpad-2rem"
          :header-style="{
            paddingLeft: '2rem',
            paddingRight: '2rem',
            '--q-expansion-padding': '0 2rem',
          }"
        >
          <template v-slot:header="props">
            <div
              class="cocktail-filter__header-row cocktail-filter__header-row--sticky"
              :class="{
                'cocktail-filter__header-row--active': selectedTags.length > 0,
                'cocktail-filter__header-row--expanded': props.expanded,
              }"
              v-bind="props.togglerAttrs"
            >
              <div class="cocktail-filter__header-left">
                <q-icon
                  name="mdi-filter-variant"
                  class="cocktail-filter__header-icon"
                />
                <span class="cocktail-filter__header-text">
                  {{ t("filter.label") }}
                  <span
                    v-if="selectedTags.length"
                    class="cocktail-filter__count"
                  >
                    ({{ selectedTags.length }})
                  </span>
                </span>
                <div
                  v-if="selectedTags.length > 0"
                  class="cocktail-filter__active-indicator"
                ></div>
              </div>
              <div class="cocktail-filter__header-right">
                <q-icon
                  :name="props.expanded ? 'mdi-chevron-up' : 'mdi-chevron-down'"
                  class="cocktail-filter__expand-arrow"
                />
              </div>
            </div>
          </template>

          <div class="cocktail-filter__expanded-body">
            <div class="cocktail-filter__tags-grid">
              <q-btn
                v-for="tag in availableTags"
                :key="'sticky-inline-' + tag.id"
                :class="[
                  'cocktail-filter__tag-btn',
                  {
                    'cocktail-filter__tag-btn--active': selectedTags.includes(
                      tag.id
                    ),
                  },
                ]"
                @click.stop="toggleTag(tag.id)"
                flat
                size="sm"
              >
                {{ tag.label }}
              </q-btn>
            </div>
          </div>
        </q-expansion-item>

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

// Filter expansion state
const filtersExpanded = ref(false);
const isCollapsed = computed(
  () => isSticky.value || selectedTags.value.length > 0
);

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
  { id: "fruity", label: t("filter.tags.fruity") },
  { id: "not2sweet", label: t("filter.tags.not2sweet") },
  { id: "egg", label: t("filter.tags.egg") },
  { id: "under10", label: t("filter.tags.under10") },
  { id: "premium", label: t("filter.tags.premium") },
  { id: "idontlikealcohol", label: t("filter.tags.idontlikealcohol") },
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
        case "fruity": {
          return cocktail.tags?.includes("fruity") ?? false;
        }
        case "not2sweet": {
          const sweet = cocktail.profile?.sweet;
          return sweet === 2 || sweet === 3;
        }
        case "idontlikealcohol": {
          return cocktail.tags?.includes("idontlikealcohol") ?? false;
        }
        case "bitter":
          return (cocktail.profile?.bitter ?? 0) >= threshold;
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

function toggleFiltersExpanded() {
  filtersExpanded.value = !filtersExpanded.value;
}

// Scroll to top function for sticky mode
// removed scroll-to-top button per design; function no longer needed

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

// No manual expansion to manage; sheet visibility is independent

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
  padding: 1.25rem 0;
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

    .cocktail-filter__legend {
      padding: 16px 2rem 8px 2rem; // maintain 2rem side padding in sticky
      margin-top: 8px; // trim extra whitespace below filter button in sticky
    }

    .cocktail-filter__expanded-content {
      margin: 0;
      border-radius: 0;
      padding: 0 2rem;
      background: var(--cf-bg);
      border-top: 1px solid rgba(76, 42, 38, 0.15);

      &--open {
        padding: 1rem 2rem;
      }
    }
  }

  &__content {
    width: 100%;
    max-width: none;
    margin: 0;
    display: flex;
    flex-direction: column; // Stack header and expanded content vertically
    gap: 0; // Remove gap since we control spacing individually
    padding: 0;

    > .q-item {
      padding: 0 !important;
    }
  }

  &__label {
    font-size: 0.95rem;
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
    padding: 0.5rem 0.8rem;
    border: 1px solid #d4d4d4;
    border-radius: 6px;
    background: white;
    font-size: 0.9rem;
    color: #2c3e50;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    flex: 0 0 auto;
    text-align: center;
    font-weight: 500;

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
    padding: 0.5rem 0.8rem;
    border: 1px solid #e74c3c;
    border-radius: 16px;
    background: white;
    font-size: 0.85rem;
    color: #e74c3c;
    cursor: pointer;
    transition: all 0.2s ease;
    white-space: nowrap;
    font-weight: 500;

    &:hover {
      background: #e74c3c;
      color: #fff;
    }
  }

  &__legend {
    background: transparent; // avoid double alpha over parent bg
    border-top: 1px solid #e9ecef;
    padding: 16px 0 8px 0;
    margin-top: 16px;
    width: 100%;
    max-width: none;
    margin-left: 0;
    margin-right: 0;
  }
  &__legendCaption {
    font-size: 0.95rem;
    color: #2c3e50; /* align with filter label */
    font-weight: 600; /* align with filter label */
    margin-bottom: 12px;
    text-align: center;
  }

  // Collapsed state styles
  &--collapsed {
    padding: 0.55rem 0; // Further reduce padding when collapsed

    // Ensure expanded content works in collapsed mode too
    .cocktail-filter__expanded-content {
      &--open {
        max-height: 500px !important;
        opacity: 1 !important;
        padding: 1rem !important;
      }
    }
  }

  // New header row styles
  &__header-row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 0.6rem 0; // horizontal padding handled by expansion header wrapper
    cursor: pointer;
    transition: all 0.2s ease;
    border-radius: 8px;
    margin-top: 0.5rem;

    &:hover {
      background: rgba(76, 42, 38, 0.05);
    }

    &--active {
      background: transparent; // no background highlight when active
      border: none; // no border change when active
    }

    &--expanded {
      border-bottom-left-radius: 0;
      border-bottom-right-radius: 0;
    }

    &--sticky {
      margin-top: 0;
      border-radius: 0;
      padding: 0.6rem 0; // horizontal padding handled by sticky header wrapper (2rem)
    }
  }

  &__header-left {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  &__header-right {
    display: flex;
    align-items: center;
    gap: 0.5rem;
  }

  &__header-icon {
    font-size: 1.1rem;
    color: #4c2a26;
  }

  &__header-text {
    font-size: 0.9rem;
    font-weight: 600;
    color: #000; // set to black as requested
  }

  &__count {
    color: #4c2a26;
    font-weight: 700;
  }

  &__active-indicator {
    width: 8px;
    height: 8px;
    background: #4c2a26;
    border-radius: 50%;
    margin-left: 0.3rem;
    animation: pulse-subtle 2s infinite;
  }

  &__expand-arrow {
    font-size: 1.2rem;
    color: #000; // black chevron to match text
    transition: transform 0.2s ease;
  }

  // Expanded content styles
  &__expanded-content {
    background: rgba(247, 245, 237, 0.8);
    border: 1px solid rgba(76, 42, 38, 0.2);
    border-top: none;
    border-radius: 0 0 8px 8px;
    padding: 0 1rem;
    margin-bottom: 0.5rem;
    overflow: hidden;
    max-height: 0;
    opacity: 0;
    transition: all 0.3s ease-in-out;
    width: 100%;

    &--open {
      max-height: 500px !important; // Large enough to accommodate all filters
      opacity: 1 !important;
      padding: 1rem !important;
    }
  }

  // Ensure non-sticky mode gets proper styles (more specific selector)
  &:not(&--sticky) {
    .cocktail-filter__expanded-content {
      &--open {
        max-height: 500px !important;
        opacity: 1 !important;
        padding: 1rem !important;
      }
    }
  }

  &__tags-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 0.6rem;
    justify-content: flex-start;
  }

  &__tag-btn {
    font-size: 0.85rem;
    padding: 0.4rem 0.8rem;
    border: 1px solid #d4d4d4;
    border-radius: 6px;
    background: white;
    color: #2c3e50;
    font-weight: 500;
    transition: all 0.2s ease;

    &:hover {
      border-color: #4c2a26;
      background: rgba(76, 42, 38, 0.05);
    }

    &--active {
      background: #4c2a26;
      color: white;
      border-color: #4c2a26;

      &:hover {
        background: #6d3b35;
        border-color: #6d3b35;
      }
    }
  }

  &__scroll-top {
    color: #4c2a26;

    &:hover {
      background: rgba(76, 42, 38, 0.1);
    }
  }
  @media (max-width: 768px) {
    &__content {
      gap: 0.6rem;
      padding: 0;
    }

    &--collapsed {
      padding: 0.5rem 0;
    }

    &__header-row {
      padding: 0.5rem 0;
      margin-top: 0.4rem;

      &--sticky {
        padding: 0.5rem 2rem;
        margin-top: 0;
      }
    }

    &__header-text {
      font-size: 0.85rem;
    }

    &__header-icon {
      font-size: 1rem;
    }

    &__expanded-content {
      padding: 0 0.8rem;

      &--open {
        padding: 0.8rem;
      }
    }

    &__tags-grid {
      gap: 0.5rem;
    }

    &__tag-btn {
      font-size: 0.8rem;
      padding: 0.35rem 0.7rem;
    }

    &--sticky {
      .cocktail-filter__expanded-content {
        padding: 0 1rem;

        &--open {
          padding: 0.8rem 1rem;
        }
      }
    }
  }
}

@keyframes pulse-subtle {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.6;
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

/* Remove default horizontal padding Quasar applies to the expansion header wrapper */
:deep(.cocktail-filter__expansion .q-expansion-item__container > .q-item),
:deep(
    .cocktail-filter__expansion--sticky .q-expansion-item__container > .q-item
  ),
:deep(.cocktail-filter__expansion .q-expansion-item__header),
:deep(.cocktail-filter__expansion--sticky .q-expansion-item__header) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Also control Quasar's header padding via its CSS variable for reliability */
:deep(.cocktail-filter__expansion .q-expansion-item__header) {
  --q-expansion-padding: 0 !important; /* non-sticky: 0 x padding */
}
:deep(
    .cocktail-filter--sticky
      .cocktail-filter__expansion
      .q-expansion-item__header
  ),
:deep(
    .cocktail-filter--sticky
      .cocktail-filter__expansion--sticky
      .q-expansion-item__header
  ) {
  --q-expansion-padding: 0 2rem !important; /* sticky: 2rem x padding */
}

/* Also zero any inner q-item sections for non-sticky to avoid residual x-padding */
:deep(.cocktail-filter__expansion .q-item__section),
:deep(.cocktail-filter__expansion .q-item__section--side),
:deep(.cocktail-filter__expansion .q-item__section--avatar) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Sticky-only: add 2rem padding to the expansion header and body */
:deep(
    .cocktail-filter--sticky
      .cocktail-filter__expansion
      .q-expansion-item__header
  ),
:deep(
    .cocktail-filter--sticky
      .cocktail-filter__expansion--sticky
      .q-expansion-item__header
  ) {
  padding-left: 2rem !important;
  padding-right: 2rem !important;
}

:deep(
    .cocktail-filter--sticky
      .q-expansion-item__container
      .q-expansion-item__content
  ) {
  padding-left: 2rem !important;
  padding-right: 2rem !important;
}

/* Header-class helpers to explicitly control header x padding */
:deep(.cf-no-xpad) {
  --q-expansion-padding: 0 !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}

:deep(.cf-xpad-2rem) {
  --q-expansion-padding: 0 2rem !important;
  padding-left: 2rem !important;
  padding-right: 2rem !important;
}

/* Strengthen non-sticky zeroing across any nested item/link wrappers */
:deep(.cocktail-filter__expansion .q-item),
:deep(.cocktail-filter__expansion .q-item .q-focus-helper),
:deep(.cocktail-filter__expansion .q-link),
:deep(.cocktail-filter__expansion .q-link .q-focus-helper) {
  padding-left: 0 !important;
  padding-right: 0 !important;
}

/* Expanded body container: 0 in non-sticky, 2rem in sticky */
.cocktail-filter__expanded-body {
  padding: 1rem;
}

.cocktail-filter--sticky .cocktail-filter__expanded-body {
  padding-left: 2rem;
  padding-right: 2rem;
}
</style>
<style lang="scss"></style>
