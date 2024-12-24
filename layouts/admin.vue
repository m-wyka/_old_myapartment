<script lang="ts" setup>
import { useBreakpoints } from "~/composables/useBreakpoints";
import Navbar from "~/components/admin/navbar/Navbar.vue";
import Sidebar from "~/components/admin/sidebar/Sidebar.vue";

const { smAndDown } = useBreakpoints();
const navbar = ref<HTMLElement | null>(null);
const sidebar = ref<HTMLElement | null>(null);
const sidebarControl = ref(false);
provide("sidebarControl", sidebarControl);

onClickOutside(
  sidebar,
  () => {
    if (sidebarControl.value) {
      sidebarControl.value = false;
    }
  },
  {
    ignore: [navbar],
  }
);
</script>

<template>
  <div>
    <Navbar ref="navbar" v-if="smAndDown" />
    <Sidebar ref="sidebar" />

    <main class="bg-xd wrapper flex">
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

@media only screen and (max-width: theme("screens.sm")) {
  .wrapper {
    margin-left: 0;
  }
}
</style>
