import {
  enumTagSchema,
  fileMetadataSchema,
  metadataSchema,
  openTaggedUnionSchema,
  withDropboxEnvelope,
} from "./shared";
export const lockFileBatchResultSchema = {
  type: "object" as const,
  properties: {
    entries: {
      type: "array",
      items: {
        oneOf: [
          {
            type: "object",
            properties: {
              ".tag": { type: "string", enum: ["success"] },
              metadata: metadataSchema,
              lock: {
                type: "object",
                properties: {
                  content: {
                    oneOf: [
                      enumTagSchema(["unlocked"]),
                      {
                        type: "object",
                        properties: {
                          ".tag": { type: "string", enum: ["single_user"] },
                          created: { type: "string", format: "date-time" },
                          lock_holder_account_id: { type: "string" },
                          lock_holder_team_id: { type: "string" },
                        },
                        required: [".tag", "created", "lock_holder_account_id"],
                      },
                      enumTagSchema(["other"]),
                    ],
                  },
                },
                required: ["content"],
              },
            },
            required: [".tag", "metadata", "lock"],
          },
          {
            type: "object",
            properties: {
              ".tag": { type: "string", enum: ["failure"] },
              failure: {
                type: "object",
                properties: {
                  ".tag": {
                    type: "string",
                    enum: [
                      "path_lookup",
                      "too_many_write_operations",
                      "too_many_files",
                      "no_write_permission",
                      "cannot_be_locked",
                      "file_not_shared",
                      "lock_conflict",
                      "internal_error",
                      "other",
                    ],
                  },
                },
                required: [".tag"],
                additionalProperties: true,
              },
            },
            required: [".tag", "failure"],
          },
        ],
      },
    },
  },
  required: ["entries"],
};
export const saveUrlJobStatusSchema = {
  oneOf: [
    enumTagSchema(["in_progress"]),
    {
      ...fileMetadataSchema,
      properties: {
        ...fileMetadataSchema.properties,
        ".tag": { type: "string", enum: ["complete"] },
      },
      required: [".tag", ...fileMetadataSchema.required],
    },
    {
      type: "object",
      properties: {
        ".tag": { type: "string", enum: ["failed"] },
        failed: openTaggedUnionSchema,
      },
      required: [".tag", "failed"],
    },
  ],
};
export const searchV2ResultSchema = {
  type: "object" as const,
  properties: {
    matches: {
      type: "array",
      items: {
        type: "object",
        properties: {
          metadata: {
            oneOf: [
              {
                type: "object",
                properties: {
                  ".tag": { type: "string", enum: ["metadata"] },
                  metadata: metadataSchema,
                },
                required: [".tag", "metadata"],
              },
              enumTagSchema(["other"]),
            ],
          },
          match_type: enumTagSchema([
            "filename",
            "file_content",
            "filename_and_content",
            "image_content",
            "metadata",
            "other",
          ]),
          highlight_spans: {
            type: "array",
            items: {
              type: "object",
              properties: {
                highlight_str: { type: "string" },
                is_highlighted: { type: "boolean" },
              },
              required: ["highlight_str", "is_highlighted"],
            },
          },
        },
        required: ["metadata"],
      },
    },
    has_more: { type: "boolean" },
    cursor: { type: "string" },
  },
  required: ["matches", "has_more"],
};
export const copyObjectOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: { metadata: metadataSchema },
  required: ["metadata"],
});
export const moveObjectOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: { metadata: metadataSchema },
  required: ["metadata"],
});
export const deleteObjectOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: { metadata: metadataSchema },
  required: ["metadata"],
});
export const getMetadataOutputSchema = withDropboxEnvelope(metadataSchema);
export const uploadFileOutputSchema = withDropboxEnvelope(fileMetadataSchema);
export const exportFileOutputSchema = withDropboxEnvelope({
  type: "object",
  properties: {
    export_metadata: {
      type: "object",
      properties: {
        name: { type: "string" },
        size: { type: "integer" },
        export_hash: { type: "string" },
        paper_revision: { type: "integer" },
      },
      required: ["name", "size"],
    },
    file_metadata: fileMetadataSchema,
  },
  required: ["export_metadata", "file_metadata"],
});
export const searchFilesOutputSchema =
  withDropboxEnvelope(searchV2ResultSchema);
export const getFileLockOutputSchema = withDropboxEnvelope(
  lockFileBatchResultSchema,
);
export const lockFileOutputSchema = withDropboxEnvelope(
  lockFileBatchResultSchema,
);
export const unlockFileOutputSchema = withDropboxEnvelope(
  lockFileBatchResultSchema,
);
export const getDownloadStatusOutputSchema = withDropboxEnvelope(
  saveUrlJobStatusSchema,
);
export const saveFromUrlOutputSchema = withDropboxEnvelope({
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
      ...fileMetadataSchema,
      properties: {
        ...fileMetadataSchema.properties,
        ".tag": { type: "string", enum: ["complete"] },
      },
      required: [".tag", ...fileMetadataSchema.required],
    },
    {
      type: "object",
      properties: {
        ".tag": { type: "string", enum: ["failed"] },
        failed: openTaggedUnionSchema,
      },
      required: [".tag", "failed"],
    },
  ],
});
