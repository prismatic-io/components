import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { removeTagFromTaskExamplePayload } from "../../examplePayloads";
import { removeTagFromTaskInputs } from "../../inputs";
export const removeTagFromTask = action({
  display: {
    label: "Remove Tag from Task",
    description: "Remove a tag from the given task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(`/tasks/${params.taskId}/removeTag`, {
      data: {
        tag: params.tagId,
      },
    });
    return { data };
  },
  inputs: removeTagFromTaskInputs,
  examplePayload: removeTagFromTaskExamplePayload,
});
