<script lang="ts" setup>
import { useField } from "vee-validate";
import { onClickOutside, useWindowSize } from "@vueuse/core";
import { XCircleIcon } from "@heroicons/vue/24/solid";
import { ParkingAvailabilityValues } from "~/enums/admin";
import type { InputTypeHTMLAttribute } from "vue";
import type {
  VSelectDropdownDirections,
  VSelectFieldData,
} from "~/types/form/vSelectField";

const props = defineProps<{
  options: any[];
  id?: string;
  label?: string;
  type?: InputTypeHTMLAttribute;
  name: string;
  error?: string;
  readonly?: boolean;
  multiple?: boolean;
}>();

const emit = defineEmits<{
  (e: "update", value: any): void;
}>();

const selectElement = ref<HTMLDivElement | null>(null);
const selectMenuToggle = ref(false);
const selectDropdownMenu = ref<HTMLDivElement | null>(null);
const selectDropdownDirection = ref<VSelectDropdownDirections>("down");
const selectValueArray = ref<VSelectFieldData[]>([]); // This is used to handle "multiple" prop as a select value
const {
  value: selectValue, // This is used to handle single select value
  errorMessage,
  validate,
} = useField<VSelectFieldData[] | null>(() => props.name ?? []);

const { height: windowHeight } = useWindowSize();

onClickOutside(
  selectDropdownMenu,
  () => {
    selectMenuToggle.value = false;
  },
  { ignore: [selectElement] }
);

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

const toggleDropdown = () => {
  selectMenuToggle.value = !selectMenuToggle.value;
};

const handleOnClear = () => {
  if (props.multiple) {
    selectValueArray.value = [];
  }

  selectValue.value = null;

  if (selectMenuToggle.value) {
    selectMenuToggle.value = false;
  }

  emit("update", selectValue.value);
};

const handleSelectItem = (value: VSelectFieldData) => {
  if (props.multiple) {
    const existItemIndex = selectValueArray.value.findIndex(
      (item) => item.id === value.id
    );

    if (existItemIndex !== -1) {
      selectValueArray.value.splice(existItemIndex, 1);
      selectValue.value = selectValueArray.value;
      emit("update", selectValue.value);
      return;
    }

    const findIndex = selectValueArray.value.findIndex(
      (selectedItem) => selectedItem.id === value.id
    );

    if (findIndex !== -1) {
      selectValueArray.value.splice(findIndex, 1);

      // If select field is empty
      if (!selectValueArray.value.length) {
        selectValue.value = null;
        return;
      }

      selectValue.value = selectValueArray.value;
    } else {
      const findNone = value.value === ParkingAvailabilityValues.None;

      if (findNone) {
        selectValueArray.value = [value];
        selectValue.value = selectValueArray.value;
        emit("update", selectValue.value);
        return;
      }

      selectValueArray.value.push(value);
      selectValue.value = selectValueArray.value;

      const findSomeNone = selectValueArray.value.some(
        (item) => item.value === ParkingAvailabilityValues.None
      );

      if (findSomeNone) {
        const noneIndex = selectValueArray.value.findIndex(
          (item) => item.value === ParkingAvailabilityValues.None
        );

        if (noneIndex !== -1) {
          selectValueArray.value.splice(noneIndex, 1);
          selectValue.value = selectValueArray.value;
        }
      }
    }
  } else {
    selectValue.value = [value];
  }

  emit("update", selectValue.value);

  if (!props.multiple) {
    toggleDropdown();
  }

  setTimeout(() => {
    validate();
  }, 300);
};

const handleMultipleItemChecked = (id: number) => {
  return !!selectValueArray.value.find((item) => item.id === id);
};

watch(selectDropdownMenu, () => {
  if (selectDropdownMenu.value) {
    handleSelectDropdownPosition();
  }
});

onMounted(() => {
  window.addEventListener("resize", handleSelectDropdownPosition);
  handleSelectDropdownPosition();
});

const handleSelectValue = computed<string>(() => {
  /*
    Check whether selectValue:
    - is not null or undefined,
    - exist and is an array,
    - contains at least one object,
    - first element in first object has "name".
   */
  if (
    !selectValue.value ||
    !Array.isArray(selectValue.value) ||
    !selectValue.value[0]?.name
  ) {
    return "";
  }

  return selectValue.value[0].name;
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
      class="block w-full min-h-[42px] p-2.5 pr-10 relative bg-gray-50 border text-gray-900 text-sm rounded focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 cursor-pointer"
      :class="[
        selectMenuToggle
          ? 'ring-1 ring-blue-500 border-blue-500'
          : 'border-gray-300 dark:border-gray-600',
      ]"
      @click="toggleDropdown"
    >
      <template v-if="multiple">
        <template v-for="(item, index) in selectValueArray" :key="item.id">
          {{
            index !== selectValueArray.length - 1 ? `${item.name}, ` : item.name
          }}
        </template>
      </template>

      <div v-else class="truncate">
        {{ selectValue?.[0]?.name || null }}
      </div>

      <div
        v-if="selectValue"
        class="flex items-center absolute right-2"
        :class="[multiple ? 'top-2' : 'inset-y-0']"
      >
        <XCircleIcon @click.prevent.stop="handleOnClear" class="block size-6" />
      </div>
    </div>

    <div
      v-if="selectMenuToggle"
      ref="selectDropdownMenu"
      class="dropdown w-full absolute mt-[2px] z-10 bg-white divide-y divide-gray-100 rounded dark:bg-gray-700 border border-gray-300 dark:border-gray-600"
      :class="selectDropdownDirection"
    >
      <ul
        class="dropdown__list py-2 text-sm text-gray-700 dark:text-gray-200 overflow-auto"
      >
        <li v-for="item in options" :key="item.id">
          <template v-if="multiple">
            <div
              class="flex items-center ps-3 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
              @click.prevent.stop="handleSelectItem(item)"
            >
              <input
                :id="item.id"
                type="checkbox"
                :checked="handleMultipleItemChecked(item.id)"
                class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500 pointer-events-none"
              />
              <label :for="item.id" class="w-full px-4 py-2 cursor-pointer">
                {{ item.name }}
              </label>
            </div>
          </template>

          <div
            v-else
            class="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white cursor-pointer"
            @click.prevent.stop="handleSelectItem(item)"
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

<style lang="scss" scoped>
.dropdown.up {
  bottom: 100%;
  transform: translateY(22px);
  box-shadow: 0 -4px 16px -2px rgba(0, 0, 0, 0.3);
}

.dropdown.down {
  box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.3);
}

.dropdown__list {
  max-height: 240px;
  &::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  &::-webkit-scrollbar-track {
    background: theme("colors.gray.800");
  }

  /* Handle */
  &::-webkit-scrollbar-thumb {
    background: theme("colors.gray.500");
    border-radius: 8px;
  }

  /* Handle on hover */
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
}
</style>
