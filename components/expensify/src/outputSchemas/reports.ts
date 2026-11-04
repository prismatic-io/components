import { reportIssueSchema, responseEnvelopeSchema } from "./common";

export const createReportOutputSchema = {
  type: "object" as const,
  properties: {
    ...responseEnvelopeSchema.properties,
    reportID: { type: "string" },
    reportName: { type: "string" },
  },
  required: ["responseCode"],
};

export const updateReportStatusOutputSchema = {
  type: "object" as const,
  properties: {
    ...responseEnvelopeSchema.properties,
    reportIDs: { type: "array", items: { type: "string" } },
    skippedReports: { type: "array", items: reportIssueSchema },
    failedReports: { type: "array", items: reportIssueSchema },
  },
  required: ["responseCode"],
};

export const exportReportOutputSchema = {
  type: ["string", "object"],
  properties: {
    ...responseEnvelopeSchema.properties,
  },
  required: ["responseCode"],
};
