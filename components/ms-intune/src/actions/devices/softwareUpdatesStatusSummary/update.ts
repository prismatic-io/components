import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { connection } from "../../../inputs/general";
import { updateSoftwareUpdateStatusSummaryExamplePayload } from "../../../examplePayloads";
import { updateSoftwareUpdateStatusSummaryInputs } from "../../../inputs/devices/softwareUpdatesStatusSummary/update";

export const updateSoftwareUpdateStatusSummary = action({
  display: {
    label: "Update Software Update Status Summary",
    description: "Update the status summary of a software update.",
  },
  perform: async (context, { connection, ...body }) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await client.patch(
      "/deviceManagement/softwareUpdateStatusSummary",
      body,
    );

    return {
      data,
    };
  },
  inputs: {
    connection,
    ...updateSoftwareUpdateStatusSummaryInputs,
  },
  examplePayload: updateSoftwareUpdateStatusSummaryExamplePayload,
});
