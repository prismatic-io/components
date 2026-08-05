import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { listTasksExamplePayload } from "../../examplePayloads";
import { listTasksInputs } from "../../inputs";
export const listTasks = action({
  display: {
    label: "List Tasks",
    description: "List tasks within a workspace, project, or assignee scope.",
  },
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/tasks`, {
      params: {
        limit: params.pagination.limit,
        offset: params.pagination.offset,
        assignee: params.assigneeId || undefined,
        project: params.projectId || undefined,
        workspace: params.workspaceId || undefined,
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: listTasksInputs,
  examplePayload: listTasksExamplePayload,
});
