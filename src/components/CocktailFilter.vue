<template>
  <div :class="['cocktail-filter', { sticky: isSticky }]" ref="filterBar">
    <div class="filter-content">
      <span class="filter-label">Filter by:</span>
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
        Clear All
      </button>
      <!-- Debug button -->
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from "vue";

const props = defineProps({
  cocktails: Array,
});

const emit = defineEmits(["filter-change", "sticky-change"]);

const filterBar = ref(null);
const isSticky = ref(false);
const isVisible = ref(false);
const selectedTags = ref([]);

const availableTags = [
  { id: "seasonal", label: "Seasonal" },
  { id: "egg", label: "Egg White" },
  { id: "sweet", label: "Sweet" },
  { id: "strong", label: "Strong" },
  { id: "citrus", label: "Citrus" },
  { id: "fruity", label: "Fruity" },
  { id: "bitter", label: "Bitter" },
  { id: "spicy", label: "Spicy" },
  { id: "under10", label: "Under $10" },
  { id: "premium", label: "$12+" },
];

const filteredCocktails = computed(() => {
  if (selectedTags.value.length === 0) {
    return [...props.cocktails].sort((a, b) => a.name.localeCompare(b.name));
  }

  let filtered = [...props.cocktails];

  // Apply all selected tag filters (AND logic - cocktail must match ALL selected tags)
  filtered = filtered.filter((cocktail) => {
    return selectedTags.value.every((tag) => {
      switch (tag) {
        case "seasonal":
          return cocktail.seasonal;
        case "egg":
          return cocktail.egg;
        case "sweet":
          return (
            cocktail.description?.toLowerCase().includes("sweet") ||
            cocktail.description?.toLowerCase().includes("honey") ||
            cocktail.description?.toLowerCase().includes("dessert") ||
            cocktail.name.toLowerCase().includes("sweet")
          );
        case "strong":
          return (
            cocktail.description?.toLowerCase().includes("strong") ||
            cocktail.description?.toLowerCase().includes("powerful") ||
            cocktail.description?.toLowerCase().includes("whiskey") ||
            cocktail.description?.toLowerCase().includes("bourbon") ||
            cocktail.description?.toLowerCase().includes("rum") ||
            cocktail.price >= 11
          );
        case "citrus":
          return (
            cocktail.description?.toLowerCase().includes("lemon") ||
            cocktail.description?.toLowerCase().includes("lime") ||
            cocktail.description?.toLowerCase().includes("orange") ||
            cocktail.description?.toLowerCase().includes("citrus") ||
            cocktail.description?.toLowerCase().includes("grapefruit")
          );
        case "fruity":
          return (
            cocktail.description?.toLowerCase().includes("fruit") ||
            cocktail.description?.toLowerCase().includes("berry") ||
            cocktail.description?.toLowerCase().includes("cherry") ||
            cocktail.description?.toLowerCase().includes("apple") ||
            cocktail.description?.toLowerCase().includes("pomegranate") ||
            cocktail.description?.toLowerCase().includes("raspberry")
          );
        case "bitter":
          return (
            cocktail.description?.toLowerCase().includes("bitter") ||
            cocktail.description?.toLowerCase().includes("campari") ||
            cocktail.name.toLowerCase().includes("negroni") ||
            cocktail.name.toLowerCase().includes("americano")
          );
        case "spicy":
          return (
            cocktail.description?.toLowerCase().includes("spicy") ||
            cocktail.description?.toLowerCase().includes("spice") ||
            cocktail.description?.toLowerCase().includes("chili") ||
            cocktail.description?.toLowerCase().includes("pepper") ||
            cocktail.description?.toLowerCase().includes("cinnamon")
          );
        case "under10":
          return cocktail.price < 10;
        case "premium":
          return cocktail.price >= 12;
        default:
          return true;
      }
    });
  });

  // Always sort alphabetically
  return filtered.sort((a, b) => a.name.localeCompare(b.name));
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

// Handle scroll events for sticky behavior
const handleScroll = () => {
  try {
    // Find the parent section element
    const sectionEl = filterBar.value?.closest(".menu-section");
    if (!sectionEl) {
      console.debug("No section element found");
      return;
    }
    const sectionRect = sectionEl.getBoundingClientRect();
    const sectionTitle = sectionEl.querySelector(".menu-section-title");

    if (!sectionTitle) return;

    const titleRect = sectionTitle.getBoundingClientRect();

    // Simple logic: sticky when title is above viewport and section is still visible
    const titleAboveViewport = titleRect.bottom <= 0;
    const sectionStillVisible = sectionRect.bottom > 50;

    const shouldBeSticky = titleAboveViewport && sectionStillVisible;
    const wasSticky = isSticky.value;

    // Always show filter (for now, to debug)
    isVisible.value = true;

    // Force reactivity update
    if (isSticky.value !== shouldBeSticky) {
      console.debug(
        "Changing sticky state from",
        isSticky.value,
        "to",
        shouldBeSticky
      );
      isSticky.value = shouldBeSticky;
    }

    // Debug logging
    // console.debug("Scroll debug:", {
    //   titleBottom: titleRect.bottom,
    //   sectionBottom: sectionRect.bottom,
    //   shouldBeSticky,
    //   wasSticky,
    //   isCurrentlySticky: isSticky.value,
    //   scrollY: window.scrollY,
    // });

    // Emit sticky state change
    if (wasSticky !== shouldBeSticky) {
      emit("sticky-change", shouldBeSticky);
    }
  } catch (error) {
    console.error("Error in handleScroll:", error);
  }
};

onMounted(() => {
  // Test scroll listener attachment
  const testScroll = () => {
    // console.debug("SCROLL EVENT FIRED - timestamp:", Date.now());
    handleScroll();
  };

  // Add scroll listener to both window and document
  window.addEventListener("scroll", testScroll, { passive: true });
  document.addEventListener("scroll", testScroll, { passive: true });

  // Always show filter initially
  isVisible.value = true;

  // Test the scroll handler immediately
  handleScroll();

  // Store the test function so we can remove it later
  window.testScrollFunction = testScroll;

  // Alternative: Use intersection observer
  if (filterBar.value) {
    const observer = new IntersectionObserver(
      (entries) => {
        handleScroll();
      },
      {
        threshold: [0, 0.1, 0.5, 1],
      }
    );

    // Find and observe the section title
    setTimeout(() => {
      const sectionEl = filterBar.value?.closest(".menu-section");
      const titleEl = sectionEl?.querySelector(".menu-section-title");
      if (titleEl) {
        observer.observe(titleEl);
        window.intersectionObserver = observer;
      }
    }, 100);
  }

  // Run initial scroll check
  setTimeout(() => {
    handleScroll();
    emit("filter-change", filteredCocktails.value);
  }, 500);
});

onBeforeUnmount(() => {
  if (window.testScrollFunction) {
    window.removeEventListener("scroll", window.testScrollFunction);
    document.removeEventListener("scroll", window.testScrollFunction);
    delete window.testScrollFunction;
  }
});
</script>

<style scoped>
.cocktail-filter {
  background: rgba(247, 245, 237, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid #e8e8e8;
  padding: 0.5rem 1rem;
  margin: 1rem 0;
  transition: all 0.3s ease;
  z-index: 100;
  font-family: "Poiret One", cursive;
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
  max-width: 900px;
  margin: 0 auto;
  display: flex;
  gap: 1rem;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
}

.filter-label {
  font-size: 0.9rem;
  color: #2c3e50;
  font-weight: 600;
  white-space: nowrap;
}

.filter-tags {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  align-items: center;
}

.filter-tag {
  padding: 0.3rem 0.8rem;
  border: 1px solid #d4d4d4;
  border-radius: 20px;
  background: white;
  font-family: "Poiret One", cursive;
  font-size: 0.8rem;
  color: #2c3e50;
  cursor: pointer;
  transition: all 0.2s ease;
  white-space: nowrap;
}

.filter-tag:hover {
  border-color: #3498db;
  background: #f8f9fa;
}

.filter-tag.active {
  background: #3498db;
  color: white;
  border-color: #3498db;
}

.clear-filters {
  padding: 0.3rem 0.8rem;
  border: 1px solid #e74c3c;
  border-radius: 20px;
  background: white;
  font-family: "Poiret One", cursive;
  font-size: 0.8rem;
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
  font-family: "Poiret One", cursive;
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
    padding: 0 0.5rem;
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
