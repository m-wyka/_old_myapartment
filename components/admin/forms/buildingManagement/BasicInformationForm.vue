<script lang="ts" setup>
import { object, string, number } from "yup";
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import VInputField from "~/components/form/VInputField.vue";
import VSelectField from "~/components/form/VSelectField.vue";
import VDatepicker from "~/components/form/VDatepicker.vue";

const {
  basicStringSchema,
  numberRequired,
  numberRequiredNullableSchema,
  arrayRequiredSchema,
} = validationSchemas();

const { handleSubmit } = useForm({
  validationSchema: object({
    name: basicStringSchema,
    address: basicStringSchema,
    yearOfConstruction: numberRequired,
    numberOfFloors: numberRequiredNullableSchema,
    buildingType: arrayRequiredSchema,
  }),
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const yearOfConstructionMaxDate = ref(new Date());
const options = ref([
  {
    id: 1,
    name: "Mieszkalny",
    value: "lorem",
  },
  { id: 2, name: "Mieszkalno-usługowy", value: "Ipsum" },
]);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2 class="mb-4 text-2xl font-semibold dark:text-white">
      {{ $t("admin.buildingManagement.form.basicInformation") }}
    </h2>

    <div class="grid gap-4 mb-8 md:grid-cols-2">
      <VInputField
        name="name"
        :label="$t('admin.buildingManagement.form.name')"
      />

      <VInputField
        name="address"
        :label="$t('admin.buildingManagement.form.address')"
        :placeholder="$t('admin.buildingManagement.form.addressPlaceholder')"
      />

      <VDatepicker
        year-picker
        name="yearOfConstruction"
        :label="$t('admin.buildingManagement.form.yearOfConstruction')"
        :max-date="yearOfConstructionMaxDate"
      />

      <VInputField
        type="number"
        name="numberOfFloors"
        :label="$t('admin.buildingManagement.form.numberOfFloors')"
      />

      <VSelectField
        :options="options"
        name="buildingType"
        :label="$t('admin.buildingManagement.form.buildingType')"
      />
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
