import { action } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { createTaskExamplePayload } from "../../examplePayloads";
import { createTaskInputs } from "../../inputs";
export const createTask = action({
  display: {
    label: "Create Task",
    description: "Create a new task inside a workspace or organization.",
  },
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
        due_at: params.scheduling.dueAt || undefined,
        due_on: params.scheduling.dueOn || undefined,
        followers: params.followersList || undefined,
        liked: params.taskStatus.isLiked,
        name: params.name,
        notes: params.notes,
        parent: params.parentId || undefined,
        projects: params.projectList || undefined,
        resource_subtype: params.resourceSubtype || undefined,
        start_at: params.scheduling.startAt || undefined,
        start_on: params.scheduling.startOn || undefined,
        workspace: params.workspaceId || undefined,
        html_notes: params.htmlNotes || undefined,
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
});
