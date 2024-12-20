<script lang="ts" setup>
import Card from "~/components/Card.vue";
import AdditionalInformationForm from "~/components/admin/forms/buildingManagement/AdditionalInformationForm.vue";
import AdministrativeInformationForm from "~/components/admin/forms/buildingManagement/AdministrativeInformationForm.vue";
import BasicInformationForm from "~/components/admin/forms/buildingManagement/BasicInformationForm.vue";
import DocumentationAndFilesForm from "~/components/admin/forms/buildingManagement/DocumentationAndFilesForm.vue";
import TechnicalInformationForm from "~/components/admin/forms/buildingManagement/TechnicalInformationForm.vue";
import UsageInformationForm from "~/components/admin/forms/buildingManagement/UsageInformationForm.vue";

definePageMeta({
  layout: "admin",
  middleware: "admin-layout",
});
</script>

<template>
  <Card :title="$t('admin.menu.buildingManagement')">
    <template #content>
      <div class="building-management-wrapper">
        <BasicInformationForm />
        <div
          class="border-t lg:border-l border-gray-300 dark:border-gray-700"
        ></div>
        <TechnicalInformationForm />
        <div
          class="border-t lg:border-l border-gray-300 dark:border-gray-700 lg:hidden"
        ></div>
        <AdministrativeInformationForm />
        <div
          class="border-t lg:border-l border-gray-300 dark:border-gray-700"
        ></div>
        <UsageInformationForm />
        <div
          class="border-t lg:border-l border-gray-300 dark:border-gray-700 lg:hidden"
        ></div>
        <DocumentationAndFilesForm />
        <div
          class="border-t lg:border-l border-gray-300 dark:border-gray-700"
        ></div>
        <AdditionalInformationForm />
      </div>
    </template>
  </Card>
</template>

<style scoped>
.building-management-wrapper {
  display: grid;
  grid-template-columns: 1fr 1px 1fr;
  row-gap: 4rem;
  column-gap: 2rem;
}

@media only screen and (max-width: theme("screens.xl")) {
  .building-management-wrapper {
    gap: 1rem;
  }
}

@media only screen and (max-width: theme("screens.lg")) {
  .building-management-wrapper {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
}
</style>
