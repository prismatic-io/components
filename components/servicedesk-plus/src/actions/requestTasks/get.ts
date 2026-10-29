import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getRequestTaskResponse as examplePayload } from "../../examplePayloads";
import { getRequestTaskInputs as inputs } from "../../inputs";

export const getRequestTask = action({
  display: {
    label: "Get Request Task",
    description: "Get a request task by ID",
  },
  inputs,
  perform: async (
    context,
    { connectionInput, taskRequestId, toGetRequestTaskId },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/requests/${taskRequestId}/tasks/${toGetRequestTaskId}`,
    );
    return { data };
  },
  examplePayload,
});
