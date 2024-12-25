<script lang="ts" setup>
import Logo from "~/components/Logo.vue";
import SidebarMenu from "./SidebarMenu.vue";
import type { MenuItem } from "~/types/menu";

const { t } = useI18n();
const sidebarControl = inject<Ref<boolean>>("sidebarControl");

const signOut = () => {
  console.log("Sign out");
};

const menu = ref<MenuItem[]>([
  {
    id: 1,
    name: t("admin.menu.buildingsManagement"),
    to: "/admin/management/buildings",
    icon: "tabler:building-cog",
  },
  {
    id: 2,
    name: t("admin.menu.floorManagement"),
    to: "/admin/management/floors",
    icon: "ph:stairs-fill",
  },
  {
    id: 3,
    name: t("admin.menu.apartmentManagement"),
    to: "/admin/management/apartments",
    icon: "material-symbols:add-home-outline-rounded",
  },
]);

const bottomMenu = ref<MenuItem[]>([
  {
    id: 1,
    name: t("auth.signOut"),
    to: null,
    icon: "ic:round-logout",
    action: signOut,
  },
]);
</script>

<template>
  <aside
    id="default-sidebar"
    class="sidebar fixed top-0 left-0 z-40 h-screen transition-transform -translate-x-full sm:translate-x-0"
    :class="{ 'translate-x-0': sidebarControl }"
    aria-label="Sidebar"
  >
    <div
      class="flex flex-col justify-between h-full px-4 py-4 overflow-y-auto bg-zinc-200 dark:bg-zinc-950"
    >
      <div>
        <Logo />
        <SidebarMenu :data="menu" />
      </div>

      <SidebarMenu :data="bottomMenu" />
    </div>
  </aside>
</template>

<style>
.sidebar {
  width: var(--sidebar-width);
}
</style>
