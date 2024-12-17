<script lang="ts" setup>
import { object, string, number } from "yup";
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import InputField from "~/components/form/InputField.vue";
import SelectField from "~/components/form/SelectField.vue";
import Datepicker from "~/components/form/Datepicker.vue";

const { handleSubmit } = useForm({
  validationSchema: object({
    parkingAvailability: string().required().min(3).max(255),
    recreationArea: string().required().min(3).max(255),
    accessibilityForPeopleWithDisabilities: object()
      .shape({ id: number().required() })
      .required(),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const options = ref([
  { id: 1, name: "Tak", value: true },
  { id: 2, name: "Nie", value: false },
]);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2 class="mb-4 text-2xl font-semibold dark:text-white">
      {{ $t("admin.buildingManagement.form.usageInformation") }}
    </h2>

    <div class="grid gap-4 mb-8 md:grid-cols-2">
      <InputField
        name="parkingAvailability"
        :label="$t('admin.buildingManagement.form.parkingAvailability')"
      />

      <InputField
        name="recreationArea"
        :label="$t('admin.buildingManagement.form.recreationArea')"
      />

      <SelectField
        :options="options"
        name="accessibilityForPeopleWithDisabilities"
        :label="
          $t(
            'admin.buildingManagement.form.accessibilityForPeopleWithDisabilities'
          )
        "
      />
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
