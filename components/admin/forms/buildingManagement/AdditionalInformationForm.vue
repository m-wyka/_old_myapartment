<script lang="ts" setup>
import { object, number } from "yup";
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import VInputField from "~/components/form/VInputField.vue";
import VSelectField from "~/components/form/VSelectField.vue";

const { handleSubmit } = useForm({
  validationSchema: object({
    buildingHistory: number().required(),
    utilitiesAvailable: object().shape({ id: number().required() }).required(),
    heatingSystem: object().shape({ id: number().required() }).required(),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const utilitiesAvailableOptions = ref([
  { id: 1, name: "A+++", value: "a+++" },
  { id: 2, name: "A++", value: "a++" },
  { id: 3, name: "A+", value: "a+" },
  { id: 4, name: "A", value: "a" },
  { id: 5, name: "B", value: "B" },
  { id: 6, name: "C", value: "c" },
  { id: 8, name: "D", value: "d" },
]);

const monitoringAndSecurityOptions = ref([
  { id: 1, name: "Tak", value: true },
  { id: 2, name: "Nie", value: false },
]);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2 class="mb-4 text-2xl font-semibold dark:text-white">
      {{ $t("admin.buildingManagement.form.technicalInformation") }}
    </h2>

    <div class="grid gap-4 mb-8 md:grid-cols-2">
      <VInputField
        name="buildingHistory"
        :label="$t('admin.buildingManagement.form.buildingHistory')"
      />

      <VSelectField
        :options="utilitiesAvailableOptions"
        name="utilitiesAvailable"
        :label="$t('admin.buildingManagement.form.energyCertificates')"
      />

      <VSelectField
        ref="target"
        :options="monitoringAndSecurityOptions"
        name="heatingSystem"
        :label="$t('admin.buildingManagement.form.monitoringAndSecurity')"
      />
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
