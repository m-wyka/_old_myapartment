<script lang="ts" setup>
import Sidebar from "~/components/admin/sidebar/Sidebar.vue";
</script>

<template>
  <Sidebar />

  <main class="wrapper flex h-screen">
    <div class="flex-1 p-4">
      <slot />
    </div>
  </main>
</template>

<style scoped>
.wrapper {
  margin-left: var(--sidebar-width);
}
</style>
