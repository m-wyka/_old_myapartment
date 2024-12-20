<script lang="ts" setup>
const sidebarControl = inject<Ref<boolean>>("sidebarControl");

const toggleSidebar = () => {
  if (!sidebarControl) {
    return;
  }

  sidebarControl.value = !sidebarControl.value;
};
</script>

<template>
  <nav class="flex items-center justify-between px-4 py-2">
    <Logo />

    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      data-drawer-backdrop="false"
      aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      @click="toggleSidebar"
    >
      <span class="sr-only">Open sidebar</span>
      <svg
        class="w-6 h-6"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>
  </nav>
</template>
