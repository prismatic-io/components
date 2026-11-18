import { userSchema } from "./users";

export const listChangesOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    "@odata.nextLink": { type: "string" },
    "@odata.deltaLink": { type: "string" },
    value: {
      type: "array",
      items: {
        type: "object" as const,
        properties: {
          ...userSchema.properties,
          "@removed": {
            type: "object",
            properties: {
              reason: { type: "string", enum: ["changed", "deleted"] },
            },
          },
        },
        required: [],
        additionalProperties: true,
      },
    },
  },
  required: ["value"],
};
