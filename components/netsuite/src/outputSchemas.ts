const linkSchema = {
  type: "object" as const,
  properties: {
    rel: { type: "string" },
    href: { type: "string" },
  },
  required: ["rel", "href"],
};
const responseHeadersSchema = {
  type: "object" as const,
  additionalProperties: { type: "string" },
};
const recordReferenceSchema = {
  type: "object" as const,
  properties: {
    links: { type: "array", items: linkSchema },
    id: { type: "string" },
  },
  required: ["id"],
};
const recordLocationIdentitySchema = {
  type: "object" as const,
  properties: {
    recordType: { type: "string" },
    id: { type: "string" },
  },
  required: ["recordType", "id"],
};
export const listRecordOutputSchema = {
  type: "object" as const,
  properties: {
    data: {
      type: "object" as const,
      properties: {
        links: { type: "array", items: linkSchema },
        items: { type: "array", items: recordReferenceSchema },
        count: { type: "number" },
        offset: { type: "number" },
        hasMore: { type: "boolean" },
        totalResults: { type: "number" },
      },
      required: [
        "links",
        "items",
        "count",
        "offset",
        "hasMore",
        "totalResults",
      ],
    },
    headers: responseHeadersSchema,
  },
  required: ["data", "headers"],
};
export const createRecordOutputSchema = {
  type: "object" as const,
  properties: {
    data: recordLocationIdentitySchema,
    headers: responseHeadersSchema,
  },
  required: ["data", "headers"],
};
export const updateRecordOutputSchema = {
  type: "object" as const,
  properties: {
    data: recordLocationIdentitySchema,
    headers: responseHeadersSchema,
  },
  required: ["data", "headers"],
};
