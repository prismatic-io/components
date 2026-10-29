import { action, outputSchema } from "@prismatic-io/spectral";
import { abortBulkQueryJobOutputSchema } from "../../outputSchemas";
import { createSalesforceHttpClient } from "../../client";
import { abortBulkQueryJobInputs } from "../../inputs";
import { abortBulkQueryJobExamplePayload } from "../../examplePayloads";

export const abortBulkQueryJob = action({
  display: {
    label: "Abort Bulk Query Job",
    description: "Abort a bulk query job.",
  },
  inputs: abortBulkQueryJobInputs,
  performSafety: "notAllowed",
  perform: async (context, { version, connection, queryJobId }) => {
    const salesforceClient = await createSalesforceHttpClient(
      version,
      connection,
      context.debug.enabled,
    );
    const { data } = await salesforceClient.patch(`/jobs/query/${queryJobId}`, {
      state: "Aborted",
    });
    return {
      data,
    };
  },
  examplePerform: async (): Promise<{ data: unknown }> =>
    abortBulkQueryJobExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: abortBulkQueryJobOutputSchema,
  }),
  examplePayload: abortBulkQueryJobExamplePayload,
});
