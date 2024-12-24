<script lang="ts" setup>
import { useField } from "vee-validate";

const props = defineProps<{
  id?: string;
  label?: string;
  name: string;
  error?: string;
  readonly?: boolean;
}>();

const { value, errorMessage } = useField<string | null>(() => props.name ?? "");

const maxLength = ref(500);
</script>

<template>
  <div>
    <label
      v-if="label"
      :for="id"
      class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>

    <textarea
      v-model="value"
      :id="id"
      :name="name"
      :readonly="readonly"
      class="textarea block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-zinc-800 dark:border-zinc-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      rows="4"
      :maxlength="maxLength"
    ></textarea>

    <p v-if="value" class="mt-1 text-xs text-gray-400 dark:text-gray-500">
      {{ value.length }} / {{ maxLength }}
    </p>

    <p v-if="errorMessage" class="mt-1 text-red-500 text-xs">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style>
.textarea {
  &:read-only {
    pointer-events: none;
  }
}
</style>
