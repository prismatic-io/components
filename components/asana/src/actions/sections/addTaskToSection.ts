import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { addTaskToSectionExamplePayload } from "../../examplePayloads";
import { addTaskToSectionInputs } from "../../inputs";
import { emptyResponseOutputSchema } from "../../outputSchemas";
export const addTaskToSection = action({
  display: {
    label: "Add Task to Section",
    description: "Add an existing task to the given section of a project.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.post(
      `/sections/${params.sectionId}/addTask`,
      {
        data: {
          insert_after: params.insertAfter,
          insert_before: params.insertBefore,
          task: params.taskId,
        },
      },
    );
    return { data };
  },
  inputs: addTaskToSectionInputs,
  examplePayload: addTaskToSectionExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: emptyResponseOutputSchema,
  }),
});
