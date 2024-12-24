<script lang="ts" setup>
const props = defineProps<{
  data: any;
  showId?: boolean;
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
</script>

<template>
  <div class="relative overflow-x-auto">
    <table class="w-full text-sm text-left">
      <thead
        class="border-b border-zinc-200 dark:border-zinc-800 text-gray-700 uppercase dark:text-zinc-400 font-medium"
      >
        <tr>
          <th
            v-for="(item, index) in handleHeaderDependingOnId"
            :key="index"
            scope="col"
            class="p-4 first:pl-1 last:pr-1"
          >
            {{ $t(`datatable.${item}`) }}
          </th>

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
            class="px-4 py-2 first:pl-1 whitespace-nowrap text-gray-900 dark:text-white"
            :class="{ 'last:pr-1': slots.actions }"
          >
            {{ cell }}
          </td>

          <td v-if="slots.actions" class="px-4 py-2 last:pr-1">
            <slot name="actions" :row="row" />
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style></style>
