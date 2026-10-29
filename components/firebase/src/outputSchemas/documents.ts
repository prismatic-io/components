import { firestoreReferenceProperties } from "./shared";

export const createDocumentOutputSchema = {
  type: "object" as const,
  properties: { ...firestoreReferenceProperties },
  required: ["id", "path"],
};

export const listDocumentsOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      ...firestoreReferenceProperties,
      data: { type: "object", additionalProperties: true },
    },
    required: ["id", "path", "data"],
  },
};
