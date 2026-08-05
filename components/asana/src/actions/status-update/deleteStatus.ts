import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deleteStatusExamplePayload } from "../../examplePayloads";
import { deleteStatusInputs } from "../../inputs";
export const deleteStatus = action({
  display: {
    label: "Delete Status Update",
    description: "Delete an existing status update.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/status_updates/${params.statusId}`);
    return { data };
  },
  inputs: deleteStatusInputs,
  examplePayload: deleteStatusExamplePayload,
});
