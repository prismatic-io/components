import {
  fileFullSchema,
  fileVersionMiniSchema,
  folderFullSchema,
  nullableSharedLinkSchema,
} from "./common";
const fileSharedLinkProjectionSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["file"] },
    etag: { type: ["string", "null"] },
    sequence_id: { type: ["string", "null"] },
    name: { type: "string" },
    sha1: { type: "string" },
    file_version: fileVersionMiniSchema,
    shared_link: nullableSharedLinkSchema,
  },
  required: ["id", "type", "name", "shared_link"],
};
const folderSharedLinkProjectionSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    type: { type: "string", enum: ["folder"] },
    etag: { type: ["string", "null"] },
    sequence_id: { type: ["string", "null"] },
    name: { type: "string" },
    shared_link: nullableSharedLinkSchema,
  },
  required: ["id", "type", "name", "shared_link"],
};
export const findFileForSharedLinkOutputSchema = {
  type: "object" as const,
  properties: {
    ...fileFullSchema.properties,
    type: { type: "string" },
  },
  required: ["id", "type", "name"],
  additionalProperties: true,
};
export const findFolderForSharedLinkOutputSchema = {
  type: "object" as const,
  properties: {
    ...folderFullSchema.properties,
    type: { type: "string" },
  },
  required: ["id", "type", "name"],
  additionalProperties: true,
};
export const addSharedLinkToFileOutputSchema = fileSharedLinkProjectionSchema;
export const updateSharedLinkToFileOutputSchema =
  fileSharedLinkProjectionSchema;
export const removeSharedLinkFromFileOutputSchema =
  fileSharedLinkProjectionSchema;
export const addSharedLinkToFolderOutputSchema =
  folderSharedLinkProjectionSchema;
export const updateSharedLinkOnFolderOutputSchema =
  folderSharedLinkProjectionSchema;
export const removeSharedLinkFromFolderOutputSchema =
  folderSharedLinkProjectionSchema;
const getSharedLinkResultSchema = {
  type: "object" as const,
  properties: {
    sharedLink: { type: "string", format: "uri" },
  },
  required: ["sharedLink"],
};
export const getSharedLinkForFileOutputSchema = getSharedLinkResultSchema;
export const getSharedLinkForFolderOutputSchema = getSharedLinkResultSchema;
