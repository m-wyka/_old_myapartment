<script lang="ts" setup>
import { object, string } from "yup";
import { useForm } from "vee-validate";
import { phoneRegex } from "~/constants/regex";
import Btn from "~/components/Btn.vue";
import VInputField from "~/components/form/VInputField.vue";

const { t } = useI18n();
const { handleSubmit } = useForm({
  validationSchema: object({
    buildingOwner: string().required().min(3).max(255),
    buildingOwnerEmail: string().email(),
    buildingOwnerPhone: string().matches(
      phoneRegex,
      t("form.validation.phone")
    ),
    buildingAdministrator: string().required().min(3).max(255),
    buildingAdministratorEmail: string().email(),
    buildingAdministratorPhone: string().matches(
      phoneRegex,
      t("form.validation.phone")
    ),
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
        <VInputField
          name="buildingOwner"
          :label="$t('admin.buildingManagement.form.buildingOwner')"
        />

        <VInputField
          type="email"
          name="buildingOwnerEmail"
          :label="$t('admin.buildingManagement.form.buildingOwnerEmail')"
        />

        <VInputField
          type="tel"
          name="buildingOwnerPhone"
          :label="$t('admin.buildingManagement.form.buildingOwnerPhone')"
        />
      </div>

      <div class="grid gap-4">
        <VInputField
          name="buildingAdministrator"
          :label="$t('admin.buildingManagement.form.buildingAdministrator')"
        />

        <VInputField
          type="email"
          name="buildingAdministratorEmail"
          :label="
            $t('admin.buildingManagement.form.buildingAdministratorEmail')
          "
        />

        <VInputField
          type="tel"
          name="buildingAdministratorPhone"
          :label="
            $t('admin.buildingManagement.form.buildingAdministratorPhone')
          "
        />
      </div>
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
