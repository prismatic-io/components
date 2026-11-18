import { odataCollectionSchema } from "./common";

const deviceConfigurationSchema = {
  type: "object" as const,
  properties: {
    "@odata.type": { type: "string" },
    id: { type: "string" },
    lastModifiedDateTime: { type: ["string", "null"], format: "date-time" },
    createdDateTime: { type: ["string", "null"], format: "date-time" },
    description: { type: ["string", "null"] },
    displayName: { type: ["string", "null"] },
    version: { type: ["integer", "null"] },
  },
  required: ["id"],
  additionalProperties: true,
};

export const getDeviceConfigurationOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": { type: "string" },
    ...deviceConfigurationSchema.properties,
  },
  required: ["id"],
  additionalProperties: true,
};

export const listDeviceConfigurationsOutputSchema = {
  type: "object" as const,
  properties: {
    ...odataCollectionSchema.properties,
    value: { type: "array", items: deviceConfigurationSchema },
  },
  required: ["value"],
};
