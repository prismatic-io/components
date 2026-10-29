import { action } from "@prismatic-io/spectral";
import { getClient } from "../../client";
import { completeTaskExamplePayload } from "../../examplePayloads";
import { completeTaskInputs } from "../../inputs";

export const completeTask = action({
  display: {
    label: "Complete Task",
    description: "Marks a task as completed.",
  },
  perform: async (context, { connection, taskId }) => {
    const client = getClient(connection, context.debug.enabled);

    const { data } = await client.post(`/tasks/${taskId}/complete`);
    return {
      data,
    };
  },
  inputs: completeTaskInputs,
  examplePayload: completeTaskExamplePayload,
});
