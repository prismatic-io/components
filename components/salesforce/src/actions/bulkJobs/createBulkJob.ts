import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { createBulkJobInputs } from "../../inputs";
import { getQueryJobInformationExamplePayload } from "../../examplePayloads";

export const createBulkJob = action({
  display: {
    label: "Create Bulk Job",
    description:
      "Create a bulk ingest job representing an operation and its associated data for asynchronous processing in Salesforce.",
  },
  inputs: createBulkJobInputs,
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
  examplePayload: getQueryJobInformationExamplePayload,
});
