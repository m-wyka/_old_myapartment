<script lang="ts" setup>
import { object, string } from "yup";
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import InputField from "~/components/form/InputField.vue";

const { handleSubmit } = useForm({
  validationSchema: object({
    buildingOwner: string().required().min(3).max(255),
    buildingOwnerEmail: string().required().min(3).max(255),
    buildingOwnerPhone: string().required().min(3).max(255),
    buildingAdministrator: string().required().min(3).max(255),
    buildingAdministratorEmail: string().required().min(3).max(255),
    buildingAdministratorPhone: string().required().min(3).max(255),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <h2 class="mb-4 text-2xl font-semibold dark:text-white">
      {{ $t("admin.buildingManagement.form.administrativeInformation") }}
    </h2>

    <div class="grid gap-4 mb-8 md:grid-cols-2">
      <div class="grid gap-4">
        <InputField
          name="buildingOwner"
          :label="$t('admin.buildingManagement.form.buildingOwner')"
        />

        <InputField
          name="buildingOwnerEmail"
          :label="$t('form.fields.email')"
        />

        <InputField
          name="buildingOwnerPhone"
          :label="$t('form.fields.phone')"
        />
      </div>

      <div class="grid gap-4">
        <InputField
          name="buildingAdministrator"
          :label="$t('admin.buildingManagement.form.buildingAdministrator')"
        />

        <InputField
          name="buildingAdministratorEmail"
          :label="$t('form.fields.email')"
        />

        <InputField
          name="buildingAdministratorPhone"
          :label="$t('form.fields.phone')"
        />
      </div>
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
