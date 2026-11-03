export const createFeedOutputSchema = {
  type: "object" as const,
  properties: {
    feedId: { type: "string" },
  },
  required: ["feedId"],
};

const feedSchema = {
  type: "object" as const,
  properties: {
    feedId: { type: "string" },
    feedType: { type: "string" },
    createdTime: { type: "string", format: "date-time" as const },
    processingStatus: {
      type: "string",
      enum: ["CANCELLED", "DONE", "FATAL", "IN_PROGRESS", "IN_QUEUE"],
    },
    marketplaceIds: {
      type: "array",
      items: { type: "string" },
    },
    processingStartTime: { type: "string", format: "date-time" as const },
    processingEndTime: { type: "string", format: "date-time" as const },
    resultFeedDocumentId: { type: "string" },
  },
  required: ["feedId", "feedType", "createdTime", "processingStatus"],
};

export const getFeedOutputSchema = feedSchema;

export const listFeedsOutputSchema = {
  type: "object" as const,
  properties: {
    feeds: {
      type: "array",
      items: feedSchema,
    },
    nextToken: { type: "string" },
  },
  required: ["feeds"],
};

export const createFeedDocumentOutputSchema = {
  type: "object" as const,
  properties: {
    feedDocumentId: { type: "string" },
    url: { type: "string" },
  },
  required: ["feedDocumentId", "url"],
};

export const getFeedDocumentOutputSchema = {
  type: "object" as const,
  properties: {
    feedDocumentId: { type: "string" },
    url: { type: "string" },
    compressionAlgorithm: { type: "string", enum: ["GZIP"] },
  },
  required: ["feedDocumentId", "url"],
};
