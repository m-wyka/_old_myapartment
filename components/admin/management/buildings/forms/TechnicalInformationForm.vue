<script lang="ts" setup>
import { object } from "yup";
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import VInputField from "~/components/form/VInputField.vue";
import VSelectField from "~/components/form/VSelectField.vue";

const { numberRequiredNullableSchema, arrayRequiredSchema } =
  validationSchemas();

const { handleSubmit } = useForm({
  validationSchema: object({
    surface: numberRequiredNullableSchema,
    numberOfApartments: numberRequiredNullableSchema,
    numberOfElevators: numberRequiredNullableSchema,
    heatingSystem: arrayRequiredSchema,
    utilitiesAvailable: arrayRequiredSchema,
  }),
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const utilitiesAvailableOptions = ref([
  {
    id: 1,
    name: "Gaz",
    value: "gas",
  },
  { id: 2, name: "Prąd", value: "electricity" },
  { id: 3, name: "Woda", value: "water" },
]);

const heatingSystemOptions = ref([
  {
    id: 1,
    name: "Centralne",
    value: "central",
  },
  { id: 2, name: "Gazowe", value: "gas" },
]);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-8">
      <VInputField
        type="number"
        name="surface"
        :label="$t('admin.buildingsManagement.form.surface')"
      />

      <VInputField
        type="number"
        name="numberOfApartments"
        :label="$t('admin.buildingsManagement.form.numberOfApartments')"
      />

      <VInputField
        type="number"
        name="numberOfElevators"
        :label="$t('admin.buildingsManagement.form.numberOfElevators')"
      />

      <VSelectField
        :options="heatingSystemOptions"
        name="heatingSystem"
        :label="$t('admin.buildingsManagement.form.heatingSystem')"
      />

      <VSelectField
        :options="utilitiesAvailableOptions"
        name="utilitiesAvailable"
        :label="$t('admin.buildingsManagement.form.utilitiesAvailable')"
        multiple
      />
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
