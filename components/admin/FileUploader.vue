<script lang="ts" setup>
import { useField } from "vee-validate";
import { mimeTypes } from "~/constants/fileMimes";

const props = defineProps<{
  id?: string;
  name?: string;
  label?: string;
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (e: "update", value: FileList | null): void;
}>();

const inputElement = ref<HTMLInputElement | null>(null);
const saveFilesControl = inject<Ref<boolean>>("saveFilesControl") || ref(false);
const filesArray = ref<FileList | null>(null);

const { value: filesValue, errorMessage } = useField<FileList | null>(
  () => props.name ?? ""
);

const handleInputChange = (event: Event) => {
  const inputTarget = event.target as HTMLInputElement;
  const { files } = inputTarget;

  if (!files) {
    return;
  }

  filesArray.value = files;
  filesValue.value = files;
  emit("update", filesArray.value);
};

watch(saveFilesControl, (newValue) => {
  if (newValue) {
    if (!inputElement.value) {
      return;
    }

    inputElement.value.value = "";
    saveFilesControl.value = false;
  }
});
</script>

<template>
  <div>
    <div>
      <label
        v-if="label"
        class="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
        :for="id"
      >
        {{ label }}
      </label>

      <input
        ref="inputElement"
        :id="id"
        class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-zinc-800 dark:border-zinc-700 dark:placeholder-zinc-400"
        type="file"
        :name="name"
        :multiple="multiple"
        :accept="Object.values(mimeTypes).toString()"
        @change="handleInputChange"
      />
    </div>
  </div>
</template>

<style></style>
