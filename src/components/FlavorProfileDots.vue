<template>
  <div
    class="flavor-profile-dots"
    :class="{ 'flavor-profile-dots--legend': legend }"
  >
    <div class="flavor-profile-dots__row">
      <div
        v-for="cat in profileCategories"
        :key="cat.key"
        class="flavor-profile-dots__col"
        :class="{ 'flavor-profile-dots__col--active': isActive(cat.key) }"
        role="button"
        tabindex="0"
        :aria-pressed="isActive(cat.key)"
        @click="$emit('pick', cat.key)"
        @keydown.enter.stop.prevent="$emit('pick', cat.key)"
      >
        <span v-if="showLabels" class="flavor-profile-dots__label">{{
          cat.label
        }}</span>
        <div class="flavor-profile-dots__dots" :class="'cat-color-' + cat.key">
          <i
            v-for="n in 5"
            :key="n"
            :class="[
              'flavor-profile-dots__dot',
              {
                'is-filled': isActive(cat.key) ? n <= 5 : n <= (cat.value || 0),
              },
            ]"
          ></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
import { useI18n } from "vue-i18n";

const props = defineProps({
  profile: {
    type: Object,
    default: () => ({}),
  },
  showLabels: {
    type: Boolean,
    default: false,
  },
  // When true, render with a subtle, muted style to indicate this is a legend,
  // not the actual values for a specific drink.
  legend: {
    type: Boolean,
    default: false,
  },
  activeKey: {
    type: String,
    default: null,
  },
  activeKeys: {
    type: Array,
    default: () => [],
  },
});

defineEmits(["pick"]);

function isActive(key) {
  if (Array.isArray(props.activeKeys) && props.activeKeys.length) {
    return props.activeKeys.includes(key);
  }
  return props.activeKey === key;
}

const { t } = useI18n();

const profileCategories = computed(() => [
  {
    key: "boozy",
    label: t("filter.tags.boozy"),
    value: props.profile.boozy || 0,
  },
  {
    key: "sweet",
    label: t("filter.tags.sweet"),
    value: props.profile.sweet || 0,
  },
  {
    key: "tart",
    label: t("filter.tags.tart"),
    value: props.profile.tart || 0,
  },
  {
    key: "citrus",
    label: t("filter.tags.citrus"),
    value: props.profile.citrus || 0,
  },
  {
    key: "bitter",
    label: t("filter.tags.bitter"),
    value: props.profile.bitter || 0,
  },
]);
</script>

<style lang="scss" scoped>
.flavor-profile-dots {
  width: 100%;

  &__row {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    width: 100%;
  }

  &__col {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 1;
    cursor: pointer;
    user-select: none;

    &--active {
      .flavor-profile-dots__label {
        text-decoration: underline;
        font-weight: 600;
        color: #222;
      }
      .flavor-profile-dots__dots {
        border: 1px solid currentColor;
        border-radius: 999px;
        padding: 2px 6px;
        background: rgba(0, 0, 0, 0.03);
      }
    }
  }

  &__label {
    font-size: 0.65rem;
    font-weight: 500;
    color: #555;
    text-align: center;
    line-height: 1;
    margin-bottom: 4px;
  }

  &__dots {
    display: flex;
    gap: 3px;
    align-items: center;
    justify-content: center;
  }
  &__dot {
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #e0e0e0;
    display: inline-block;

    &.is-filled {
      background: currentColor;
    }
  }

  // Legend mode: visually subtle/outlined, same size/width
  &--legend {
    .flavor-profile-dots__dot {
      background: transparent;
      border: 1px solid currentColor;
      opacity: 0.55;
    }
    .flavor-profile-dots__dot.is-filled {
      background: currentColor;
      opacity: 0.85;
    }
    .flavor-profile-dots__col--active .flavor-profile-dots__dots {
      border-width: 1px;
      background: rgba(0, 0, 0, 0.02);
    }
    .flavor-profile-dots__label {
      color: #666;
      font-weight: 500;
    }
  }

  // Color classes
  .cat-color-boozy {
    color: $h-boozy;
  }
  .cat-color-bitter {
    color: $h-bitter;
  }
  .cat-color-sweet {
    color: $h-sweet;
  }
  .cat-color-citrus {
    color: $h-citrus;
  }
  .cat-color-tart {
    color: $h-tart;
  }
}
</style>
