import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listTasksExamplePayload } from "../../examplePayloads";
import { listTasksInputs } from "../../inputs";
import { listTasksOutputSchema } from "../../outputSchemas";
export const listTasks = action({
  display: {
    label: "List Tasks",
    description: "List tasks within a workspace, project, or assignee scope.",
  },
  performSafety: "safe",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/tasks`, {
      params: {
        limit: params.pagination.limit,
        offset: params.pagination.offset,
        assignee: params.assigneeId,
        project: params.projectId,
        workspace: params.workspaceId,
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: listTasksInputs,
  examplePayload: listTasksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listTasksOutputSchema,
  }),
});
