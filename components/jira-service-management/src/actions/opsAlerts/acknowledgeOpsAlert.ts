import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { acknowledgeOpsAlertExamplePayload } from "../../examplePayloads";
import { acknowledgeOpsAlertInputs } from "../../inputs";

export const acknowledgeOpsAlert = action({
  display: {
    label: "Acknowledge Ops Alert",
    description: "Acknowledges an Ops alert.",
  },
  inputs: acknowledgeOpsAlertInputs,
  perform: async (context, { connection, opsAlertId }) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/v1/alerts/${opsAlertId}/acknowledge`);
    return { data };
  },
  examplePayload: acknowledgeOpsAlertExamplePayload,
});
