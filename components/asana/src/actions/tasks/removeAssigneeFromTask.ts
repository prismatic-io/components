import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { removeAssigneeFromTaskExamplePayload } from "../../examplePayloads";
import { removeAssigneeFromTaskInputs } from "../../inputs";
export const removeAssigneeFromTask = action({
  display: {
    label: "Remove Assignee from Task",
    description: "Remove the assignee from the given task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.put(`/tasks/${params.taskId}`, {
      data: {
        assignee: null,
      },
    });
    return { data };
  },
  inputs: removeAssigneeFromTaskInputs,
  examplePayload: removeAssigneeFromTaskExamplePayload,
});
