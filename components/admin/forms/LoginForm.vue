<script lang="ts" setup>
import InputField from "~/components/form/InputField.vue";

const loading = ref(false);
const email = ref("");
const password = ref("");

const submit = () => {
  console.log("Submit");
};
</script>

<template>
  <form @submit.prevent="submit">
    <div class="grid gap-4 mb-6">
      <InputField
        v-model="email"
        type="email"
        id="email"
        name="email"
        :label="$t('form.fields.email')"
      />

      <InputField
        v-model="password"
        type="password"
        id="password"
        name="password"
        :label="$t('form.fields.password')"
      />
    </div>

    <Btn type="submit" :loading="loading">
      {{ $t("form.signIn") }}
    </Btn>
  </form>
</template>

<style></style>
