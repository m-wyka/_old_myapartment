<script lang="ts" setup>
defineProps<{
  title?: string;
}>();

const titleClass = "text-3xl mb-8 font-bold";
</script>

<template>
  <div
    class="flex flex-col p-4 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-100 dark:bg-gray-800"
  >
    <h1 v-if="title && !$slots.title" :class="titleClass">
      {{ title }}
    </h1>

    <div v-if="$slots.title" :class="titleClass">
      <slot name="title" />
    </div>

    <slot name="content" />
  </div>
</template>
