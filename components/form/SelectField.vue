<script lang="ts" setup>
import { onClickOutside } from "@vueuse/core";
import type { InputTypeHTMLAttribute } from "vue";
import { XCircleIcon } from "@heroicons/vue/24/solid";

defineProps<{
  id?: string;
  label?: string;
  type?: InputTypeHTMLAttribute;
  name?: string;
  error?: string;
  readonly?: boolean;
}>();

const items = ref([
  {
    id: 1,
    name: "Lorem",
    value: "lorem",
  },
  { id: 2, name: "Ipsum", value: "Ipsum" },
]);

const inputElement = ref(null);
const inputValue = ref(null);
const menu = ref(false);
const dropdownMenu = ref(null);

onClickOutside(
  dropdownMenu,
  () => {
    menu.value = false;
  },
  { ignore: [inputElement] }
);

const toggleDropdown = () => {
  menu.value = !menu.value;
};

const selectItem = (value: any) => {
  inputValue.value = value;
  toggleDropdown();
};

const onClearSelect = () => {
  inputValue.value = null;
};
</script>

<template>
  <div class="relative">
    <label
      v-if="label"
      :for="id"
      class="block mb-1 text-sm font-medium text-gray-900 dark:text-white"
    >
      {{ label }}
    </label>

    <div
      ref="inputElement"
      class="block w-full h-[42px] p-2.5 pr-10 relative bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
      :class="[
        menu
          ? 'ring-1 dark:ring-blue-500 dark:border-blue-500 '
          : 'dark:border-gray-600',
      ]"
      @click="toggleDropdown"
    >
      <div class="truncate">
        {{ inputValue?.name ?? "" }}
      </div>

      <div
        v-if="inputValue"
        class="flex items-center absolute inset-y-0 right-2"
      >
        <XCircleIcon @click.stop="onClearSelect" class="block size-6" />
      </div>
    </div>

    <div
      v-if="menu"
      ref="dropdownMenu"
      class="w-full absolute mt-[2px] z-10 bg-white divide-y divide-gray-100 rounded shadow-lg dark:bg-gray-700 border dark:border-gray-600"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li v-for="item in items">
          <div
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            @click.prevent.stop="selectItem(item)"
          >
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
