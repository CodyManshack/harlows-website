<template>
  <div
    :class="[
      'cocktail-filter',
      { sticky: isSticky, 'header-hidden': isHeaderHidden },
    ]"
    ref="filterBar"
  >
    <div class="filter-content">
      <span class="filter-label">{{ t("filter.label") }}</span>
      <q-icon
        name="help_outline"
        size="18px"
        class="legend-icon q-ml-sm text-grey-7"
        aria-label="Legend"
      >
        <q-tooltip class="bg-black text-white">
          <div class="legend-container">
            <div class="legend-row">
              <span class="legend-swatch" style="background: #6a1b9a"></span>
              {{ t("filter.tags.boozy") }}
            </div>
            <div class="legend-row">
              <span class="legend-swatch" style="background: #d32f2f"></span>
              {{ t("filter.tags.bitter") }}
            </div>
            <div class="legend-row">
              <span class="legend-swatch" style="background: #f39c12"></span>
              {{ t("filter.tags.sweet") }}
            </div>
            <div class="legend-row">
              <span class="legend-swatch" style="background: #43a047"></span>
              {{ t("filter.tags.citrus") }}
            </div>
            <div class="legend-row">
              <span class="legend-swatch" style="background: #1976d2"></span>
              {{ t("filter.tags.tart") }}
            </div>
          </div>
        </q-tooltip>
      </q-icon>
      <div class="filter-tags">
        <button
          v-for="tag in availableTags"
          :key="tag.id"
          :class="['filter-tag', { active: selectedTags.includes(tag.id) }]"
          @click="toggleTag(tag.id)"
        >
          {{ tag.label }}
        </button>
      </div>
      <button
        v-if="selectedTags.length > 0"
        class="clear-filters"
        @click="clearAllFilters"
      >
        {{ t("filter.clear") }}
      </button>
      <!-- Debug button -->
    </div>
    <!-- Flavor Profile Legend -->
    <div class="flavor-profile-legend">
      <FlavorProfileDots :profile="sampleProfile" :show-labels="true" />
    </div>
  </div>
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
import FlavorProfileDots from "./FlavorProfileDots.vue";
import { useHeaderState } from "src/composables/useHeaderState.js";

const props = defineProps({
  cocktails: Array,
});

const emit = defineEmits(["filter-change", "sticky-change"]);

const filterBar = ref(null);
const isSticky = ref(false);
const isVisible = ref(false);
const nextTitleVisible = ref(false);
const selectedTags = ref([]);
const parentSection = ref(null);

const { t, locale } = useI18n();
const { isHeaderHidden } = useHeaderState();

const availableTags = computed(() => [
  { id: "seasonal", label: t("filter.tags.seasonal") },
  { id: "egg", label: t("filter.tags.egg") },
  { id: "boozy", label: t("filter.tags.boozy") },
  { id: "sweet", label: t("filter.tags.sweet") },
  { id: "strong", label: t("filter.tags.strong") },
  { id: "citrus", label: t("filter.tags.citrus") },
  { id: "fruity", label: t("filter.tags.fruity") },
  { id: "bitter", label: t("filter.tags.bitter") },
  { id: "spicy", label: t("filter.tags.spicy") },
  { id: "tart", label: t("filter.tags.tart") },
  { id: "under10", label: t("filter.tags.under10") },
  { id: "premium", label: t("filter.tags.premium") },
]);

const sampleProfile = {
  boozy: 3,
  bitter: 2,
  sweet: 4,
  citrus: 2,
  tart: 1,
};

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
  const cocktailItems = parentSection.value.querySelectorAll(".menu-item");
  const lastCocktailItem = cocktailItems[cocktailItems.length - 1];
  // Attempt to find the next section's title for early hide behavior
  const nextSectionTitle =
    parentSection.value.nextElementSibling?.querySelector?.(
      ".menu-section-title"
    );

  console.log("Section title found:", !!sectionTitle);
  console.log("Last cocktail item found:", !!lastCocktailItem);

  if (sectionTitle && lastCocktailItem) {
    // Create dynamic observer options based on header visibility
    const createObserverOptions = () => ({
      threshold: 0,
      rootMargin: isHeaderHidden.value
        ? "0px 0px 0px 0px"
        : "-94px 0px 0px 0px",
    });

    // Observer for the section title (to determine sticky behavior)
    let titleObserver = new IntersectionObserver((entries) => {
      const entry = entries[0];
      console.log(
        "📍 Title observer (original):",
        entry.isIntersecting,
        "boundingClientRect.top:",
        entry.boundingClientRect.top
      );

      // Title has scrolled past the AppBar boundary = should be sticky, but only if filter is visible
      // We need to distinguish between title being above vs below the adjusted viewport
      const appBarHeight = isHeaderHidden.value ? 0 : 94;
      const titleScrolledPast =
        !entry.isIntersecting && entry.boundingClientRect.top < appBarHeight;
      const shouldBeSticky = titleScrolledPast; // Sticky should depend only on title position, not visibility      // Always update sticky state based on both title position AND visibility

      console.log("🔍 Title sticky logic (original):", {
        isIntersecting: entry.isIntersecting,
        boundingClientRectTop: entry.boundingClientRect.top,
        appBarHeight,
        titleScrolledPast,
        shouldBeSticky,
        currentStickyState: isSticky.value,
        needsChange: isSticky.value !== shouldBeSticky,
        explanation: entry.isIntersecting
          ? "Title visible in adjusted viewport"
          : entry.boundingClientRect.top < appBarHeight
          ? "Title behind AppBar - should be sticky"
          : "Title below viewport - should NOT be sticky",
      });
      if (isSticky.value !== shouldBeSticky) {
        console.log(
          "🔄 Sticky state changing:",
          isSticky.value,
          "->",
          shouldBeSticky
        );
        isSticky.value = shouldBeSticky;
        emit("sticky-change", shouldBeSticky);
      }
    }, createObserverOptions());

    // Observer for the last cocktail item (to determine when we've left the section)
    const sectionEndObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        console.log(
          "📍 Section end observer:",
          entry.isIntersecting,
          "boundingClientRect.top:",
          entry.boundingClientRect.top
        );

        // We're in the cocktails section if:
        // 1. We haven't reached the next section yet
        // 2. AND we're not above the current section (check via section title position)
        const sectionTitle = parentSection.value?.querySelector?.(
          ".menu-section-title"
        );
        const appBarHeight = isHeaderHidden.value ? 0 : 94;
        const sectionTitleRect = sectionTitle?.getBoundingClientRect();
        const aboveSection =
          sectionTitle && sectionTitleRect.bottom < appBarHeight;
        const inSection = !nextTitleVisible.value && !aboveSection;

        console.log("🔍 Section visibility logic:", {
          lastItemIntersecting: entry.isIntersecting,
          lastItemTop: entry.boundingClientRect.top,
          lastItemBottom: entry.boundingClientRect.bottom,
          nextTitleVisible: nextTitleVisible.value,
          sectionTitleBottom: sectionTitleRect?.bottom,
          appBarHeight,
          aboveSection,
          inSection,
          currentVisibility: isVisible.value,
          needsChange: isVisible.value !== inSection,
          headerHidden: isHeaderHidden.value,
          windowHeight: window.innerHeight,
          scrollY: window.scrollY,
        });

        if (isVisible.value !== inSection) {
          console.log(
            "🔄 Visibility changing:",
            isVisible.value,
            "->",
            inSection
          );
          isVisible.value = inSection;

          // If filter becomes invisible, it should also stop being sticky
          if (!inSection && isSticky.value) {
            console.log(
              "🔄 Sticky state changing (section left):",
              isSticky.value,
              "->",
              false
            );
            isSticky.value = false;
            emit("sticky-change", false);
          }
          // If filter becomes visible, check if title is already scrolled past
          else if (inSection && !isSticky.value) {
            // Check if title is currently behind the AppBar
            const sectionTitle = parentSection.value.querySelector(
              ".menu-section-title"
            );
            if (sectionTitle) {
              const titleRect = sectionTitle.getBoundingClientRect();
              const appBarHeight = isHeaderHidden.value ? 0 : 94;
              const titleBehindAppBar = titleRect.top < appBarHeight;

              if (titleBehindAppBar) {
                console.log(
                  "🔄 Sticky state changing (re-entering section with title scrolled past):",
                  isSticky.value,
                  "->",
                  true
                );
                isSticky.value = true;
                emit("sticky-change", true);
              }
            }
          }
        }
      },
      {
        threshold: 0,
        // Tighten margins so we leave the section earlier (no generous buffer)
        rootMargin: "0px 0px 0px 0px",
      }
    );

    // Optional: Observer for the NEXT section title — when it reaches the top zone, hide filter early
    let nextTitleObserver = null;
    if (nextSectionTitle) {
      nextTitleObserver = new IntersectionObserver(
        (entries) => {
          const entry = entries[0];
          console.log("🔍 Next title observer:", {
            isIntersecting: entry.isIntersecting,
            boundingClientRectTop: entry.boundingClientRect.top,
            boundingClientRectBottom: entry.boundingClientRect.bottom,
            currentNextTitleVisible: nextTitleVisible.value,
            headerHidden: isHeaderHidden.value,
            rootMargin: isHeaderHidden.value
              ? "0px 0px 0px 0px"
              : "-96px 0px 0px 0px",
          });

          // Consider the next title visible in the top zone (account for AppBar) when intersecting with negative top margin
          nextTitleVisible.value = entry.isIntersecting;

          if (nextTitleVisible.value) {
            console.log("🚫 Next section reached - hiding filter");
            // Ensure filter is not visible nor sticky when next section title arrives
            if (isVisible.value || isSticky.value) {
              isVisible.value = false;
              if (isSticky.value) {
                isSticky.value = false;
                emit("sticky-change", false);
              }
            }
          } else {
            console.log(
              "✅ Next section no longer visible - may show filter again"
            );
          }
        },
        {
          threshold: 0,
          rootMargin: isHeaderHidden.value
            ? "0px 0px 0px 0px"
            : "-96px 0px 0px 0px",
        }
      );
    }

    // Start observing
    titleObserver.observe(sectionTitle);
    sectionEndObserver.observe(lastCocktailItem);
    if (nextSectionTitle && nextTitleObserver) {
      nextTitleObserver.observe(nextSectionTitle);
      filterBar.value._nextTitleObserver = nextTitleObserver;
    }

    // Store observers for cleanup
    filterBar.value._titleObserver = titleObserver;
    filterBar.value._sectionEndObserver = sectionEndObserver;

    console.log("✅ Intersection observers set up successfully");
  }

  // Initial filter emission
  emit("filter-change", filteredCocktails.value);
});

// Watch for header visibility changes and recreate observers with debouncing
let recreateTimeout = null;
watch(isHeaderHidden, (newValue, oldValue) => {
  // Skip if this is the initial watch trigger or no actual change
  if (oldValue === undefined || newValue === oldValue) return;

  console.log("🔄 Header visibility changed, scheduling observer recreation");

  // Clear any pending recreation
  if (recreateTimeout) {
    clearTimeout(recreateTimeout);
  }

  // Debounce the recreation to avoid rapid-fire changes
  recreateTimeout = setTimeout(() => {
    console.log("🔄 Actually recreating observers now");

    // Clean up existing observers
    if (filterBar.value?._titleObserver) {
      filterBar.value._titleObserver.disconnect();
    }
    if (filterBar.value?._sectionEndObserver) {
      filterBar.value._sectionEndObserver.disconnect();
    }
    if (filterBar.value?._nextTitleObserver) {
      filterBar.value._nextTitleObserver.disconnect();
    }

    // Wait for next tick to ensure DOM has updated, then recreate observers
    nextTick(() => {
      const parentSection = filterBar.value?.closest?.(".menu-section");
      if (!parentSection) return;

      const sectionTitle = parentSection.querySelector(".menu-section-title");
      const cocktailItems = parentSection.querySelectorAll(".menu-item");
      const lastCocktailItem = cocktailItems[cocktailItems.length - 1];
      const nextSectionTitle =
        parentSection.nextElementSibling?.querySelector?.(
          ".menu-section-title"
        );

      if (sectionTitle && lastCocktailItem) {
        // Recreate observers with updated options
        const createObserverOptions = () => ({
          threshold: 0,
          rootMargin: isHeaderHidden.value
            ? "0px 0px 0px 0px"
            : "-94px 0px 0px 0px",
        });

        const titleObserver = new IntersectionObserver((entries) => {
          const entry = entries[0];
          const appBarHeight = isHeaderHidden.value ? 0 : 94;
          const titleScrolledPast =
            !entry.isIntersecting &&
            entry.boundingClientRect.top < appBarHeight;
          const shouldBeSticky = titleScrolledPast; // Sticky should depend only on title position, not visibility

          console.log("🔍 Title observer (recreated):", {
            isIntersecting: entry.isIntersecting,
            boundingClientRectTop: entry.boundingClientRect.top,
            appBarHeight,
            titleScrolledPast,
            isVisible: isVisible.value,
            shouldBeSticky,
            currentSticky: isSticky.value,
            needsChange: isSticky.value !== shouldBeSticky,
          });

          if (isSticky.value !== shouldBeSticky) {
            console.log(
              "🔄 Sticky state changing (recreated observer):",
              isSticky.value,
              "->",
              shouldBeSticky
            );
            isSticky.value = shouldBeSticky;
            emit("sticky-change", shouldBeSticky);
          }
        }, createObserverOptions());

        const sectionEndObserver = new IntersectionObserver(
          (entries) => {
            const entry = entries[0];
            const sectionTitle = parentSection.querySelector?.(
              ".menu-section-title"
            );
            const appBarHeight = isHeaderHidden.value ? 0 : 94;
            const aboveSection =
              sectionTitle &&
              sectionTitle.getBoundingClientRect().bottom < appBarHeight;
            const inSection = !nextTitleVisible.value && !aboveSection;

            if (isVisible.value !== inSection) {
              isVisible.value = inSection;
              if (!inSection && isSticky.value) {
                isSticky.value = false;
                emit("sticky-change", false);
              }
            }
          },
          { threshold: 0, rootMargin: "0px 0px 0px 0px" }
        );

        // Recreate next title observer if it exists
        let nextTitleObserver = null;
        if (nextSectionTitle) {
          nextTitleObserver = new IntersectionObserver(
            (entries) => {
              const entry = entries[0];
              nextTitleVisible.value = entry.isIntersecting;

              if (nextTitleVisible.value) {
                if (isVisible.value || isSticky.value) {
                  isVisible.value = false;
                  if (isSticky.value) {
                    isSticky.value = false;
                    emit("sticky-change", false);
                  }
                }
              }
            },
            {
              threshold: 0,
              rootMargin: isHeaderHidden.value
                ? "0px 0px 0px 0px"
                : "-96px 0px 0px 0px",
            }
          );
        }

        // Start observing
        titleObserver.observe(sectionTitle);
        sectionEndObserver.observe(lastCocktailItem);
        if (nextSectionTitle && nextTitleObserver) {
          nextTitleObserver.observe(nextSectionTitle);
          filterBar.value._nextTitleObserver = nextTitleObserver;
        }

        // Store observers for cleanup
        filterBar.value._titleObserver = titleObserver;
        filterBar.value._sectionEndObserver = sectionEndObserver;
      }
    });
  }, 100); // 100ms debounce delay
});

onBeforeUnmount(() => {
  console.log("🧹 Cleaning up intersection observers");

  // Clear any pending recreation timeout
  if (recreateTimeout) {
    clearTimeout(recreateTimeout);
  }

  if (filterBar.value?._titleObserver) {
    filterBar.value._titleObserver.disconnect();
  }

  if (filterBar.value?._sectionEndObserver) {
    filterBar.value._sectionEndObserver.disconnect();
  }
  if (filterBar.value?._nextTitleObserver) {
    filterBar.value._nextTitleObserver.disconnect();
  }
});
</script>

<style scoped>
.cocktail-filter {
  background: rgba(247, 245, 237, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e8e8e8;
  padding: 1rem 0;
  margin: 0;
  margin-top: -1rem;
  transition: all 0.3s ease;
  z-index: 100;
}

.cocktail-filter.sticky {
  position: fixed !important;
  top: 96px !important; /* Account for AppBar height (64px toolbar + 30px hours bar) */
  left: 0 !important;
  right: 0 !important;
  margin: 0 !important;
  border-radius: 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.3);
  background: rgba(247, 245, 237, 0.98) !important;
  z-index: 1000 !important;
}

.cocktail-filter.sticky.header-hidden {
  top: 0 !important; /* When header is hidden, move filter to top */
}

.filter-content {
  max-width: 900px; /* keep same as page content */
  margin: 0 auto; /* center within full-width container */
  display: flex;
  gap: 0.5rem;
  padding: 0 12px; /* slight side padding */
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.8rem;
  color: #2c3e50;
  font-weight: 600;
  white-space: nowrap;
}

.filter-tags {
  display: flex; /* dynamic best-fit per content */
  flex-wrap: wrap;
  gap: 0.4rem;
  align-items: center;
  justify-content: center; /* center rows instead of bunching left */
  width: 100%;
}

.filter-tag {
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
  flex: 0 0 auto; /* size to content */
  text-align: center;
}

.filter-tag:hover {
  border-color: #3498db;
  background: #f8f9fa;
}

.filter-tag.active {
  background: #4c2a26;
  color: white;
  border-color: #4c2a26;
}

.clear-filters {
  padding: 0.25rem 0.6rem;
  border: 1px solid #e74c3c;
  border-radius: 16px;
  background: white;
  font-size: 0.75rem;
  color: #e74c3c;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.clear-filters:hover {
  background: #e74c3c;
  color: white;
}

.debug-button {
  padding: 0.3rem 0.8rem;
  border: 1px solid #9b59b6;
  border-radius: 20px;
  background: white;
  font-size: 0.8rem;
  color: #9b59b6;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.debug-button:hover {
  background: #9b59b6;
  color: white;
}

@media (max-width: 768px) {
  .filter-content {
    gap: 0.5rem;
    padding: 0 8px;
  }

  .filter-tags {
    gap: 0.3rem;
  }

  .filter-tag,
  .clear-filters {
    font-size: 0.75rem;
    padding: 0.25rem 0.6rem;
  }
}

/* Legend tooltip styles */
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

/* Flavor Profile Legend */
.flavor-profile-legend {
  background: rgba(247, 245, 237, 0.95);
  border-top: 1px solid #e9ecef;
  padding: 12px 12px 0 12px;
  margin-top: 12px;
  max-width: 900px;
  margin-left: auto;
  margin-right: auto;
}
</style>
