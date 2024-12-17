<script lang="ts" setup>
import Sidebar from "~/components/admin/sidebar/Sidebar.vue";
</script>

<template>
  <div>
    <Sidebar />

    <main class="wrapper flex">
      <div class="flex-1 p-4">
        <slot />
      </div>
    </main>
  </div>
</template>

<style scoped>
.wrapper {
  margin-left: var(--sidebar-width);
}
</style>
