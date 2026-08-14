import { metaSchema } from "./common";
export const groupSchema = {
  type: "object" as const,
  properties: {
    deviceCount: { type: "integer" },
    id: { type: "string" },
    insertedAt: { type: "string", format: "date-time" },
    name: { type: "string" },
    source: { type: "string", enum: ["pdq", "custom"] },
    type: { type: "string", enum: ["dynamic", "static"] },
    updatedAt: { type: "string", format: "date-time" },
  },
  required: ["id"],
};
export const listGroupsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: groupSchema },
    meta: metaSchema,
  },
};
