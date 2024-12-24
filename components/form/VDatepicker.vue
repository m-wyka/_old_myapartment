<script lang="ts" setup>
import { useField } from "vee-validate";
import VueDatePicker from "@vuepic/vue-datepicker";
import type { DatePickerInstance } from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps<{
  id?: string;
  label?: string;
  error?: string;
  name: string;
  yearPicker?: boolean;
  maxDate?: Date;
  preventMinMaxNavigation?: boolean;
}>();

const datepicker = ref<DatePickerInstance | null>(null);
const { value, errorMessage } = useField<Date | number | null>(
  () => props.name ?? ""
);

const handleCancelClick = () => {
  if (!datepicker.value) {
    return;
  }

  datepicker.value.closeMenu();
};

const handleSaveClick = () => {
  if (!datepicker.value) {
    return;
  }

  datepicker.value.selectDate();
};
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

    <VueDatePicker
      id
      ref="datepicker"
      v-model="value"
      :year-picker="yearPicker"
      :offset="2"
      hide-input-icon
      position="left"
      :max-date="maxDate"
    >
      <template #action-buttons>
        <div class="flex gap-2">
          <Btn variant="outlined" size="small" @click="handleCancelClick">
            {{ $t("form.cancel") }}
          </Btn>

          <Btn size="small" @click="handleSaveClick">
            {{ $t("form.save") }}
          </Btn>
        </div>
      </template>
    </VueDatePicker>

    <p v-if="errorMessage" class="mt-1 text-red-500 text-xs">
      {{ errorMessage }}
    </p>
  </div>
</template>

<style>
:root {
  --dp-input-icon-padding: 0.625rem;
  --dp-input-padding: 0.625rem;
  --dp-border-radius: 0.5rem;
}
</style>

<style lang="scss" scoped>
:deep(.dp__theme_light) {
  --dp-background-color: theme("colors.gray.50");
  --dp-hover-color: theme("colors.blue.500");
  --dp-hover-text-color: theme("colors.white");
  --dp-hover-icon-color: theme("colors.white");
  --dp-primary-color: theme("colors.blue.600");
  --dp-primary-disabled-color: theme("colors.blue.900");
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: theme("colors.gray.300");
  --dp-menu-border-color: theme("colors.gray.300");
  --dp-border-color-hover: theme("colors.gray.300");
  --dp-border-color-focus: theme("colors.gray.300");
  --dp-disabled-color: theme("colors.gray.300");
  --dp-disabled-color-text: theme("colors.gray.400");
  --dp-scroll-bar-background: theme("colors.gray.200");
  --dp-scroll-bar-color: theme("colors.gray.400");
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: theme("colors.white");
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
  --dp-overlay-col-padding: 0.25rem;
}

:deep(.dp__theme_light:is(.dark *)) {
  --dp-background-color: theme("colors.zinc.800");
  --dp-text-color: theme("colors.white");
  --dp-hover-color: theme("colors.blue.500");
  --dp-hover-text-color: theme("colors.white");
  --dp-hover-icon-color: theme("colors.white");
  --dp-primary-color: theme("colors.blue.600");
  --dp-primary-disabled-color: theme("colors.blue.900");
  --dp-primary-text-color: #fff;
  --dp-secondary-color: #a9a9a9;
  --dp-border-color: theme("colors.zinc.700");
  --dp-menu-border-color: theme("colors.zinc.700");
  --dp-border-color-hover: theme("colors.zinc.700");
  --dp-border-color-focus: theme("colors.blue.500");
  --dp-disabled-color: theme("colors.zinc.950");
  --dp-disabled-color-text: theme("colors.zinc.950");
  --dp-scroll-bar-background: theme("colors.zinc.950");
  --dp-scroll-bar-color: theme("colors.zinc.700");
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: theme("colors.white");
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--dp-hover-color, #484848);
  --dp-range-between-dates-text-color: var(--dp-hover-text-color, #fff);
  --dp-range-between-border-color: var(--dp-hover-color, #fff);
  --dp-overlay-col-padding: 0.25rem;
}

:deep(.dp__input) {
  @apply text-sm;

  transition: none;

  &.dp__input_focus {
    @apply ring-1 ring-blue-500;
  }
}

:deep(.dp__menu) {
  @apply rounded-xl;
}

:deep(.dp__arrow_top) {
  display: none;
}

:deep(.dp--menu-wrapper) {
  @apply rounded-xl;
  box-shadow: 0 4px 16px -2px rgba(0, 0, 0, 0.3);
}

:deep(.dp__overlay) {
  @apply rounded-t-xl overflow-hidden;
}
</style>
