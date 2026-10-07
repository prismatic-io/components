import {
  draftSysProperties,
  emptyResultSchema,
  linkSchema,
  publishSysProperties,
  tagsMetadataSchema,
} from "./shared";
const localizedTextSchema = {
  type: "object" as const,
  properties: {
    "en-US": { type: "string" },
  },
  required: [],
  additionalProperties: true,
};
const entrySchema = {
  type: "object" as const,
  properties: {
    fields: {
      type: "object" as const,
      properties: {
        body: localizedTextSchema,
        title: localizedTextSchema,
      },
      required: [],
      additionalProperties: true,
    },
    metadata: tagsMetadataSchema,
    sys: {
      type: "object" as const,
      properties: {
        ...draftSysProperties,
        contentType: linkSchema,
        ...publishSysProperties,
      },
    },
  },
};
export const archiveEntryOutputSchema = entrySchema;
export const createEntryOutputSchema = entrySchema;
export const getEntryOutputSchema = entrySchema;
export const patchEntryOutputSchema = entrySchema;
export const publishEntryOutputSchema = entrySchema;
export const putEntryOutputSchema = entrySchema;
export const unarchiveEntryOutputSchema = entrySchema;
export const unpublishEntryOutputSchema = entrySchema;
export const listEntriesOutputSchema = {
  type: "array" as const,
  items: entrySchema,
};
export const listPublishedEntriesOutputSchema = listEntriesOutputSchema;
export const deleteEntryOutputSchema = emptyResultSchema;
