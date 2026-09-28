import { collectionLinksSchema, resourceLinksSchema } from "./shared";
const imageResourceObject = {
  type: "object" as const,
  properties: {
    type: { type: "string" },
    id: { type: "string" },
    attributes: {
      type: "object" as const,
      properties: {
        name: { type: "string" },
        imageUrl: { type: "string" },
        format: { type: "string" },
        size: { type: "number" },
        hidden: { type: "boolean" },
        updatedAt: { type: "string", format: "date-time" },
      },
    },
    links: resourceLinksSchema,
  },
  required: ["type", "id", "attributes", "links"],
};
export const getImageOutputSchema = {
  type: "object" as const,
  properties: {
    data: imageResourceObject,
  },
  required: ["data"],
};
export const listImagesOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "array" as const,
      items: imageResourceObject,
    },
    links: collectionLinksSchema,
  },
  required: ["data", "links"],
};
export const updateImageOutputSchema = getImageOutputSchema;
export const uploadImageOutputSchema = getImageOutputSchema;
