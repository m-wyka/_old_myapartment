<script lang="ts" setup>
import { Modal, type ModalOptions, type modalPlacement } from "flowbite";

const props = defineProps<{
  modelValue: boolean;
  placement?: modalPlacement;
  title: string;
}>();

const emit = defineEmits<{
  (e: "update:modelValue", value: boolean): void;
  (e: "on:hide"): void;
}>();

const modal = ref<Modal | null>(null);
const modalElement = ref<HTMLDivElement | null>(null);
const modalOptions = ref<ModalOptions>({
  placement: props.placement ?? "center",
  backdrop: "dynamic",
  backdropClasses: "bg-black/60 dark:bg-black/80 fixed inset-0 z-40",
  onHide: () => {
    emit("update:modelValue", false);
    emit("on:hide");
  },
});

watch(
  () => props.modelValue,
  (newValue) => {
    if (!modal.value) {
      return;
    }

    if (newValue) {
      modal.value.show();
    }
  }
);

onMounted(() => {
  modal.value = new Modal(modalElement.value, modalOptions.value);
});
</script>

<template>
  <div
    ref="modalElement"
    tabindex="-1"
    :aria-hidden="modelValue"
    class="fixed top-0 left-0 right-0 z-50 hidden w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full"
  >
    <div class="relative p-4 w-full max-w-2xl max-h-full">
      <Card class="!p-0">
        <template #title>
          <div
            class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-zinc-800"
          >
            <h3 class="mb-0">{{ title }}</h3>

            <button
              type="button"
              class="text-zinc-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-zinc-800 dark:hover:text-white"
              @click="modal?.hide()"
            >
              <Icon
                name="ic:round-close"
                class="size-6"
                :aria-hidden="modelValue"
              />
              <span class="sr-only">
                {{ $t("misc.close") }}
              </span>
            </button>
          </div>
        </template>

        <div class="p-4 md:p-5 space-y-4">
          <slot />
        </div>

        <div
          class="flex items-center gap-2 p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-zinc-800"
        >
          <Btn type="button">Tak</Btn>
          <Btn type="button" variant="tonal" color="red">Nie</Btn>
        </div>
      </Card>
    </div>
  </div>
</template>

<style></style>
