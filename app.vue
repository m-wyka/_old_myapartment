<script lang="ts" setup>
import { useFlowbite } from "~/composables/useFlowbite";

onMounted(() => {
  useFlowbite(({ initFlowbite }) => {
    initFlowbite();
  });
});
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<style></style>
