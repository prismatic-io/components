import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getTaskExamplePayload } from "../../examplePayloads";
import { getTaskInputs } from "../../inputs";
export const getTask = action({
  display: {
    label: "Get Task",
    description: "Get the information and metadata of a task.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/tasks/${params.taskId}`, {
      params: {
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: getTaskInputs,
  examplePayload: getTaskExamplePayload,
});
