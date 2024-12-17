<script lang="ts" setup>
import VInputField from "~/components/form/VInputField.vue";

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
      <VInputField
        v-model="email"
        type="email"
        id="email"
        name="email"
        :label="$t('form.fields.email')"
      />

      <VInputField
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
