<template>
  <div :class="['menu-item', liquor ? 'menu-item--liquor' : '']">
    <div v-if="item.img" class="menu-item__imageWrap">
      <template v-if="imgIsFolder">
        <img
          :src="imgBaseSrc"
          :srcset="imgSrcset"
          sizes="(min-width: 768px) 360px, 100vw"
          :alt="displayName"
          loading="lazy"
          class="menu-item__image menu-notch"
        />
      </template>
      <template v-else>
        <q-img
          :src="item.img"
          :alt="displayName"
          loading="lazy"
          ratio="1"
          fit="cover"
          class="menu-item__image menu-notch"
        />
      </template>
    </div>
    <div class="menu-item__content">
      <div
        class="menu-item__header"
        v-if="item.sizes || (headerSizes && headerSizes.length)"
      >
        <span class="menu-item__name">
          {{ item.name }}
          <span v-if="item.sizeLabel" class="menu-item__sizeLabelInline">
            {{ item.sizeLabel }}
          </span>
          <span v-if="item.seasonal" class="menu-item__seasonal">
            {{ t("filter.tags.seasonal") }}
          </span>
        </span>
        <div class="menu-item__sizes">
          <div
            class="menu-item__sizesRow menu-item__sizesHeader"
            v-if="!hideSizes && item.sizes"
          >
            <span
              v-for="(price, size) in item.sizes"
              :key="size"
              class="menu-item__sizeLabel"
            >
              {{ trSize(size, { sectionKey, subsectionKey }) }}
            </span>
          </div>
          <div
            class="menu-item__sizesRow menu-item__sizesHeader"
            v-else-if="!hideSizes && headerSizes && headerSizes.length"
          >
            <span
              v-for="size in headerSizes"
              :key="'hdr-' + size"
              class="menu-item__sizeLabel"
            >
              {{ trSize(size, { sectionKey, subsectionKey }) }}
            </span>
          </div>
          <div class="menu-item__sizesRow menu-item__sizesPrices">
            <span
              v-for="size in headerSizes && headerSizes.length
                ? headerSizes
                : Object.keys(item.sizes || {})"
              :key="size + '-price'"
              class="menu-item__sizePrice"
            >
              {{
                item.sizes && item.sizes[size] !== undefined
                  ? item.sizes[size]
                  : "—"
              }}
            </span>
          </div>
        </div>
      </div>

      <div class="menu-item__header" v-else>
        <span class="menu-item__name">
          {{ item.name }}
          <span v-if="item.sizeLabel" class="menu-item__sizeLabelInline">
            {{ item.sizeLabel }}
          </span>
          <span
            v-if="item.dairy"
            class="menu-item__allergen menu-item__allergen--dairy"
          >
            <q-icon name="mdi-cow" size="1rem" style="opacity: 0.75">
              <q-tooltip class="bg-black text-white"
                >Allergen: Contains Dairy</q-tooltip
              >
            </q-icon>
          </span>
          <span
            v-if="item.egg"
            class="menu-item__allergen menu-item__allergen--egg"
          >
            <q-icon name="mdi-egg" size=".85rem" style="opacity: 0.75">
              <q-tooltip class="bg-black text-white"
                >Allergen: Contains Egg White</q-tooltip
              >
            </q-icon>
          </span>
          <span v-if="item.seasonal" class="menu-item__seasonal">
            {{ t("filter.tags.seasonal") }}
          </span>
        </span>
        <span class="menu-item__price">{{ item.price }}</span>
      </div>

      <div
        v-if="item.type || item.year || item.location"
        class="menu-item__meta"
      >
        {{ [item.type, item.year, item.location].filter(Boolean).join(" · ") }}
      </div>

      <div v-if="item.description" class="menu-item__desc">
        {{ item.description }}
      </div>

      <div
        v-if="item.profile"
        class="menu-item__profile"
        aria-label="Flavor profile"
      >
        <FlavorProfileDots :profile="item.profile" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { useI18n } from "vue-i18n";
import { computed, ref, onMounted, watch } from "vue";
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
const displayName = computed(() => {
  const n = (props.item && props.item.name) || "";
  if (typeof n === "string") return n;
  if (n && typeof n === "object") {
    const loc = (locale.value || "en").toString();
    return n[loc] ?? n.en ?? Object.values(n)[0] ?? "";
  }
  return "";
});

// Detect if item.img is a folder path (no file extension)
const imgIsFolder = computed(() => {
  const p = (props.item && props.item.img) || "";
  if (typeof p !== "string" || !p) return false;
  return !/\.(png|jpe?g|webp|avif|gif|svg)(\?.*)?$/i.test(p);
});

const imgSrcset = ref("");
const imgBaseSrc = ref("");

async function buildSrcsetFromFolder(folderPath) {
  if (!folderPath) return;
  const normalized = folderPath.replace(/\/$/, "");
  const base = normalized.split("/").pop();
  const widths = [400, 800, 1200, 2000];
  const candidates = widths.map((w) => ({
    width: w,
    url: `${normalized}/${base}-${w}.jpg`,
  }));

  const checks = await Promise.all(
    candidates.map(async (c) => {
      try {
        const res = await fetch(c.url, { method: "HEAD" });
        return res.ok ? c : null;
      } catch (e) {
        return null;
      }
    })
  );
  const existing = checks.filter(Boolean);
  if (existing.length) {
    imgSrcset.value = existing.map((c) => `${c.url} ${c.width}w`).join(", ");
    // Choose a reasonable default src (middle size if available)
    const preferred =
      existing.find((c) => c.width === 800) ||
      existing[Math.floor(existing.length / 2)];
    imgBaseSrc.value = preferred.url;
  } else {
    // fallback: point to folder basename 800
    imgSrcset.value = "";
    imgBaseSrc.value = `${normalized}/${base}-800.jpg`;
  }
}

onMounted(() => {
  if (imgIsFolder.value) {
    buildSrcsetFromFolder(props.item.img);
  }
});

watch(
  () => props.item && props.item.img,
  (val) => {
    if (val && imgIsFolder.value) buildSrcsetFromFolder(val);
  }
);
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
.menu-item {
  padding: 1rem 0;
  border-bottom: 1px dotted #d4d4d4;
  margin-bottom: 0.5rem;

  &:last-child {
    border-bottom: none;
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: baseline;
    margin-bottom: 0.5rem;
  }

  &__name {
    font-size: 1.4rem;
    color: #000;
    font-weight: 600;
    text-transform: capitalize;
    flex: 1;
    display: inline-flex;
    align-items: baseline;
  }

  &__price {
    font-size: 1.2rem;
    color: #000;
    font-weight: 300;
    margin-left: 1rem;
  }

  &__sizeLabelInline {
    font-size: 0.95rem;
    font-weight: 500;
    color: #555;
    margin-left: 0.5em;
    vertical-align: middle;
  }

  &__meta {
    font-size: 0.95rem;
    color: #555;
    margin-top: -0.25rem;
    margin-bottom: 0.15rem;
  }

  &__seasonal {
    font-size: 0.8rem;
    color: $accent;
    font-style: normal;
    font-weight: 400;
    margin-top: 0;
    margin-left: 0.5rem;
    background: rgba($accent, 0.1);
    padding: 0.2rem 0.5rem;
    border-radius: 4px;
    display: inline-block;
  }

  &__desc {
    font-size: 1.1rem;
    color: #111;
    line-height: 1.4;
    margin-top: 0.3rem;
    font-style: normal;
    font-weight: 400;
  }

  &__profile {
    margin-top: 1rem;
  }

  &__imageWrap {
    margin: 0 0 0.6rem 0;
  }

  &__image {
    width: 100%;
    max-width: 360px;
    overflow: hidden;
    box-shadow: 0 2px 6px rgba(0, 0, 0, 0.08);
    background: #f8f8f8;
  }

  &__allergen {
    margin-left: 0.35em;
    display: inline-flex;
    align-items: center;
    opacity: 0.65;
    position: relative;

    &--egg i,
    &--dairy i {
      color: $accent;
    }
  }

  &--liquor {
    padding: 0.25rem 0;

    .menu-item__name {
      font-size: 1rem;
      font-weight: 600;
    }
    .menu-item__price {
      font-size: 0.95rem;
      font-weight: 600;
    }
    .menu-item__desc {
      font-size: 1rem;
      line-height: 1.5;
      font-weight: 400;
    }
  }

  @media (min-width: 768px) {
    display: flex;
    align-items: flex-start;
    gap: 2rem;
    padding: 1.5rem 0;

    &__imageWrap {
      margin: 0;
      flex: 0 0 360px;
      max-width: 360px;
      width: 100%;
      display: block;
    }
    &__image {
      max-width: 360px;
      width: 100%;
      display: block;
    }

    &__content {
      flex: 1;
      min-width: 0;
      display: flex;
      flex-direction: column;
      justify-content: center;
    }

    &__header,
    &__meta,
    &__desc,
    &__seasonal {
      text-align: left;
    }

    &__seasonal {
      align-self: flex-start;
      width: auto;
      max-width: fit-content;
    }
  }
}

// Sizes block (kept separate to avoid over-deep nesting)
.menu-item__sizes {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  margin-left: 1rem;

  &Row {
    display: flex;
    gap: 0;
  }
  &Header {
    font-size: 1.1rem;
    font-weight: 600;
    color: #444;
    margin-bottom: 0.1rem;
  }
  &Prices {
    font-size: 1.15rem;
    font-weight: 700;
    color: #000;
  }
}

.menu-item__sizeLabel {
  min-width: 64px;
  text-align: center;
  display: inline-block;
}
.menu-item__sizePrice {
  min-width: 64px;
  text-align: center;
  display: inline-block;
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
    border-radius: 12px;
  }
}
</style>
