import { action, outputSchema } from "@prismatic-io/spectral";
import { createBulkQueryJobOutputSchema } from "../../outputSchemas";
import { createSalesforceHttpClient } from "../../client";
import { createBulkQueryJobInputs } from "../../inputs";
import { createBulkQueryJobExamplePayload } from "../../examplePayloads";
export const createBulkQueryJob = action({
  display: {
    label: "Create Bulk Query Job",
    description: "Create a bulk query job.",
  },
  inputs: createBulkQueryJobInputs,
  performSafety: "notAllowed",
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
  examplePerform: async (): Promise<{
    data: unknown;
  }> => createBulkQueryJobExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createBulkQueryJobOutputSchema,
  }),
  examplePayload: createBulkQueryJobExamplePayload,
});
