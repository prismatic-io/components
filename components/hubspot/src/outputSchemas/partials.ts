import { crmObjectSchema, searchResponseSchema } from "./shared";
const crmObjectOrArrayPartialSchema = {
  type: ["object", "array"] as string[],
  properties: crmObjectSchema.properties,
  items: crmObjectSchema,
  required: [] as string[],
  additionalProperties: true,
};
export const getContactOutputSchema = {
  type: "object" as const,
  properties: {
    ...crmObjectSchema.properties,
    total: searchResponseSchema.properties.total,
    results: searchResponseSchema.properties.results,
    paging: searchResponseSchema.properties.paging,
  },
  required: [] as string[],
  additionalProperties: true,
};
export const getCompanyOutputSchema = { ...crmObjectOrArrayPartialSchema };
export const getDealByIdOutputSchema = { ...crmObjectOrArrayPartialSchema };
export const getProductOutputSchema = { ...crmObjectOrArrayPartialSchema };
export const getLineItemOutputSchema = { ...crmObjectOrArrayPartialSchema };
