<script lang="ts" setup>
import { object, string, number } from "yup";
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import VInputField from "~/components/form/VInputField.vue";
import VSelectField from "~/components/form/VSelectField.vue";
import VDatepicker from "~/components/form/VDatepicker.vue";

const props = defineProps<{
  initialValues?: any;
}>();

const {
  basicStringSchema,
  numberRequired,
  numberRequiredNullableSchema,
  arrayRequiredSchema,
} = validationSchemas();

const { handleSubmit } = useForm({
  validationSchema: object({
    name: basicStringSchema,
    buildingAddress: basicStringSchema,
    yearOfConstruction: numberRequired,
    numberOfFloors: numberRequiredNullableSchema,
    buildingType: arrayRequiredSchema,
  }),
  initialValues: props.initialValues,
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
    <div class="grid gap-4 mb-8">
      <VInputField
        id="name"
        name="name"
        :label="$t('admin.buildingsManagement.form.buildingName')"
      />

      <VInputField
        id="address"
        name="address"
        :label="$t('form.fields.address')"
        :placeholder="$t('form.fields.addressPlaceholder')"
      />

      <VDatepicker
        id="yearOfConstruction"
        name="yearOfConstruction"
        :label="$t('admin.buildingsManagement.form.yearOfConstruction')"
        :max-date="yearOfConstructionMaxDate"
        year-picker
      />

      <VInputField
        id="numberOfFloors"
        type="number"
        name="numberOfFloors"
        :label="$t('admin.buildingsManagement.form.numberOfFloors')"
      />

      <VSelectField
        id="buildingType"
        :options="options"
        name="buildingType"
        :label="$t('admin.buildingsManagement.form.buildingType')"
      />
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
