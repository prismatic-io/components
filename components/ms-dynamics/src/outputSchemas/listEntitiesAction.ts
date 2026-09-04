import { outputSchema } from "@prismatic-io/spectral";
export const listEntitiesActionOutputSchema = outputSchema({
  type: "actionOutput",
  schema: {
    type: "object",
    properties: {
      entities: {
        type: "array",
        items: {
          type: "object",
          properties: {
            entityId: { type: "string" },
            logicalName: { type: "string" },
            schemaName: { type: "string" },
            displayName: { type: "string" },
            pluralDisplayName: { type: "string" },
            isCustomEntity: { type: "boolean" },
            isChildEntity: { type: "boolean" },
          },
        },
      },
      totalCount: { type: "integer" },
      customEntitiesCount: { type: "integer" },
      systemEntitiesCount: { type: "integer" },
    },
  },
});
