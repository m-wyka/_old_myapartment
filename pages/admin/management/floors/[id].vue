<script lang="ts" setup>
import Card from "~/components/Card.vue";
import Btn from "~/components/Btn.vue";
import Modal from "~/components/Modal.vue";
import Datatable from "~/components/admin/Datatable.vue";

definePageMeta({
  layout: "admin",
  middleware: "admin-layout",
});

const route = useRoute();
const {
  params: { id },
} = route;

const modal = ref(false);

const data = ref([
  {
    id: 1,
    floor: "0",
    name: "Parter",
    numberOfApartments: "8",
    surface: 400,
    purpose: "Mieszkalne",
    elevatorAvailability: true,
  },
  {
    id: 2,
    floor: "1",
    name: "-",
    numberOfApartments: "12",
    surface: 500,
    purpose: "Mieszkalne",
    elevatorAvailability: true,
  },
  {
    id: 3,
    floor: "2",
    name: "-",
    numberOfApartments: "12",
    surface: 500,
    purpose: "Mieszkalne",
    elevatorAvailability: true,
  },
]);

const data2 = ref([
  { id: 1, name: "Lorem", value: "aaa" },
  { id: 2, name: "Ipsum", value: "bbb" },
  { id: 3, name: "Dolor", value: "ccc" },
]);
</script>

<template>
  <Card container>
    <template #title>
      <h1 class="mb-8">{{ $t("admin.menu.floorManagement") }}</h1>
    </template>

    <div class="grid gap-4">
      <div>
        <Btn @click="modal = true"> Dodaj piętro </Btn>
      </div>

      <Datatable :data="data" condensed>
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

            <Btn size="small" color="red" variant="tonal">
              {{ $t("misc.delete") }}
            </Btn>
          </div>
        </template>
      </Datatable>

      <Modal
        v-model="modal"
        @update:model-value="(value) => (modal = value)"
        :title="$t('admin.floorsManagement.addingFloor')"
      >
        <div>Lorem</div>
      </Modal>
    </div>
  </Card>
</template>

<style scoped></style>
