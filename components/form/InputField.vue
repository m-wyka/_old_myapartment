<script lang="ts" setup>
import type { InputTypeHTMLAttribute } from "vue";

defineProps<{
  id?: string;
  label?: string;
  type?: InputTypeHTMLAttribute;
  name?: string;
  error?: string;
  readonly?: boolean;
}>();

const model = defineModel();
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

    <input
      v-model="model"
      :type="type || 'text'"
      :id="id"
      :name="name"
      :readonly="readonly"
      class="input-field bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
    />

    <p v-if="error" class="mt-1 text-red-500 text-xs">
      {{ error }}
    </p>
  </div>
</template>

<style>
.input-field {
  &:read-only {
    pointer-events: none;
  }
}
</style>
