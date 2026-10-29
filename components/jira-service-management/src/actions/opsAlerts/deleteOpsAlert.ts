import { action } from "@prismatic-io/spectral";
import { createOpsManagementClient } from "../../client";
import { SUCCESS_RESPONSE } from "../../constants";
import { deleteOpsAlertExamplePayload } from "../../examplePayloads";
import { deleteOpsAlertInputs } from "../../inputs";

export const deleteOpsAlert = action({
  display: {
    label: "Delete Ops Alert",
    description: "Deletes an Ops alert.",
  },
  inputs: deleteOpsAlertInputs,
  perform: async (context, { connection, opsAlertId }) => {
    const { client } = await createOpsManagementClient(
      connection,
      context.debug.enabled,
    );
    await client.delete(`/v1/alerts/${opsAlertId}`);
    return { data: SUCCESS_RESPONSE };
  },
  examplePayload: deleteOpsAlertExamplePayload,
});
