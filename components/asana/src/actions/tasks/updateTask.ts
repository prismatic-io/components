import { action, outputSchema } from "@prismatic-io/spectral";
import { createAsanaClient } from "../../client";
import { updateTaskExamplePayload } from "../../examplePayloads";
import { updateTaskInputs } from "../../inputs";
import { taskResponseSchema } from "../../outputSchemas";
export const updateTask = action({
  display: {
    label: "Update Task",
    description: "Update the information and metadata of the given task.",
  },
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = await createAsanaClient(
      params.asanaConnection,
      context.debug.enabled,
    );
    const taskData = {
      data: {
        approval_status: params.taskStatus.approvalStatus,
        assignee: params.assigneeId,
        assignee_section: params.assigneeSectionId,
        assignee_status: params.taskStatus.assigneeStatus,
        completed: params.taskStatus.isCompleted,
        completed_by: params.taskStatus.completedBy
          ? { name: params.taskStatus.completedBy }
          : undefined,
        due_at: params.scheduling.dueAt,
        due_on: params.scheduling.dueOn,
        liked: params.taskStatus.isLiked,
        name: params.name,
        notes: params.notes,
        parent: params.parentId,
        resource_subtype: params.resourceSubtype,
        start_at: params.scheduling.startAt,
        start_on: params.scheduling.startOn,
        workspace: params.workspaceId,
        html_notes: params.htmlNotes,
      },
    };
    const { data } = await client.put(`/tasks/${params.taskId}`, taskData, {
      params: {
        opt_fields: params.optFields,
      },
    });
    return { data };
  },
  inputs: updateTaskInputs,
  examplePayload: updateTaskExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: taskResponseSchema,
  }),
});
