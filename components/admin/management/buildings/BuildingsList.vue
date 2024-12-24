<script lang="ts" setup>
import Btn from "~/components/Btn.vue";
import Datatable from "../../Datatable.vue";

const data = [
  {
    id: 1,
    name: "Skyline Residence",
    address: "ul. Wysoka 15, 02-123 Warszawa",
    yearOfConstruction: "1990",
    numberOfFloors: 16,
  },
  {
    id: 2,
    name: "Osiedle Zielona Dolina",
    address: "ul. Leśna 8, 31-456 Kraków",
    yearOfConstruction: "2020",
    numberOfFloors: 6,
  },
  {
    id: 3,
    name: "Modern Tower Apartments",
    address: "ul. Nowoczesna 22, 50-500 Wrocław",
    yearOfConstruction: "2006",
    numberOfFloors: 10,
  },
];

const handleDeleteBuilding = async (id: number) => {
  console.log(`Delete building: ${id}`);
};
</script>

<template>
  <Datatable :data="data">
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
