import { emptyResultSchema, linkSchema } from "./shared";
const environmentSchema = {
  type: "object" as const,
  properties: {
    name: { type: "string" },
    sys: {
      type: "object" as const,
      properties: {
        createdAt: { type: "string", format: "date-time" },
        createdBy: linkSchema,
        id: { type: "string" },
        space: linkSchema,
        status: linkSchema,
        type: { type: "string" },
        updatedAt: { type: "string", format: "date-time" },
        updatedBy: linkSchema,
        version: { type: "number" },
      },
    },
  },
};
export const listEnvironmentsOutputSchema = {
  type: "array" as const,
  items: environmentSchema,
};
export const getEnvironmentOutputSchema = environmentSchema;
export const createEnvironmentOutputSchema = environmentSchema;
export const updateEnvironmentOutputSchema = environmentSchema;
export const deleteEnvironmentOutputSchema = emptyResultSchema;
