import { searchV2ResultSchema } from "./files";
import {
  folderMetadataSchema,
  metadataSchema,
  withDropboxEnvelope,
} from "./shared";
export const listFolderResultSchema = {
  type: "object" as const,
  properties: {
    entries: { type: "array", items: metadataSchema },
    cursor: { type: "string" },
    has_more: { type: "boolean" },
  },
  required: ["entries", "cursor", "has_more"],
};
export const createFolderOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: { metadata: folderMetadataSchema },
  required: ["metadata"],
});
export const listFolderOutputSchema = withDropboxEnvelope(
  listFolderResultSchema,
);
export const searchFoldersOutputSchema =
  withDropboxEnvelope(searchV2ResultSchema);
export const listChangesOutputSchema = listFolderResultSchema;
