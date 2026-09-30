import { versionSchema } from "./common";
export const contentPropertySchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    key: { type: "string" },
    value: {},
    version: versionSchema,
  },
  required: ["id", "key", "version"],
};
export const listContentPropertiesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: contentPropertySchema },
    _links: {
      type: "object" as const,
      properties: {
        next: { type: "string" },
        base: { type: "string" },
      },
    },
  },
  required: ["results"],
};
