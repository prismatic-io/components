import {
  assetMetadataResourceSchema,
  commandResultMessageSchema,
  jobStateSchema,
} from "./shared";

export const searchAssetsOutputSchema = {
  type: "object" as const,
  properties: {
    hits: {
      type: "object",
      properties: {
        results: { type: "array", items: assetMetadataResourceSchema },
      },
    },
    cursor: { type: "string" },
    facets: {
      type: "array",
      items: {
        type: "object",
        properties: {
          type: { type: "string", enum: ["CATEGORY", "STAT"] },
          field: { type: "string" },
          id: { type: "string" },
          values: {
            type: ["array", "object"],
            items: {
              type: "object",
              properties: {
                value: { type: "string" },
                count: { type: "integer" },
              },
              required: ["value", "count"],
            },
            properties: { min: { type: "string" }, max: { type: "string" } },
          },
        },
        required: ["id", "field", "type"],
      },
    },
    search_metadata: {
      type: "object",
      properties: {
        count: { type: "integer" },
        totalCount: {
          type: "object",
          properties: {
            total: { type: "integer" },
            relation: { type: "string", enum: ["eq", "gte"] },
          },
        },
        searchDuration: { type: "integer" },
      },
    },
  },
};

export const getAssetMetadataOutputSchema = assetMetadataResourceSchema;

export const listAssetRenditionsOutputSchema = {
  type: "object" as const,
  properties: {
    assetId: { type: "string" },
    "repo:name": { type: "string" },
    items: {
      type: "array",
      items: {
        type: "object",
        properties: {
          name: { type: "string" },
          format: { type: "string" },
          size: { type: "integer" },
          dimensions: {
            type: "object",
            properties: {
              width: { type: "integer" },
              height: { type: "integer" },
            },
          },
        },
        required: ["name", "size", "format"],
      },
    },
  },
  required: ["assetId", "items", "repo:name"],
};

export const aemJobOutputSchema = {
  type: "object" as const,
  properties: {
    jobId: { type: "string" },
    state: jobStateSchema,
    status: { type: "string" },
  },
  required: ["jobId", "state"],
};

export const deleteAssetOutputSchema = {
  type: "object" as const,
  properties: {
    jobId: { type: "string" },
    state: jobStateSchema,
    status: { type: "string" },
    assetId: { type: "string" },
    deleted: { type: "boolean" },
  },
};

const importJobProgressSchema = {
  type: "object",
  properties: {
    failed: { type: "integer" },
    imported: { type: "integer" },
    lastImported: { type: "string" },
    lastUpdated: { type: "string", format: "date-time" },
    skipped: { type: "number" },
    started: { type: "string", format: "date-time" },
    total: { type: "number" },
    size: { type: "number" },
    step: { type: "string", enum: ["QUEUED", "SCANNING", "IMPORTING", "DONE"] },
    transferred: { type: "number" },
  },
  required: [
    "failed",
    "imported",
    "lastUpdated",
    "skipped",
    "started",
    "size",
    "step",
    "total",
    "transferred",
  ],
};

export const importJobOutputSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    operation: { type: "string", enum: ["aem.assets.import.fromurl"] },
    state: { type: "string", enum: ["PROCESSING", "COMPLETED", "FAILED"] },
    status: { type: "number" },
    description: { type: "string" },
    progress: importJobProgressSchema,
    data: {
      type: "object",
      properties: {
        id: { type: "string" },
        config: {
          type: "object",
          properties: {
            folder: { type: "string" },
            items: { type: "array", items: { type: "string" } },
            assetMetadata: { type: "object", additionalProperties: true },
          },
          required: ["folder", "items"],
        },
        processedFiles: { type: "array", items: { type: "object" } },
        progress: importJobProgressSchema,
      },
      required: ["id", "config", "progress"],
    },
    errors: { type: "array", items: commandResultMessageSchema },
    warnings: { type: "array", items: commandResultMessageSchema },
  },
};
