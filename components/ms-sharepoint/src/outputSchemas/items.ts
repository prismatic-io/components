import { driveItemSchema } from "./common";

export const listItemsOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    value: { type: "array", items: driveItemSchema },
    "@odata.nextLink": { type: "string" },
  },
  required: ["value"],
};

export const checkItemExistsOutputSchema = {
  type: "object" as const,
  properties: {
    exists: { type: "boolean" },
    message: { type: "string" },
    item: driveItemSchema,
  },
  required: ["exists", "message"],
};

export const searchItemsOutputSchema = {
  type: "object" as const,
  additionalProperties: { type: "array", items: driveItemSchema },
};
