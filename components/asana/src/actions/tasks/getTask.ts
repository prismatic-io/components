import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { getTaskExamplePayload } from "../../examplePayloads";
import { getTaskInputs } from "../../inputs";
import { taskResponseSchema } from "../../outputSchemas";
export const getTask = action({
  display: {
    label: "Get Task",
    description: "Get the information and metadata of a task.",
  },
  performSafety: "safe",
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
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: taskResponseSchema,
  }),
});
