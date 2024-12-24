<script lang="ts" setup>
import Card from "~/components/Card.vue";
import Btn from "~/components/Btn.vue";
import BuildingsList from "~/components/admin/management/buildings/BuildingsList.vue";

definePageMeta({
  layout: "admin",
  middleware: "admin-layout",
});
</script>

<template>
  <Card container>
    <template #title>
      <h1 class="mb-8">{{ $t("admin.menu.buildingsManagement") }}</h1>
    </template>

    <div class="grid gap-4">
      <div>
        <Btn @click="navigateTo('/admin/management/buildings/add')">
          {{ $t("admin.buildingsManagement.addBuilding") }}
        </Btn>
      </div>

      <BuildingsList />
    </div>
  </Card>
</template>

<style scoped></style>
