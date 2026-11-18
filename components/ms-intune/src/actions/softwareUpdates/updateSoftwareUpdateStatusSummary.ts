import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { ENDPOINTS } from "../../constants";
import { updateSoftwareUpdateStatusSummaryExamplePayload } from "../../examplePayloads";
import { updateSoftwareUpdateStatusSummaryInputs } from "../../inputs";
import { updateSoftwareUpdateStatusSummaryOutputSchema } from "../../outputSchemas";

export const updateSoftwareUpdateStatusSummary = action({
  display: {
    label: "Update Software Update Status Summary",
    description: "Update the status summary of a software update.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateSoftwareUpdateStatusSummaryOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (
    context,
    { connection, displayName, deviceCounts, userCounts },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const body = {
      displayName,
      ...deviceCounts,
      ...userCounts,
    };
    const { data } = await client.patch(
      ENDPOINTS.SOFTWARE_UPDATE_STATUS_SUMMARY,
      body,
    );

    return {
      data,
    };
  },
  examplePerform: async () => updateSoftwareUpdateStatusSummaryExamplePayload,
  inputs: updateSoftwareUpdateStatusSummaryInputs,
  examplePayload: updateSoftwareUpdateStatusSummaryExamplePayload,
});
