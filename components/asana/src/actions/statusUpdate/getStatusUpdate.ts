import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getStatusUpdateExamplePayload } from "../../examplePayloads";
import { getStatusUpdateInputs } from "../../inputs";
import { statusUpdateResponseSchema } from "../../outputSchemas";
export const getStatusUpdate = action({
  display: {
    label: "Get Status Update",
    description: "Get the information and metadata of a status update.",
  },
  performSafety: "safe",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: statusUpdateResponseSchema,
  }),
});
