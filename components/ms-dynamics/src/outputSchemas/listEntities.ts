import { outputSchema } from "@prismatic-io/spectral";
export const listEntitiesOutputSchema = outputSchema({
  type: "actionOutput",
  schema: {
    type: "object",
    properties: {
      entities: {
        type: "array",
        items: {
          type: "object",
          properties: {
            name: { type: "string" },
            kind: { type: "string" },
            url: { type: "string" },
          },
        },
      },
      totalCount: { type: "integer" },
      nextLink: { type: "string" },
      hasMore: { type: "boolean" },
    },
  },
});
