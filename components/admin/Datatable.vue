<script lang="ts" setup>
const props = defineProps<{
  data: any;
  heading?: any;
  showId?: boolean;
  condensed?: boolean;
}>();

const slots = useSlots();

const handleHeaderDependingOnId = computed(() => {
  const keys = Object.keys(props.data[0]);

  if (props.showId) {
    return keys;
  }

  return keys.filter((item) => item !== "id");
});

const visibleData = computed(() =>
  props.data.map((row) => {
    if (!props.showId) {
      const { id, ...rest } = row;
      return rest;
    }

    return row;
  })
);

const conden = computed(() => (props.condensed ? "px-4 py-2" : "p-4"));
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left">
      <thead
        class="border-b border-zinc-200 dark:border-zinc-800 text-gray-700 uppercase dark:text-zinc-400 font-medium"
      >
        <tr>
          <template v-if="heading">
            <th
              v-for="(item, index) in heading"
              :key="index"
              scope="col"
              class="first:pl-1 last:pr-1"
              :class="conden"
            >
              {{ $t(`datatable.${item}`) }}
            </th>
          </template>

          <template v-else>
            <th
              v-for="(item, index) in handleHeaderDependingOnId"
              :key="index"
              scope="col"
              class="first:pl-1 last:pr-1"
              :class="conden"
            >
              {{ $t(`datatable.${item}`) }}
            </th>
          </template>

          <th v-if="slots.actions"></th>
        </tr>
      </thead>

      <tbody>
        <tr
          v-for="(row, index) in data"
          :key="row.id || index"
          class="border-b hover:bg-zinc-100 dark:hover:bg-zinc-800/30 border-zinc-200 dark:border-zinc-800"
        >
          <td
            v-for="(cell, key) in visibleData[index]"
            class="first:pl-1 whitespace-nowrap text-gray-900 dark:text-white"
            :class="[conden, { 'last:pr-1': slots.actions }]"
          >
            {{ cell }}
          </td>

          <td v-if="slots.actions" class="last:pr-1" :class="conden">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
