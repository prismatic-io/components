import { pageSchema } from "./shared";
const locationSchema = {
  type: "object" as const,
  properties: {
    entity_id: {
      type: "string",
      format: "uuid",
    },
    id: {
      type: "string",
      format: "uuid",
    },
    name: {
      type: "string",
    },
  },
  required: ["entity_id", "id", "name"],
};
export const createLocationOutputSchema = locationSchema;
export const getLocationOutputSchema = locationSchema;
export const listLocationsOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array",
      items: locationSchema,
    },
    page: pageSchema,
  },
  required: ["data", "page"],
};
export const updateLocationOutputSchema = locationSchema;
