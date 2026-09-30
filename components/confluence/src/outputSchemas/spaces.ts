import { bodyRepresentationSchema } from "./common";
export const spaceSingleSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    key: { type: "string" },
    name: { type: "string" },
    type: {
      type: "string",
      enum: [
        "global",
        "collaboration",
        "knowledge_base",
        "personal",
        "system",
        "onboarding",
        "xflow_sample_space",
      ],
    },
    status: {
      type: "string",
      enum: ["current", "archived", "trashed"],
    },
    authorId: { type: "string" },
    spaceOwnerId: { type: ["string", "null"] },
    createdAt: { type: "string", format: "date-time" },
    homepageId: { type: ["string", "null"] },
    description: {
      type: "object" as const,
      properties: {
        plain: bodyRepresentationSchema,
        view: bodyRepresentationSchema,
      },
    },
    icon: {
      type: ["object", "null"],
      properties: {
        path: { type: "string" },
        apiDownloadLink: { type: "string" },
      },
    },
    _links: {
      type: "object" as const,
      properties: {
        webui: { type: "string" },
        base: { type: "string" },
      },
    },
  },
  required: ["id", "key", "name", "type", "status", "authorId", "createdAt"],
};
export const spaceBulkSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    key: { type: "string" },
    name: { type: "string" },
    type: {
      type: "string",
      enum: [
        "global",
        "collaboration",
        "knowledge_base",
        "personal",
        "system",
        "onboarding",
        "xflow_sample_space",
      ],
    },
    status: {
      type: "string",
      enum: ["current", "archived", "trashed"],
    },
    authorId: { type: "string" },
    spaceOwnerId: { type: ["string", "null"] },
    createdAt: { type: "string", format: "date-time" },
    homepageId: { type: ["string", "null"] },
    currentActiveAlias: { type: "string" },
    _links: {
      type: "object" as const,
      properties: {
        webui: { type: "string" },
        base: { type: "string" },
      },
    },
  },
  required: ["id", "key", "name", "type", "status", "authorId", "createdAt"],
};
export const listSpacesOutputSchema = {
  type: "object" as const,
  properties: {
    results: { type: "array", items: spaceBulkSchema },
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
