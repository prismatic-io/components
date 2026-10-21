import {
  apiVersionSchema,
  columnDelimiterSchema,
  lineEndingSchema,
} from "./bulkShared";
const queryJobInfoSchema = {
  type: "object" as const,
  properties: {
    id: { type: "string" },
    operation: { type: "string", enum: ["query", "queryAll"] },
    object: { type: "string" },
    createdById: { type: "string" },
    createdDate: { type: "string" },
    systemModstamp: { type: "string" },
    state: {
      type: "string",
      enum: [
        "UploadComplete",
        "InProgress",
        "Aborted",
        "JobComplete",
        "Failed",
      ],
    },
    concurrencyMode: { type: "string" },
    contentType: { type: "string" },
    apiVersion: apiVersionSchema,
    jobType: { type: "string" },
    lineEnding: lineEndingSchema,
    columnDelimiter: columnDelimiterSchema,
    numberRecordsProcessed: { type: "integer" },
    retries: { type: "integer" },
    totalProcessingTime: { type: "integer" },
    isPkChunkingSupported: { type: "boolean" },
  },
};
export const createBulkQueryJobOutputSchema = queryJobInfoSchema;
export const getQueryJobInformationOutputSchema = queryJobInfoSchema;
export const abortBulkQueryJobOutputSchema = queryJobInfoSchema;
export const getQueryJobResultsOutputSchema = { type: "string" as const };
