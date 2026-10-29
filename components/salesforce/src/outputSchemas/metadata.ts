import {
  filePropertiesListSchema,
  metadataResultSchema,
} from "./metadataShared";

export const saveMetadataOutputSchema = {
  type: ["array", "object"],
  items: metadataResultSchema,
  properties: metadataResultSchema.properties,
};

export const deleteMetadataOutputSchema = {
  type: ["array", "object"],
  items: metadataResultSchema,
  properties: metadataResultSchema.properties,
};

export const listMetadataOutputSchema = filePropertiesListSchema;
