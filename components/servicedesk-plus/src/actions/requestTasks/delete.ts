import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteRequestTaskResponse as examplePayload } from "../../examplePayloads";
import { deleteRequestTaskInputs as inputs } from "../../inputs";

export const deleteRequestTask = action({
  display: {
    label: "Delete Request Task",
    description: "Delete a request task by ID",
  },
  inputs,
  perform: async (
    context,
    { connectionInput, taskRequestId, toDeleteRequestTaskId },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.delete(
      `/requests/${taskRequestId}/tasks/${toDeleteRequestTaskId}`,
    );
    return { data };
  },
  examplePayload,
});
