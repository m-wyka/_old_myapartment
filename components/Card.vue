<script lang="ts" setup>
defineProps<{
  title?: string;
  container?: boolean;
}>();
</script>

<template>
  <div
    class="card relative rounded-xl p-4 bg-white dark:bg-zinc-900 forced-colors:outline"
  >
    <div :class="{ 'container mx-auto': container }">
      <h3 v-if="title && !$slots.title" class="mb-8">
        {{ title }}
      </h3>

      <div v-if="$slots.title">
        <slot name="title" />
      </div>

      <slot />
    </div>
  </div>
</template>

<style scoped>
.card {
  --tw-bg-opacity: 1;
  --tw-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
  --tw-shadow-colored: 0px 0px 0px 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.card:is(.dark *) {
  --tw-bg-opacity: 1;
  --tw-shadow: 0px 0px 0px 1px rgba(255, 255, 255, 0.1);
  --tw-shadow-colored: 0px 0px 0px 1px var(--tw-shadow-color);
  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000),
    var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}
</style>
