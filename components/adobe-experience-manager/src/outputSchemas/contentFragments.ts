import {
  contentFragmentModelSchema,
  contentFragmentSchema,
  contentFragmentVariationSchema,
} from "./shared";

export const contentFragmentListItemSchema = {
  ...contentFragmentSchema,
  properties: {
    ...contentFragmentSchema.properties,
    etag: { type: "string" },
    tagsCount: { type: "integer" },
  },
  required: [],
  additionalProperties: true,
};

export const listContentFragmentsOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: contentFragmentListItemSchema },
    cursor: { type: "string", description: "Present when more pages remain." },
  },
  required: ["items"],
};

export const searchContentFragmentsOutputSchema = listContentFragmentsOutputSchema;

export const getContentFragmentOutputSchema = contentFragmentSchema;

export const listContentFragmentVariationsOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: contentFragmentVariationSchema },
    cursor: { type: "string" },
  },
  required: ["items"],
};

export const listContentFragmentModelsOutputSchema = {
  type: "object" as const,
  properties: {
    items: { type: "array", items: contentFragmentModelSchema },
    cursor: { type: "string" },
  },
  required: ["items"],
};
