import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listTagsInTaskExamplePayload } from "../../examplePayloads";
import { listTagsInTaskInputs } from "../../inputs";
export const listTagsInTask = action({
  display: {
    label: "List Tags in Task",
    description: "List all tags applied to a given task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/tasks/${params.taskId}/tags`, {
      params: {
        limit: params.pagination.limit,
        offset: params.pagination.offset,
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: listTagsInTaskInputs,
  examplePayload: listTagsInTaskExamplePayload,
});
