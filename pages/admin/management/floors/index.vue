<script lang="ts" setup>
import Card from "~/components/Card.vue";
import Btn from "~/components/Btn.vue";
import { buildings } from "~/data/buildings";

definePageMeta({
  layout: "admin",
  middleware: "admin-layout",
});
</script>

<template>
  <Card container>
    <template #title>
      <h1 class="mb-8">{{ $t("admin.menu.floorManagement") }}</h1>
    </template>

    <div v-for="item in buildings" :key="item.id">
      <div
        class="floors-inner py-4 border-t border-zinc-200 dark:border-zinc-800"
      >
        <img
          :src="`/images/buildings/${item.image}`"
          :alt="item.name"
          class="w-[160px] h-[120px] object-cover rounded-xl"
        />

        <div>
          <h5 class="mb-2">
            {{ item.name }}
          </h5>

          <div class="grid gap-1">
            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              {{ item.address }}
            </p>

            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              {{ $t("admin.buildingsManagement.form.yearOfConstruction") }}:
              {{ item.yearOfConstruction }}
            </p>

            <p class="text-sm text-zinc-600 dark:text-zinc-400">
              {{ $t("admin.buildingsManagement.form.numberOfFloors") }}:
              {{ item.numberOfFloors }}
            </p>
          </div>
        </div>

        <div>
          <Btn
            size="small"
            @click="navigateTo(`/admin/management/floors/${item.id}`)"
          >
            {{ $t("admin.floorsManagement.manageFloors") }}
          </Btn>
        </div>
      </div>
    </div>
  </Card>
</template>

<style scoped>
.floors-inner {
  display: grid;
  grid-template-columns: 160px 1fr 160px;
  gap: 1rem;
}
</style>
