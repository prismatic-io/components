import { entrySchema, idOnlySchema } from "./shared";
export const listEntriesOutputSchema = {
  type: "object" as const,
  properties: {
    entries: { type: "array", items: entrySchema },
    hasMore: { type: "boolean" },
  },
  required: ["entries", "hasMore"],
  additionalProperties: true,
};
export const createEntryOutputSchema = idOnlySchema;
