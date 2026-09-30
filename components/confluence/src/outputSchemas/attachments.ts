import { versionSchema } from "./common";
export const attachmentSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    status: {
      type: "string",
      enum: [
        "current",
        "draft",
        "archived",
        "historical",
        "trashed",
        "deleted",
        "any",
      ],
    },
    title: { type: "string" },
    createdAt: { type: "string", format: "date-time" },
    pageId: { type: ["string", "null"] },
    blogPostId: { type: ["string", "null"] },
    customContentId: { type: ["string", "null"] },
    mediaType: { type: "string" },
    mediaTypeDescription: { type: "string" },
    comment: { type: "string" },
    fileId: { type: "string" },
    fileSize: { type: "integer" },
    webuiLink: { type: "string" },
    downloadLink: { type: "string" },
    version: versionSchema,
    _links: {
      type: "object" as const,
      properties: {
        webui: { type: "string" },
        download: { type: "string" },
        base: { type: "string" },
      },
    },
  },
  required: [
    "id",
    "status",
    "title",
    "createdAt",
    "mediaType",
    "fileId",
    "fileSize",
    "version",
  ],
};
export const listAttachmentsOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: attachmentSchema },
    _links: {
      type: "object" as const,
      properties: {
        next: { type: "string" },
        base: { type: "string" },
      },
    },
  },
  required: ["results"],
};
