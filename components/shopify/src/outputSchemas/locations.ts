import { countSchema, pageInfoSchema } from "./shared";
const locationSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" as const },
    name: { type: "string" as const },
    address: {
      type: "object" as const,
      properties: {
        address1: { type: ["string", "null"] },
        address2: { type: ["string", "null"] },
        city: { type: ["string", "null"] },
        zip: { type: ["string", "null"] },
        province: { type: ["string", "null"] },
        country: { type: ["string", "null"] },
        phone: { type: ["string", "null"] },
        countryCode: { type: ["string", "null"] },
        provinceCode: { type: ["string", "null"] },
      },
    },
    createdAt: { type: "string" as const },
    updatedAt: { type: "string" as const },
    isActive: { type: "boolean" as const },
  },
};
export const countLocationsGqlOutputSchema = countSchema;
export const getLocationsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    location: locationSchema,
  },
};
export const listLocationsGqlOutputSchema = {
  type: "object" as const,
  properties: {
    locations: { type: "array" as const, items: locationSchema },
    pageInfo: pageInfoSchema,
  },
};
