import { statusChangeSchema } from "./shared";
export const listStatusChangesOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: statusChangeSchema },
    hasNextPage: { type: "boolean" },
    cursor: { type: "string" },
  },
  required: ["items", "hasNextPage", "cursor"],
  additionalProperties: true,
};
