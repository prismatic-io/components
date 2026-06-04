import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { getProblemTaskResponse as examplePayload } from "../../examplePayloads";
import { getProblemTaskInputs as inputs } from "../../inputs";

export const getProblemTask = action({
  display: {
    label: "Get Problem Task",
    description: "Get a problem task",
  },
  inputs,
  perform: async (context, { connectionInput, taskProblemId, toGetTaskId }) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.get(
      `/problems/${taskProblemId}/tasks/${toGetTaskId}`,
    );
    return { data };
  },
  examplePayload,
});
