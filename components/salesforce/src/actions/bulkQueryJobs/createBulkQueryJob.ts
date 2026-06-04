import { action } from "@prismatic-io/spectral";
import { createSalesforceHttpClient } from "../../client";
import { createBulkQueryJobInputs } from "../../inputs";
import { createBulkQueryJobExamplePayload } from "../../examplePayloads";

export const createBulkQueryJob = action({
  display: {
    label: "Create Bulk Query Job",
    description: "Create a bulk query job.",
  },
  inputs: createBulkQueryJobInputs,
  perform: async (
    context,
    { version, connection, columnDelimiter, lineEnding, operation, query },
  ) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.post("/jobs/query", {
      columnDelimiter,
      lineEnding,
      operation,
      query,
      contentType: "CSV",
    });
    return {
      data,
    };
  },
  examplePayload: createBulkQueryJobExamplePayload,
});
