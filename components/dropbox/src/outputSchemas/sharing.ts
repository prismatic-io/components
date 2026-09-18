import {
  accessLevelSchema,
  enumTagSchema,
  folderPolicySchema,
  permissionSchema,
  sharedContentLinkMetadataSchema,
  sharedFolderMetadataSchema,
  teamInfoSchema,
  withDropboxEnvelope,
} from "./shared";
export const getSharedMetadataForFileOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: {
    access_type: accessLevelSchema,
    id: { type: "string" },
    expected_link_metadata: sharedContentLinkMetadataSchema,
    link_metadata: sharedContentLinkMetadataSchema,
    name: { type: "string" },
    owner_display_names: { type: "array", items: { type: "string" } },
    owner_team: teamInfoSchema,
    parent_shared_folder_id: { type: "string" },
    path_display: { type: "string" },
    path_lower: { type: "string" },
    permissions: { type: "array", items: permissionSchema },
    policy: folderPolicySchema,
    preview_url: { type: "string" },
    time_invited: { type: "string", format: "date-time" },
  },
  required: ["id", "name", "policy", "preview_url"],
});
export const getSharedMetadataForFolderOutputSchema = withDropboxEnvelope(
  sharedFolderMetadataSchema,
);
export const listSharingFolderOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: {
    entries: { type: "array", items: sharedFolderMetadataSchema },
    cursor: { type: "string" },
  },
  required: ["entries"],
});
export const shareFolderOutputSchema = withDropboxEnvelope({
  oneOf: [
    {
      type: "object",
      properties: {
        ".tag": { type: "string", enum: ["async_job_id"] },
        async_job_id: { type: "string" },
      },
      required: [".tag", "async_job_id"],
    },
    {
      ...sharedFolderMetadataSchema,
      properties: {
        ...sharedFolderMetadataSchema.properties,
        ".tag": { type: "string", enum: ["complete"] },
      },
      required: [".tag", ...sharedFolderMetadataSchema.required],
    },
  ],
});
export const unshareFolderOutputSchema = withDropboxEnvelope({
  oneOf: [
    {
      type: "object",
      properties: {
        ".tag": { type: "string", enum: ["async_job_id"] },
        async_job_id: { type: "string" },
      },
      required: [".tag", "async_job_id"],
    },
    enumTagSchema(["complete"]),
  ],
});
