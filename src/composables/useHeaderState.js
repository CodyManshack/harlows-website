import { ref, readonly } from "vue";

// Global reactive state for app header visibility
const isHeaderHidden = ref(false);

export function useHeaderState() {
  const setHeaderHidden = (hidden) => {
    isHeaderHidden.value = hidden;
  };

  return {
    isHeaderHidden: readonly(isHeaderHidden),
    setHeaderHidden,
  };
}
