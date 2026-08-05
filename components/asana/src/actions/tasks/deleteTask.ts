import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { deleteTaskExamplePayload } from "../../examplePayloads";
import { deleteTaskInputs } from "../../inputs";
export const deleteTask = action({
  display: {
    label: "Delete Task",
    description: "Delete an existing task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/tasks/${params.taskId}`);
    return { data };
  },
  inputs: deleteTaskInputs,
  examplePayload: deleteTaskExamplePayload,
});
