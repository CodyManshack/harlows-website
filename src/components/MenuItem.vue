<template>
  <div :class="['menu-item', liquor ? 'menu-item-liquor' : '']">
    <div v-if="item.img" class="menu-item-image-wrapper">
      <q-img
        :src="item.img"
        :alt="item.name"
        loading="lazy"
        ratio="1"
        fit="cover"
        class="menu-item-image menu-notch"
      />
    </div>
    <div class="menu-item-content">
      <div
        class="menu-item-header"
        v-if="item.sizes || (headerSizes && headerSizes.length)"
      >
        <span class="menu-item-name">
          {{ item.name }}
          <span v-if="item.sizeLabel" class="menu-item-size-label-inline">{{
            item.sizeLabel
          }}</span>
          <span v-if="item.seasonal" class="menu-item-seasonal">{{
            t("filter.tags.seasonal")
          }}</span>
        </span>
        <div class="menu-item-sizes">
          <div
            class="menu-item-sizes-row menu-item-sizes-header"
            v-if="!hideSizes && item.sizes"
          >
            <span
              v-for="(price, size) in item.sizes"
              :key="size"
              class="menu-item-size-label"
              >{{ trSize(size, { sectionKey, subsectionKey }) }}</span
            >
          </div>
          <div
            class="menu-item-sizes-row menu-item-sizes-header"
            v-else-if="!hideSizes && headerSizes && headerSizes.length"
          >
            <span
              v-for="size in headerSizes"
              :key="'hdr-' + size"
              class="menu-item-size-label"
              >{{ trSize(size, { sectionKey, subsectionKey }) }}</span
            >
          </div>
          <div class="menu-item-sizes-row menu-item-sizes-prices">
            <span
              v-for="size in headerSizes && headerSizes.length
                ? headerSizes
                : Object.keys(item.sizes || {})"
              :key="size + '-price'"
              class="menu-item-size-price"
              >{{
                item.sizes && item.sizes[size] !== undefined
                  ? item.sizes[size]
                  : "—"
              }}</span
            >
          </div>
        </div>
      </div>
      <div class="menu-item-header" v-else>
        <span class="menu-item-name">
          {{ item.name }}
          <span v-if="item.sizeLabel" class="menu-item-size-label-inline">{{
            item.sizeLabel
          }}</span>
          <span v-if="item.dairy" class="menu-item-dairy">
            <q-icon name="mdi-cow" size="0.85rem" style="opacity: 0.75">
              <q-tooltip class="bg-black text-white"
                >Allergen: Contains Dairy</q-tooltip
              >
            </q-icon>
          </span>
          <span v-if="item.egg" class="menu-item-egg">
            <q-icon name="ion-egg" size="0.85rem" style="opacity: 0.75">
              <q-tooltip class="bg-black text-white"
                >Allergen: Contains Egg White</q-tooltip
              >
            </q-icon>
          </span>
          <span v-if="item.seasonal" class="menu-item-seasonal">{{
            t("filter.tags.seasonal")
          }}</span>
        </span>
        <span class="menu-item-price">{{ item.price }}</span>
      </div>
      <div
        v-if="item.type || item.year || item.location"
        class="menu-item-meta"
      >
        {{ [item.type, item.year, item.location].filter(Boolean).join(" · ") }}
      </div>
      <div v-if="item.description" class="menu-item-description">
        {{ item.description }}
      </div>

      <div
        v-if="item.profile"
        class="menu-item-profile"
        aria-label="Flavor profile"
      >
        <FlavorProfileDots :profile="item.profile" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed } from "vue";
import FlavorProfileDots from "./FlavorProfileDots.vue";

const props = defineProps({
  item: Object,
  liquor: Boolean,
  hideSizes: Boolean,
  headerSizes: Array,
  sectionKey: String,
  subsectionKey: String,
});

const { locale, t } = useI18n();
function trSize(key, ctx = {}) {
  const loc = (locale.value || "en").toString();
  const map = {
    en: { glass: "glass", bottle: "bottle", small: "small", large: "large" },
    es: { glass: "copa", bottle: "botella", small: "pequeña", large: "grande" },
  };
  // Spanish draft beers: small -> caña, large -> doble
  if (
    loc === "es" &&
    ctx &&
    ctx.sectionKey === "beers" &&
    (ctx.subsectionKey === "draft" ||
      String(ctx.subsectionKey || "")
        .toLowerCase()
        .includes("draft"))
  ) {
    if (key === "small") return "caña";
    if (key === "large") return "doble";
  }
  return (map[loc] && map[loc][key]) || key;
}
</script>

<style scoped lang="scss">
// Subsection (used outside of .menu-item block but within component)
.menu-subsection-sizes {
  margin-left: 1.5rem;
  display: inline-flex;
  gap: 1.5rem;
  vertical-align: middle;
}
.menu-subsection-size-label {
  font-size: 1.1rem;
  font-weight: 600;
  color: #555;
  min-width: 48px;
  text-align: center;
}

// Sizing columns for beers/wines
.menu-item-sizes {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1rem;

  &-row {
    display: flex;
    gap: 0;
  }
  &-header {
    font-size: 1.1rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 0.1rem;
  }
  &-prices {
    font-size: 1.15rem;
    font-weight: 700;
    color: #000;
  }
}
.menu-item-size-label {
  min-width: 64px;
  text-align: center;
  display: inline-block;
}
.menu-item-size-price {
  min-width: 64px;
  text-align: center;
  display: inline-block;
}

// Inline size label next to item name
.menu-item-size-label-inline {
  font-size: 0.95rem;
  font-weight: 500;
  color: #555;
  margin-left: 0.5em;
  vertical-align: middle;
}

.menu-item {
  padding: 1rem 0;
  border-bottom: 1px dotted #d4d4d4;
  margin-bottom: 0.5rem;

  &:last-child {
    border-bottom: none;
  }

  &-header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
  }

  &-name {
    font-size: 1.4rem;
    color: #000;
    font-weight: 600;
    text-transform: capitalize;
    flex: 1;
    display: inline-flex;
    align-items: baseline;
  }

  &-price {
    font-size: 1.2rem;
    color: #000;
    font-weight: 300;
    margin-left: 1rem;
  }

  &-description {
    font-size: 1.1rem;
    color: #111;
    line-height: 1.4;
    margin-top: 0.3rem;
    font-style: normal;
    font-weight: 400;
    // letter-spacing: 0.01em;
  }

  // Wine metadata line under name
  &-meta {
    font-size: 0.95rem;
    color: #555;
    margin-top: -0.25rem; // tuck closer to name for compact mobile layout
    margin-bottom: 0.15rem;
  }

  &-seasonal {
    font-size: 0.8rem;
    color: $accent;
    font-style: normal;
    font-weight: 400;
    margin-top: 0;
    margin-left: 0.5rem;
    background: rgba(243, 156, 18, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    display: inline-block;
  }

  // Flavor profile spacing
  &-profile {
    margin-top: 1rem;
  }

  // Item image (optimized for mobile)
  &-image-wrapper {
    margin: 0 0 0.6rem 0;
  }
  &-image {
    width: 100%;
    max-width: 360px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    background: #f8f8f8;
  }

  // Allergens
  &-egg,
  &-dairy {
    margin-left: 0.35em;
    display: inline-flex;
    align-items: center;
    opacity: 0.65;
    position: relative;

    i {
      color: $accent;
    }
  }

  // Smaller style for liquor items
  &-liquor {
    padding: 0.25rem 0;

    .menu-item-name {
      font-size: 1rem;
      font-weight: 600;
    }
    .menu-item-price {
      font-size: 0.95rem;
      font-weight: 600;
    }
    .menu-item-description {
      font-size: 1rem;
      line-height: 1.5;
      font-style: normal;
      font-weight: 400;
    }
  }

  // Desktop / larger screens
  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 1.5rem 0;

    &-image-wrapper {
      margin: 0;
      flex: 0 0 360px;
      max-width: 360px;
      width: 100%;
      display: block;
    }
    &-image {
      max-width: 360px;
      width: 100%;
      display: block;
    }
    &-content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &-header,
    &-meta,
    &-description,
    &-seasonal {
      text-align: left;
    }

    &-seasonal {
      align-self: flex-start;
      width: auto;
      max-width: fit-content;
    }
  }
}

// Cut-off (chamfered) corners using clip-path
.menu-notch {
  --notch: 20px;
  clip-path: polygon(
    var(--notch) 0%,
    calc(100% - var(--notch)) 0%,
    100% var(--notch),
    100% calc(100% - var(--notch)),
    calc(100% - var(--notch)) 100%,
    var(--notch) 100%,
    0% calc(100% - var(--notch)),
    0% var(--notch)
  );

  @supports not (clip-path: polygon(0 0)) {
    // Fallback: rounded corners if clip-path not supported
    border-radius: 12px;
  }
}
</style>
