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
        class="sidebar-menu__link flex items-center sm:justify-center xl:justify-start gap-2 sm:size-12 xl:size-full p-2 rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-sm"
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
    @apply bg-blue-700 text-white;
  }

  &:focus {
    @apply bg-blue-800 text-white;
  }

  &.router-link-active,
  &.router-link-exact-active {
    @apply bg-blue-600 text-white;

    &:hover {
      @apply bg-blue-700 text-white;
    }

    &:focus {
      @apply bg-blue-800 text-white;
    }

    &:focus:not(:hover) {
      @apply bg-blue-700 text-white;
    }
  }
}
</style>
