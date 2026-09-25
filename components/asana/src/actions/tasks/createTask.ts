import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createTaskExamplePayload } from "../../examplePayloads";
import { createTaskInputs } from "../../inputs";
import { taskResponseSchema } from "../../outputSchemas";
export const createTask = action({
  display: {
    label: "Create Task",
    description: "Create a new task inside a workspace or organization.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const taskData = {
      data: {
        approval_status: params.approvalStatus,
        assignee: params.assigneeId,
        assignee_section: params.assigneeSectionId,
        assignee_status: params.taskStatus.assigneeStatus,
        completed: params.taskStatus.isCompleted,
        completed_by: params.taskStatus.completedBy,
        due_at: params.scheduling.dueAt,
        due_on: params.scheduling.dueOn,
        followers: params.followersList,
        liked: params.taskStatus.isLiked,
        name: params.name,
        notes: params.notes,
        parent: params.parentId,
        projects: params.projectList,
        resource_subtype: params.resourceSubtype,
        start_at: params.scheduling.startAt,
        start_on: params.scheduling.startOn,
        workspace: params.workspaceId,
        html_notes: params.htmlNotes,
      },
    };
    const { data } = await client.post(`/tasks`, taskData, {
      params: {
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: createTaskInputs,
  examplePayload: createTaskExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: taskResponseSchema,
  }),
});
