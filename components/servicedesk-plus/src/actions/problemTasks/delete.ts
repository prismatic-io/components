import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { deleteProblemTaskResponse as examplePayload } from "../../examplePayloads";
import { deleteProblemTaskInputs as inputs } from "../../inputs";

export const deleteProblemTask = action({
  display: {
    label: "Delete Problem Task",
    description: "Delete a problem task",
  },
  inputs,
  perform: async (
    context,
    { connectionInput, taskProblemId, toDeleteTaskId },
  ) => {
    const client = createClient(connectionInput, context.debug.enabled);

    const { data } = await client.delete(
      `/problems/${taskProblemId}/tasks/${toDeleteTaskId}`,
    );
    return { data };
  },
  examplePayload,
});
