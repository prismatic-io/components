import { bodyRepresentationSchema, versionSchema } from "./common";
export const pageSingleSchema = {
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
    spaceId: { type: "string" },
    parentId: { type: ["string", "null"] },
    parentType: {
      type: ["string", "null"],
      enum: ["page", "whiteboard", "database", "embed", "folder", null],
    },
    position: { type: ["integer", "null"] },
    authorId: { type: "string" },
    ownerId: { type: ["string", "null"] },
    lastOwnerId: { type: ["string", "null"] },
    createdAt: { type: "string", format: "date-time" },
    version: versionSchema,
    body: {
      type: "object" as const,
      properties: {
        storage: bodyRepresentationSchema,
        atlas_doc_format: bodyRepresentationSchema,
        view: bodyRepresentationSchema,
      },
    },
    isFavoritedByCurrentUser: { type: "boolean" },
    _links: {
      type: "object" as const,
      properties: {
        webui: { type: "string" },
        editui: { type: "string" },
        tinyui: { type: "string" },
        base: { type: "string" },
      },
    },
  },
  required: ["id", "status", "title", "spaceId", "authorId", "createdAt"],
};
export const pageBulkSchema = {
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
    spaceId: { type: "string" },
    parentId: { type: ["string", "null"] },
    parentType: {
      type: ["string", "null"],
      enum: ["page", "whiteboard", "database", "embed", "folder", null],
    },
    position: { type: ["integer", "null"] },
    authorId: { type: "string" },
    ownerId: { type: ["string", "null"] },
    lastOwnerId: { type: ["string", "null"] },
    subtype: { type: ["string", "null"] },
    createdAt: { type: "string", format: "date-time" },
    version: versionSchema,
    body: {
      type: "object" as const,
      properties: {
        storage: bodyRepresentationSchema,
        atlas_doc_format: bodyRepresentationSchema,
      },
    },
    _links: {
      type: "object" as const,
      properties: {
        webui: { type: "string" },
        editui: { type: "string" },
        tinyui: { type: "string" },
        base: { type: "string" },
      },
    },
  },
  required: ["id", "status", "title", "spaceId", "authorId", "createdAt"],
};
export const listPagesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: pageBulkSchema },
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
