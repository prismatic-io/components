import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { getOpsAlertExamplePayload } from "../../examplePayloads";
import { getOpsAlertInputs } from "../../inputs";

export const getOpsAlert = action({
  display: {
    label: "Get Ops Alert",
    description: "Returns a single Ops alert by identifier.",
  },
  inputs: getOpsAlertInputs,
  perform: async (context, { connection, opsAlertId }) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/v1/alerts/${opsAlertId}`);
    return { data };
  },
  examplePayload: getOpsAlertExamplePayload,
});
