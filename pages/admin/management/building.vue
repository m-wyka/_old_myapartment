<script lang="ts" setup>
import Card from "~/components/Card.vue";
import BasicInformationForm from "~/components/admin/forms/buildingManagement/BasicInformationForm.vue";

definePageMeta({
  layout: "admin",
  middleware: "admin-layout",
});
</script>

<template>
  <Card :title="$t('admin.menu.buildingManagement')">
    <template #content>
      <div class="grid grid-cols-2">
        <BasicInformationForm />
      </div>
    </template>
  </Card>
</template>

<style></style>
