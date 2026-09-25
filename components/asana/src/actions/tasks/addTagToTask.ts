import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { addTagToTaskExamplePayload } from "../../examplePayloads";
import { addTagToTaskInputs } from "../../inputs";
import { emptyResponseOutputSchema } from "../../outputSchemas";
export const addTagToTask = action({
  display: {
    label: "Add Tag to Task",
    description: "Add a tag to an existing task.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/tasks/${params.taskId}/addTag`,
      {
        data: {
          tag: params.tagId,
        },
      },
      {
        params: {
          opt_fields: params.optFields,
        },
      },
    );
    return { data };
  },
  inputs: addTagToTaskInputs,
  examplePayload: addTagToTaskExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyResponseOutputSchema,
  }),
});
