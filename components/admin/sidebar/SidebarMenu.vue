<script lang="ts" setup>
const { t } = useI18n();
const menu = ref([
  {
    id: 1,
    name: t("admin.menu.buildingManagement"),
    to: "/admin/management/building",
  },
  { id: 2, name: t("admin.menu.floorManagement"), to: "/" },
  { id: 3, name: t("admin.menu.apartmentManagement"), to: "/" },
  { id: 4, name: t("admin.menu.apartmentManagement"), to: "/" },
]);
</script>

<template>
  <ul class="space-y-2">
    <li v-for="item in menu" :key="item.id">
      <NuxtLink
        :to="item.to"
        class="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800 group"
      >
        {{ item.name }}
      </NuxtLink>
    </li>
  </ul>
</template>

<style></style>
