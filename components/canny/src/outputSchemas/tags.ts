import { tagSchema } from "./shared";
export const listTagsOutputSchema = {
  type: "object" as const,
  properties: {
    tags: { type: "array", items: tagSchema },
    hasMore: { type: "boolean" },
  },
  required: ["tags", "hasMore"],
  additionalProperties: true,
};
export const retrieveTagOutputSchema = tagSchema;
export const createTagOutputSchema = tagSchema;
