import { outputSchema } from "@prismatic-io/spectral";
export const listAttributesActionOutputSchema = outputSchema({
  type: "actionOutput",
  schema: {
    type: "object",
    properties: {
      entityId: { type: "string" },
      attributes: {
        type: "array",
        items: {
          type: "object",
          properties: {
            logicalName: { type: "string" },
            displayName: { type: "string" },
            attributeType: { type: "string" },
            description: { type: "string" },
            isCustomAttribute: { type: "boolean" },
            isPrimaryId: { type: "boolean" },
            isPrimaryName: { type: "boolean" },
            requiredLevel: { type: "string" },
            isValidForRead: { type: "boolean" },
            isValidForCreate: { type: "boolean" },
            isValidForUpdate: { type: "boolean" },
          },
        },
      },
      totalCount: { type: "integer" },
      customAttributesCount: { type: "integer" },
      systemAttributesCount: { type: "integer" },
      attributesByType: { type: "object" },
      primaryIdAttribute: { type: "string" },
      primaryNameAttribute: { type: "string" },
    },
  },
});
