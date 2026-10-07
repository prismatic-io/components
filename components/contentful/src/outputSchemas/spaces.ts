import { emptyResultSchema, linkSchema } from "./shared";
const spaceSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    sys: {
      type: "object" as const,
      properties: {
        createdAt: { type: "string", format: "date-time" },
        createdBy: linkSchema,
        id: { type: "string" },
        organization: linkSchema,
        type: { type: "string" },
        updatedAt: { type: "string", format: "date-time" },
        updatedBy: linkSchema,
        version: { type: "number" },
      },
    },
  },
};
export const listSpacesOutputSchema = {
  type: "array" as const,
  items: spaceSchema,
};
export const getSpaceOutputSchema = spaceSchema;
export const createSpaceOutputSchema = spaceSchema;
export const updateSpaceOutputSchema = spaceSchema;
export const deleteSpaceOutputSchema = emptyResultSchema;
