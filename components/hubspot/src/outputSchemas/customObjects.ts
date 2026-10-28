import { propertySchema } from "./properties";
const objectTypeDefinitionProperties = {
  allowsSensitiveProperties: { type: "boolean" },
  archived: { type: "boolean" },
  createdAt: { type: "string", format: "date-time" },
  description: { type: "string" },
  fullyQualifiedName: { type: "string" },
  id: { type: "string" },
  labels: {
    type: "object" as const,
    properties: {
      plural: { type: "string" },
      singular: { type: "string" },
    },
  },
  name: { type: "string" },
  objectTypeId: { type: "string" },
  primaryDisplayProperty: { type: "string" },
  requiredProperties: { type: "array" as const, items: { type: "string" } },
  searchableProperties: { type: "array" as const, items: { type: "string" } },
  secondaryDisplayProperties: {
    type: "array" as const,
    items: { type: "string" },
  },
  updatedAt: { type: "string", format: "date-time" },
};
const objectTypeDefinitionRequired = [
  "allowsSensitiveProperties",
  "archived",
  "fullyQualifiedName",
  "id",
  "labels",
  "name",
  "objectTypeId",
  "requiredProperties",
  "searchableProperties",
  "secondaryDisplayProperties",
];
export const customObjectSchema = {
  type: "object" as const,
  properties: {
    ...objectTypeDefinitionProperties,
    associations: {
      type: "array" as const,
      items: {
        type: "object" as const,
        properties: {
          createdAt: { type: "string", format: "date-time" },
          fromObjectTypeId: { type: "string" },
          id: { type: "string" },
          name: { type: "string" },
          toObjectTypeId: { type: "string" },
          updatedAt: { type: "string", format: "date-time" },
        },
        required: ["fromObjectTypeId", "id", "toObjectTypeId"],
      },
    },
    createdByUserId: { type: "integer" },
    properties: { type: "array" as const, items: propertySchema },
    updatedByUserId: { type: "integer" },
  },
  required: [...objectTypeDefinitionRequired, "associations", "properties"],
};
export const listCustomObjectsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array" as const, items: customObjectSchema },
  },
  required: ["results"],
};
export const updateCustomObjectOutputSchema = {
  type: "object" as const,
  properties: {
    ...objectTypeDefinitionProperties,
    portalId: { type: "integer" },
  },
  required: objectTypeDefinitionRequired,
};
