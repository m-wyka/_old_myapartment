import { object, string, number, array } from "yup";
import { phoneRegex } from "~/constants/regex";
import type { VSelectFieldData } from "~/types/form/vSelectField";

export const validationSchemas = () => {
  const { t } = useI18n();

  const basicStringSchema = string().required().min(3).max(255);
  const emailSchema = string().email();
  const phoneSchema = string().matches(phoneRegex, t("form.validation.phone"));
  const numberRequired = number().required();

  const numberRequiredNullableSchema = number()
    .transform((value) => (Number.isNaN(value) ? null : value))
    .nullable()
    .required();

  const arrayRequiredSchema = array()
    .of(
      object({
        id: number().required(),
      })
    )
    .required();

  const parkingFieldSchema = (key: string, id: number) => {
    return string().when(key, {
      is: (parkingAvailability: VSelectFieldData[]) =>
        Array.isArray(parkingAvailability) &&
        parkingAvailability.some((item) => item && item.id === id),
      then: (schema) => schema.required(),
      otherwise: (schema) => schema.notRequired(),
    });
  };

  return {
    basicStringSchema,
    emailSchema,
    phoneSchema,
    numberRequired,
    numberRequiredNullableSchema,
    arrayRequiredSchema,
    parkingFieldSchema,
  };
};
