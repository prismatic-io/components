import {
  apiVersionSchema,
  columnDelimiterSchema,
  lineEndingSchema,
} from "./bulkShared";

const ingestJobInfoSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    operation: { type: "string" },
    object: { type: "string" },
    createdById: { type: "string" },
    createdDate: { type: "string" },
    systemModstamp: { type: "string" },
    state: {
      type: "string",
      enum: [
        "Open",
        "UploadComplete",
        "InProgress",
        "JobComplete",
        "Aborted",
        "Failed",
      ],
    },
    concurrencyMode: { type: "string" },
    contentType: { type: "string" },
    apiVersion: apiVersionSchema,
    assignmentRuleId: { type: "string" },
    externalIdFieldName: { type: "string" },
    jobType: {
      type: "string",
      enum: ["BigObjectIngest", "Classic", "V2Ingest"],
    },
    contentUrl: { type: "string" },
    lineEnding: lineEndingSchema,
    columnDelimiter: columnDelimiterSchema,
    errorMessage: { type: "string" },
    numberRecordsProcessed: { type: "integer" },
    numberRecordsFailed: { type: "integer" },
    retries: { type: "integer" },
    totalProcessingTime: { type: "integer" },
    apiActiveProcessingTime: { type: "integer" },
    apexProcessingTime: { type: "integer" },
  },
};

export const createBulkJobOutputSchema = ingestJobInfoSchema;

export const getBulkJobOutputSchema = ingestJobInfoSchema;

export const completeUploadBulkJobOutputSchema = ingestJobInfoSchema;

export const abortBulkJobOutputSchema = ingestJobInfoSchema;

export const getJobFailedRecordResultsOutputSchema = {
  type: "string" as const,
};

export const getJobSuccessfulRecordResultsOutputSchema = {
  type: "string" as const,
};

export const bulkLoadRecordsOutputSchema = {
  type: "array" as const,
  items: {
    type: "object" as const,
    properties: {
      id: { type: ["string", "null"] },
      success: { type: "boolean" },
      created: { type: "boolean" },
      errors: { type: "array", items: { type: "string" } },
    },
    required: ["id", "success", "created", "errors"],
  },
};
