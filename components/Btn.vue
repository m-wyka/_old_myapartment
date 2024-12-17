<script setup lang="ts">
import type { Btn } from "~/types/btn";

const props = defineProps<Btn>();

const handleSize = computed(() => {
  switch (props.size) {
    case "x-small":
      return "px-3 py-2 text-xs";
    case "small":
      return "px-3 py-2 text-sm";
    case "large":
      return "px-5 py-3 text-sm";
    case "x-large":
      return "px-6 py-3.5 text-base";
    default:
      return "px-5 py-2.5 text-sm";
  }
});
</script>

<template>
  <button
    class="btn w-full sm:w-auto rounded font-medium text-center select-none"
    :class="[
      handleSize,
      variant ? `btn__variant--${variant}` : 'btn__variant--default',
      color ? `btn__color--${color}` : 'btn__color--default',
    ]"
    :type="type ?? 'button'"
  >
    <svg
      v-if="loading"
      class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
    >
      <circle
        class="opacity-25"
        cx="12"
        cy="12"
        r="10"
        stroke="currentColor"
        stroke-width="4"
      ></circle>
      <path
        class="opacity-75"
        fill="currentColor"
        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
      ></path>
    </svg>

    <slot />
  </button>
</template>
