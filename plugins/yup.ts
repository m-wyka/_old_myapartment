import { setLocale } from "yup";

export default defineNuxtPlugin(async (nuxtApp) => {
  // @ts-ignore
  const { t } = nuxtApp.$i18n;

  setLocale({
    mixed: {
      required: t("form.validation.required"),
    },
    string: {
      email: t("form.validation.email"),
      min: ({ min }) => t("form.validation.min", { value: min }),
      max: ({ max }) => t("form.validation.max", { value: max }),
    },
    number: {
      min: ({ min }) => t("form.validation.min", { value: min }),
      max: ({ max }) => t("form.validation.max", { value: max }),
    },
  });
});
