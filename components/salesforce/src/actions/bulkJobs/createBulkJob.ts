import { action, outputSchema } from "@prismatic-io/spectral";
import { createBulkJobOutputSchema } from "../../outputSchemas";
import { createSalesforceHttpClient } from "../../client";
import { createBulkJobInputs } from "../../inputs";
import { createBulkJobExamplePayload } from "../../examplePayloads";

export const createBulkJob = action({
  display: {
    label: "Create Bulk Job",
    description:
      "Create a bulk ingest job representing an operation and its associated data for asynchronous processing in Salesforce.",
  },
  inputs: createBulkJobInputs,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      version,
      connection,
      assignmentRuleId,
      columnDelimiter,
      externalIdFieldName,
      lineEnding,
      object,
      operation,
    },
  ) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.post("/jobs/ingest", {
      assignmentRuleId,
      columnDelimiter,
      contentType: "CSV",
      externalIdFieldName,
      lineEnding,
      object,
      operation,
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    createBulkJobExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createBulkJobOutputSchema,
  }),
  examplePayload: createBulkJobExamplePayload,
});
