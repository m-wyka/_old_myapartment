<script lang="ts" setup>
import { useField } from "vee-validate";
import { onClickOutside, useWindowSize } from "@vueuse/core";
import { XCircleIcon } from "@heroicons/vue/24/solid";
import type { InputTypeHTMLAttribute } from "vue";
import type {
  SelectDropdownDirections,
  SelectField,
} from "~/types/form/selectField";

const props = defineProps<{
  options: any[];
  id?: string;
  label?: string;
  type?: InputTypeHTMLAttribute;
  name: string;
  error?: string;
  readonly?: boolean;
}>();

const selectElement = ref<HTMLDivElement | null>(null);
const selectMenuToggle = ref(false);
const selectDropdownMenu = ref<HTMLDivElement | null>(null);
const selectDropdownDirection = ref<SelectDropdownDirections>("down");
const {
  value: selectValue,
  errorMessage,
  validate,
} = useField<SelectField | null>(() => props.name ?? "");

const { height: windowHeight } = useWindowSize();

const handleSelectDropdownPosition = () => {
  if (!selectElement.value) {
    return;
  }

  const rect = selectElement.value.getBoundingClientRect();

  if (windowHeight.value - rect.bottom < 200) {
    selectDropdownDirection.value = "up";
  } else {
    selectDropdownDirection.value = "down";
  }
};

onClickOutside(
  selectDropdownMenu,
  () => {
    selectMenuToggle.value = false;
  },
  { ignore: [selectElement] }
);

const toggleDropdown = () => {
  selectMenuToggle.value = !selectMenuToggle.value;
};

const selectItem = (value: any) => {
  selectValue.value = value;
  toggleDropdown();
  setTimeout(() => {
    validate();
  }, 300);
};

const onClearSelect = () => {
  selectValue.value = null;
};

onMounted(() => {
  window.addEventListener("resize", handleSelectDropdownPosition);
  handleSelectDropdownPosition();
});

watch(selectDropdownMenu, () => {
  if (selectDropdownMenu.value) {
    handleSelectDropdownPosition();
  }
});
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
      ref="selectElement"
      class="block w-full h-[42px] p-2.5 pr-10 relative bg-gray-50 border text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
      :class="[
        selectMenuToggle
          ? 'ring-1 ring-blue-500 border-blue-500'
          : 'border-gray-300 dark:border-gray-600',
      ]"
      @click="toggleDropdown"
    >
      <div class="truncate">
        {{ selectValue?.name ?? "" }}
      </div>

      <div
        v-if="selectValue"
        class="flex items-center absolute inset-y-0 right-2"
      >
        <XCircleIcon @click.stop="onClearSelect" class="block size-6" />
      </div>
    </div>

    <div
      v-if="selectMenuToggle"
      ref="selectDropdownMenu"
      class="dropdown w-full absolute mt-[2px] z-10 bg-white divide-y divide-gray-100 rounded shadow-lg dark:bg-gray-700 border dark:border-gray-600"
      :class="selectDropdownDirection"
    >
      <ul class="py-2 text-sm text-gray-700 dark:text-gray-200">
        <li v-for="item in options" :key="item.id">
          <div
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            @click="selectItem(item)"
          >
            {{ item.name }}
          </div>
        </li>
      </ul>
    </div>
    <p v-if="errorMessage" class="mt-1 text-red-500 text-xs">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style scoped>
.dropdown.up {
  bottom: 100%;
  transform: translateY(22px);
}

.dropdown.down {
  top: 100%;
  transform: translateY(0);
}
</style>
