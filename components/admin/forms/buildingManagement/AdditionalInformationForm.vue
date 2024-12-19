<script lang="ts" setup>
import { object, string } from "yup";
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import VSelectField from "~/components/form/VSelectField.vue";
import VTextarea from "~/components/form/VTextarea.vue";

const { arrayRequiredSchema } = validationSchemas();

const { handleSubmit } = useForm({
  validationSchema: object({
    buildingHistory: string(),
    utilitiesAvailable: arrayRequiredSchema,
    heatingSystem: arrayRequiredSchema,
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
      <VTextarea
        name="buildingHistory"
        :label="$t('admin.buildingManagement.form.buildingHistory')"
        class="col-span-2"
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
