<script lang="ts" setup>
import { useForm } from "vee-validate";
import Btn from "~/components/Btn.vue";
import VSelectField from "~/components/form/VSelectField.vue";
import VTextarea from "~/components/form/VTextarea.vue";

const { t } = useI18n();
const { handleSubmit } = useForm();

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const energyCertificatesOptions = ref([
  { id: 1, name: "A+++", value: "a+++" },
  { id: 2, name: "A++", value: "a++" },
  { id: 3, name: "A+", value: "a+" },
  { id: 4, name: "A", value: "a" },
  { id: 5, name: "B", value: "B" },
  { id: 6, name: "C", value: "c" },
  { id: 8, name: "D", value: "d" },
]);

const monitoringAndSecurityOptions = ref([
  { id: 1, name: t("misc.yes"), value: true },
  { id: 2, name: t("misc.no"), value: false },
]);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-8 md:grid-cols-2">
      <VTextarea
        name="buildingHistory"
        :label="$t('admin.buildingsManagement.form.buildingHistory')"
        class="col-span-2"
      />

      <VSelectField
        :options="energyCertificatesOptions"
        name="energyCertificates"
        :label="$t('admin.buildingsManagement.form.energyCertificates')"
        multiple
      />

      <VSelectField
        ref="target"
        :options="monitoringAndSecurityOptions"
        name="monitoringAndSecurity"
        :label="$t('admin.buildingsManagement.form.monitoringAndSecurity')"
      />
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
