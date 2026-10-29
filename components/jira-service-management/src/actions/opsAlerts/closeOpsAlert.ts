import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { closeOpsAlertExamplePayload } from "../../examplePayloads";
import { closeOpsAlertInputs } from "../../inputs";

export const closeOpsAlert = action({
  display: {
    label: "Close Ops Alert",
    description: "Closes (resolves) an Ops alert.",
  },
  inputs: closeOpsAlertInputs,
  perform: async (context, { connection, opsAlertId }) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/v1/alerts/${opsAlertId}/close`);
    return { data };
  },
  examplePayload: closeOpsAlertExamplePayload,
});
