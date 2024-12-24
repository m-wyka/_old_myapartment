<script lang="ts" setup>
import type { MenuItem } from "~/types/menu";

defineProps<{
  data: MenuItem[];
}>();
</script>

<template>
  <ul class="space-y-2 mt-5">
    <li
      v-for="item in data"
      :key="item.id"
      class="flex flex-wrap justify-start sm:justify-center xl:justify-start w-full"
    >
      <NuxtLink
        :to="item.to ?? undefined"
        class="sidebar-menu__link flex items-center sm:justify-center xl:justify-start gap-2 w-full sm:size-12 xl:size-full p-2 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-700 text-sm"
        :class="{ 'cursor-pointer': item.action && !item.to }"
        @click.native="item.action && !item.to ? item.action() : undefined"
      >
        <Icon :name="item.icon" class="block size-6" />
        <div class="sm:hidden xl:block">{{ item.name }}</div>
      </NuxtLink>
    </li>
  </ul>
</template>

<style lang="scss" scoped>
.sidebar-menu__link {
  @apply text-gray-900 dark:text-white;

  &:hover {
    @apply bg-white/60 dark:bg-white/10 dark:text-white;
  }

  &:focus {
    @apply bg-white/80 dark:bg-white/15 dark:text-white;
  }

  &.router-link-active,
  &.router-link-exact-active {
    @apply bg-white/70 dark:bg-white/10 dark:text-white;

    &:hover {
      @apply bg-white/80 dark:bg-white/10 dark:text-white;
    }

    &:focus {
      @apply bg-white/90 dark:bg-white/15 dark:text-white;
    }

    &:focus:not(:hover) {
      @apply bg-white dark:bg-white/10 dark:text-white;
    }
  }
}
</style>
