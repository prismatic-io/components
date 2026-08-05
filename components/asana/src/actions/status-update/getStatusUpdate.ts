import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getStatusUpdateExamplePayload } from "../../examplePayloads";
import { getStatusUpdateInputs } from "../../inputs";
export const getStatusUpdate = action({
  display: {
    label: "Get Status Update",
    description: "Get the information and metadata of a status update.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/status_updates/${params.statusId}`);
    return { data };
  },
  inputs: getStatusUpdateInputs,
  examplePayload: getStatusUpdateExamplePayload,
});
