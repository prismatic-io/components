import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { listSoftwareUpdateStatusSummaryExamplePayload } from "../../examplePayloads";
import { listSoftwareUpdateStatusSummaryInputs } from "../../inputs";
import { listSoftwareUpdateStatusSummaryOutputSchema } from "../../outputSchemas";

export const listSoftwareUpdateStatusSummary = action({
  display: {
    label: "List Software Update Status Summary",
    description: "List the status summary of a software update.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listSoftwareUpdateStatusSummaryOutputSchema,
  }),
  performSafety: "safe",
  perform: async (context, { connection, $skipToken, filters }) => {
    const client = createClient(connection, context.debug.enabled);
    const params = {
      $expand: filters.$expand,
      $format: filters.$format,
      $search: filters.$search,
      $select: filters.$select,
      $skipToken,
    };
    const { data } = await client.get(
      ENDPOINTS.SOFTWARE_UPDATE_STATUS_SUMMARY,
      { params },
    );

    return {
      data,
    };
  },
  examplePerform: async () => listSoftwareUpdateStatusSummaryExamplePayload,
  inputs: listSoftwareUpdateStatusSummaryInputs,
  examplePayload: listSoftwareUpdateStatusSummaryExamplePayload,
});
