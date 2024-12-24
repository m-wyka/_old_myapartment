<script lang="ts" setup>
import { object } from "yup";
import { useForm } from "vee-validate";
import { ParkingAvailabilityValues } from "~/enums/admin";
import type { VSelectFieldData } from "~/types/form/vSelectField";
import Btn from "~/components/Btn.vue";
import VInputField from "~/components/form/VInputField.vue";
import VSelectField from "~/components/form/VSelectField.vue";

const { t } = useI18n();
const parkingAvailabilitySelected = ref<VSelectFieldData[]>([]);
const parkingAvailabilityTab = ref<number | null>(null);
const parkingAvailabilityOptions = ref([
  {
    id: 1,
    name: t(
      "admin.buildingsManagement.form.parkingAvailabilityData.underground"
    ),
    value: ParkingAvailabilityValues.Underground,
  },
  {
    id: 2,
    name: t("admin.buildingsManagement.form.parkingAvailabilityData.outside"),
    value: ParkingAvailabilityValues.Outside,
  },
  {
    id: 3,
    name: t("misc.none"),
    value: ParkingAvailabilityValues.None,
  },
]);

const options = ref([
  { id: 1, name: t("misc.yes"), value: true },
  { id: 2, name: t("misc.no"), value: false },
]);

const { basicStringSchema, arrayRequiredSchema, parkingFieldSchema } =
  validationSchemas();

const { handleSubmit } = useForm({
  validationSchema: object({
    parkingAvailability: arrayRequiredSchema,
    recreationArea: basicStringSchema,
    accessibilityForPeopleWithDisabilities: arrayRequiredSchema,
    numberOfParkingLots_1: parkingFieldSchema("parkingAvailability", 1),
    numberOfParkingSpaces_1: parkingFieldSchema("parkingAvailability", 1),
    numberOfParkingLots_2: parkingFieldSchema("parkingAvailability", 2),
    numberOfParkingSpaces_2: parkingFieldSchema("parkingAvailability", 2),
  }),
});

const onSubmit = handleSubmit(async (values) => {
  console.log(values);
});

const handleParkingAvailabilityUpdate = (value: VSelectFieldData[] | null) => {
  if (!value) {
    parkingAvailabilitySelected.value = [];
    return;
  }

  const findSomeNone = value.some(
    (item) => item.value === ParkingAvailabilityValues.None
  );

  if (findSomeNone) {
    parkingAvailabilitySelected.value = [];
    return;
  }

  if (!value.length) {
    parkingAvailabilitySelected.value = [];
    return;
  }

  parkingAvailabilitySelected.value = value;
  parkingAvailabilityTab.value = value[0].id;
};

const handleParkingAvailabilityTabSelect = (value: number) => {
  if (!parkingAvailabilityTab.value) {
    return;
  }

  parkingAvailabilityTab.value = value;
};

const handleParkingAvailabilityWthoutNone = computed(() =>
  parkingAvailabilitySelected.value.filter(
    (item) => item.value !== ParkingAvailabilityValues.None
  )
);
</script>

<template>
  <form @submit.prevent="onSubmit">
    <div class="grid gap-4 mb-8">
      <div class="grid gap-4 content-start">
        <VInputField
          name="recreationArea"
          :label="$t('admin.buildingsManagement.form.recreationArea')"
        />

        <VSelectField
          name="accessibilityForPeopleWithDisabilities"
          :options="options"
          :label="
            $t(
              'admin.buildingsManagement.form.accessibilityForPeopleWithDisabilities'
            )
          "
        />
      </div>

      <div class="grid gap-4">
        <VSelectField
          name="parkingAvailability"
          :options="parkingAvailabilityOptions"
          :label="$t('admin.buildingsManagement.form.parkingAvailability')"
          multiple
          @update="handleParkingAvailabilityUpdate"
        />

        <template
          v-if="
            parkingAvailabilitySelected.length &&
            handleParkingAvailabilityWthoutNone.length
          "
        >
          <ul
            class="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200 dark:border-zinc-700 dark:text-gray-400"
          >
            <li
              v-for="item in handleParkingAvailabilityWthoutNone"
              :key="item.id"
              class="me-2"
            >
              <button
                class="inline-block p-4 rounded-t-lg hover:bg-blue-600/60 text-blue-600 dark:text-white"
                :class="{
                  'bg-blue-600 hover:bg-blue-600 text-white':
                    parkingAvailabilityTab === item.id,
                }"
                @click.prevent.stop="
                  handleParkingAvailabilityTabSelect(item.id)
                "
              >
                {{ item.name }}
              </button>
            </li>
          </ul>

          <div
            v-show="parkingAvailabilityTab === 1"
            class="flex flex-col gap-4"
          >
            <VInputField
              type="number"
              name="numberOfParkingLots_1"
              :label="$t('admin.buildingsManagement.form.numberOfParkingLots')"
            />

            <VInputField
              type="number"
              name="numberOfParkingSpaces_1"
              :label="
                $t('admin.buildingsManagement.form.numberOfParkingSpaces')
              "
            />
          </div>

          <div
            v-show="parkingAvailabilityTab === 2"
            class="flex flex-col gap-4"
          >
            <VInputField
              type="number"
              name="numberOfParkingLots_2"
              :label="$t('admin.buildingsManagement.form.numberOfParkingLots')"
            />

            <VInputField
              type="number"
              name="numberOfParkingSpaces_2"
              :label="
                $t('admin.buildingsManagement.form.numberOfParkingSpaces')
              "
            />
          </div>
        </template>
      </div>
    </div>

    <Btn type="submit">{{ $t("form.save") }}</Btn>
  </form>
</template>

<style></style>
