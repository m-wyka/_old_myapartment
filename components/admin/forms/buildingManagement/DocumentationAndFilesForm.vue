<script lang="ts" setup>
import { object, string, number } from "yup";
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import InputField from "~/components/form/VInputField.vue";
import SelectField from "~/components/form/VSelectField.vue";
import Datepicker from "~/components/form/VDatepicker.vue";

const { handleSubmit } = useForm({
  validationSchema: object({
    name: string().required().min(3).max(255),
    address: string().required().min(3).max(255),
    yearOfConstruction: number().required(),
    numberOfFloors: number().required(),
    buildingType: object().shape({ id: number().required() }).required(),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2 class="mb-4 text-2xl font-semibold dark:text-white">
      {{ $t("admin.buildingManagement.form.basicInformation") }}
    </h2>

    <div class="grid gap-4 mb-8 md:grid-cols-2">// Docs</div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
