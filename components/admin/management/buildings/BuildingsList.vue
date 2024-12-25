<script lang="ts" setup>
import Btn from "~/components/Btn.vue";
import Datatable from "../../Datatable.vue";
import { buildings } from "~/data/buildings";

const handleDeleteBuilding = async (id: number) => {
  console.log(`Delete building: ${id}`);
};

const handleBuildingsData = computed(() => {
  return buildings.map((item) => {
    const { image, ...rest } = item;
    return rest;
  });
});
</script>

<template>
  <Datatable :data="handleBuildingsData" condensed>
    <template #actions="{ row }">
      <div class="flex justify-end gap-2">
        <Btn
          size="small"
          color="indigo"
          variant="tonal"
          @click="navigateTo(`/admin/management/buildings/edit/${row.id}`)"
        >
          {{ $t("misc.edit") }}
        </Btn>

        <Btn
          size="small"
          color="red"
          variant="tonal"
          @click="handleDeleteBuilding(row.id)"
        >
          {{ $t("misc.delete") }}
        </Btn>
      </div>
    </template>
  </Datatable>
</template>

<style></style>
