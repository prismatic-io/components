import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { snoozeOpsAlertExamplePayload } from "../../examplePayloads";
import { snoozeOpsAlertInputs } from "../../inputs";

export const snoozeOpsAlert = action({
  display: {
    label: "Snooze Ops Alert",
    description: "Snoozes an Ops alert until the supplied ISO-8601 timestamp.",
  },
  inputs: snoozeOpsAlertInputs,
  perform: async (
    context,
    { connection, opsAlertId, opsAlertSnoozeEndTime },
  ) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/v1/alerts/${opsAlertId}/snooze`, {
      endTime: opsAlertSnoozeEndTime,
    });
    return { data };
  },
  examplePayload: snoozeOpsAlertExamplePayload,
});
