import { firestoreReferenceProperties } from "./shared";

export const listCollectionsOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: { ...firestoreReferenceProperties },
    required: ["id", "path"],
  },
};
