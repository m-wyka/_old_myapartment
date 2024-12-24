<script lang="ts" setup>
import { object } from "yup";
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import VInputField from "~/components/form/VInputField.vue";

const { basicStringSchema, emailSchema, phoneSchema } = validationSchemas();

const { handleSubmit } = useForm({
  validationSchema: object({
    buildingOwner: basicStringSchema,
    buildingOwnerEmail: emailSchema,
    buildingOwnerPhone: phoneSchema,
    buildingAdministrator: basicStringSchema,
    buildingAdministratorEmail: emailSchema,
    buildingAdministratorPhone: phoneSchema,
  }),
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-8 md:grid-cols-2">
      <div class="grid gap-4">
        <h6 class="mb-0">
          {{ $t("admin.buildingsManagement.form.buildingOwner") }}
        </h6>

        <VInputField name="buildingOwner" :label="$t('form.fields.name')" />

        <VInputField
          type="email"
          name="buildingOwnerEmail"
          :label="$t('form.fields.email')"
        />

        <VInputField
          type="tel"
          name="buildingOwnerPhone"
          :label="$t('form.fields.phone')"
        />
      </div>

      <div class="grid gap-4">
        <h6 class="mb-0">
          {{ $t("admin.buildingsManagement.form.buildingAdministrator") }}
        </h6>

        <VInputField
          name="buildingAdministrator"
          :label="$t('form.fields.name')"
        />

        <VInputField
          type="email"
          name="buildingAdministratorEmail"
          :label="$t('form.fields.email')"
        />

        <VInputField
          type="tel"
          name="buildingAdministratorPhone"
          :label="$t('form.fields.phone')"
        />
      </div>
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
