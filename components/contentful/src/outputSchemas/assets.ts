import {
  draftSysProperties,
  emptyResultSchema,
  publishSysProperties,
  tagsMetadataSchema,
} from "./shared";
const assetSchema = {
  type: "object" as const,
  properties: {
    fields: {
      type: "object" as const,
      properties: {
        file: {
          type: "object" as const,
          properties: {
            "en-US": {
              type: "object" as const,
              properties: {
                contentType: { type: "string" },
                fileName: { type: "string" },
                upload: { type: "string" },
              },
            },
          },
        },
        title: {
          type: "object" as const,
          properties: {
            "en-US": { type: "string" },
          },
        },
      },
    },
    metadata: tagsMetadataSchema,
    sys: {
      type: "object" as const,
      properties: {
        ...draftSysProperties,
        ...publishSysProperties,
      },
    },
  },
};
export const listAssetsOutputSchema = {
  type: "array" as const,
  items: assetSchema,
};
export const createAssetOutputSchema = assetSchema;
export const updateAssetOutputSchema = assetSchema;
export const getAssetOutputSchema = assetSchema;
export const publishAnAssetOutputSchema = assetSchema;
export const unpublishAnAssetOutputSchema = assetSchema;
export const deleteAssetOutputSchema = emptyResultSchema;
export const processAssetOutputSchema = emptyResultSchema;
