import { storeToRefs } from "pinia";
import { useAuthStore } from "~/store/auth";

export default defineNuxtRouteMiddleware((to) => {
  const authStore = useAuthStore();
  const { isAuth } = storeToRefs(authStore);

  if (to.path.startsWith("/admin")) {
    useHead({
      bodyAttrs: {
        class: "bg-white dark:bg-gray-900 dark:text-white",
      },
    });
  }

  if (isAuth.value) {
    if (!to.path.startsWith("/admin")) {
      return navigateTo("/admin");
    }
    return;
  }

  if (!isAuth.value && to.path !== "/login") {
    return navigateTo("/login");
  }
});
