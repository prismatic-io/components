import { attachmentCompactSchema, nextPageSchema } from "./shared";
export const attachmentResponseSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        gid: { type: "string" },
        resource_type: { type: "string" },
        name: { type: "string" },
        resource_subtype: {
          type: "string",
          enum: [
            "asana",
            "dropbox",
            "gdrive",
            "onedrive",
            "box",
            "vimeo",
            "external",
          ],
        },
        created_at: { type: "string", format: "date-time" },
        download_url: { type: ["string", "null"] },
        permanent_url: { type: ["string", "null"] },
        host: { type: "string" },
        parent: {
          type: ["object", "null"],
          properties: {
            gid: { type: "string" },
            resource_type: { type: "string" },
            name: { type: "string" },
            resource_subtype: { type: ["string", "null"] },
            created_by: {
              type: ["object", "null"],
              additionalProperties: true,
            },
          },
          additionalProperties: true,
        },
        size: { type: "integer" },
        view_url: { type: ["string", "null"] },
        connected_to_app: { type: "boolean" },
      },
      required: [] as string[],
      additionalProperties: true,
    },
  },
  required: [] as string[],
  additionalProperties: true,
};
export const listAttachmentsOutputSchema = {
  type: "object" as const,
  properties: {
    data: { type: "array", items: attachmentCompactSchema },
    next_page: nextPageSchema,
  },
  required: [] as string[],
  additionalProperties: true,
};
