<script lang="ts" setup>
import Btn from "~/components/Btn.vue";
import InputField from "~/components/form/InputField.vue";
import SelectField from "~/components/form/SelectField.vue";

const form = reactive({
  name: "",
});
</script>

<template>
  <form>
    <h2 class="mb-4 text-2xl font-semibold dark:text-white">
      {{ $t("admin.buildingManagement.form.basicInformation") }}
    </h2>

    <div class="grid gap-4 mb-8 md:grid-cols-2">
      <InputField
        v-model="form.name"
        id="buildingName"
        :label="$t('admin.buildingManagement.form.name')"
      />
      <InputField
        v-model="form.name"
        id="buildingName"
        :label="$t('admin.buildingManagement.form.address')"
      />
      <InputField
        v-model="form.name"
        type="number"
        id="buildingName"
        :label="$t('admin.buildingManagement.form.yearOfConstruction')"
      />
      <InputField
        v-model="form.name"
        type="number"
        id="buildingName"
        :label="$t('admin.buildingManagement.form.numberOfFloors')"
      />
      <SelectField
        v-model="form.name"
        id="buildingName"
        :label="$t('admin.buildingManagement.form.buildingType')"
      />
    </div>

    <Btn>{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
