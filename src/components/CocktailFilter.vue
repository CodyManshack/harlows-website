<template>
  <div :class="['cocktail-filter', { sticky: isSticky }]" ref="filterBar">
    <div class="filter-content">
      <span class="filter-label">{{ t("filter.label") }}</span>
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
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";
import { useI18n } from "vue-i18n";

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

const availableTags = computed(() => [
  { id: "seasonal", label: t("filter.tags.seasonal") },
  { id: "egg", label: t("filter.tags.egg") },
  { id: "sweet", label: t("filter.tags.sweet") },
  { id: "strong", label: t("filter.tags.strong") },
  { id: "citrus", label: t("filter.tags.citrus") },
  { id: "fruity", label: t("filter.tags.fruity") },
  { id: "bitter", label: t("filter.tags.bitter") },
  { id: "spicy", label: t("filter.tags.spicy") },
  { id: "under10", label: t("filter.tags.under10") },
  { id: "premium", label: t("filter.tags.premium") },
]);

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

  // Apply all selected tag filters (AND logic - cocktail must match ALL selected tags)
  filtered = filtered.filter((cocktail) => {
    return selectedTags.value.every((tag) => {
      const loc = (locale.value || "en").toString();
      const kw = {
        sweet: {
          en: ["sweet", "honey", "dessert"],
          es: ["dulce", "miel", "postre"],
        },
        strong: {
          en: ["strong", "powerful", "whiskey", "bourbon", "rum"],
          es: ["fuerte", "potente", "whisky", "bourbon", "ron"],
        },
        citrus: {
          en: ["lemon", "lime", "orange", "citrus", "grapefruit"],
          es: ["limón", "lima", "naranja", "cítric", "pomelo"],
        },
        fruity: {
          en: ["fruit", "berry", "cherry", "apple", "pomegranate", "raspberry"],
          es: ["fruta", "baya", "cereza", "manzana", "granada", "frambuesa"],
        },
        bitter: {
          en: ["bitter", "campari"],
          es: ["amargo", "campari"],
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
        case "sweet":
          return words("sweet").some(
            (w) =>
              descOf(cocktail).includes(w) ||
              nameOf(cocktail).toLowerCase().includes(w)
          );
        case "strong":
          return (
            words("strong").some((w) => descOf(cocktail).includes(w)) ||
            cocktail.price >= 11
          );
        case "citrus":
          return words("citrus").some((w) => descOf(cocktail).includes(w));
        case "fruity":
          return words("fruity").some((w) => descOf(cocktail).includes(w));
        case "bitter":
          return (
            words("bitter").some((w) => descOf(cocktail).includes(w)) ||
            nameOf(cocktail).toLowerCase().includes("negroni") ||
            nameOf(cocktail).toLowerCase().includes("americano")
          );
        case "spicy":
          return words("spicy").some((w) => descOf(cocktail).includes(w));
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
import { watch } from "vue";
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
    // Observer for the section title (to determine sticky behavior)
    const titleObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        console.log(
          "📍 Title observer:",
          entry.isIntersecting,
          "boundingClientRect.top:",
          entry.boundingClientRect.top
        );

        // Title has scrolled past the AppBar boundary = should be sticky, but only if filter is visible
        // We need to distinguish between title being above vs below the adjusted viewport
        const titleScrolledPast =
          !entry.isIntersecting && entry.boundingClientRect.top < 94; // Actually behind AppBar
        const shouldBeSticky = titleScrolledPast && isVisible.value;

        // Always update sticky state based on both title position AND visibility

        console.log("🔍 Title sticky logic:", {
          isIntersecting: entry.isIntersecting,
          boundingClientRectTop: entry.boundingClientRect.top,
          titleScrolledPast,
          filterVisible: isVisible.value,
          shouldBeSticky,
          currentStickyState: isSticky.value,
          needsChange: isSticky.value !== shouldBeSticky,
          explanation: entry.isIntersecting
            ? "Title visible in adjusted viewport"
            : entry.boundingClientRect.top < 94
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
      },
      {
        threshold: 0,
        rootMargin: "-94px 0px 0px 0px", // Account for AppBar height
      }
    );

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

        // If last item is visible or above viewport AND the next title is not visible, we're in the cocktails section
        const inSection =
          (entry.isIntersecting || entry.boundingClientRect.top > 0) &&
          !nextTitleVisible.value;

        console.log("🔍 Section visibility logic:", {
          isIntersecting: entry.isIntersecting,
          boundingClientRectTop: entry.boundingClientRect.top,
          inSection,
          currentVisibility: isVisible.value,
          needsChange: isVisible.value !== inSection,
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
              const titleBehindAppBar = titleRect.top < 94; // AppBar height

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
          // Consider the next title visible in the top zone (account for AppBar) when intersecting with negative top margin
          nextTitleVisible.value = entry.isIntersecting;

          if (nextTitleVisible.value) {
            // Ensure filter is not visible nor sticky when next section title arrives
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
          rootMargin: "-96px 0px 0px 0px", // Hide once next title reaches under AppBar
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
</style>
