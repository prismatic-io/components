import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { PLANNER_ENDPOINTS } from "../../constants";
import { deleteTaskExamplePayload } from "../../examplePayloads";
import { deleteWithEtag } from "../../utils";
import { deleteTaskInputs } from "../../inputs";
import { deleteTaskOutputSchema } from "../../outputSchemas";
export const deleteTask = action({
  display: { label: "Delete Task", description: "Delete a task." },
  inputs: deleteTaskInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteTaskOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, { connection, taskId, etag }) => {
    const client = createClient(connection, context.debug.enabled);
    await deleteWithEtag(client, PLANNER_ENDPOINTS.TASK(taskId), etag);
    return {
      data: { success: true, id: taskId, message: "Task deleted successfully" },
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => deleteTaskExamplePayload,
  examplePayload: deleteTaskExamplePayload,
});
