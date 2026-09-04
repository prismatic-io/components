import { outputSchema } from "@prismatic-io/spectral";
export const getEntitiesMetaDataOutputSchema = outputSchema({
  type: "actionOutput",
  schema: {
    type: "array",
    items: {
      type: "object",
      properties: {
        object: {
          type: "object",
          properties: {
            key: { type: "string" },
            label: { type: "string" },
          },
        },
        defaultSelected: { type: "boolean" },
        fields: {
          type: "array",
          items: {
            type: "object",
            properties: {
              key: { type: "string" },
              label: { type: "string" },
            },
          },
        },
      },
    },
  },
});
