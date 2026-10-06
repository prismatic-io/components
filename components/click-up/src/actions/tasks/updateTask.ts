import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateTaskExamplePayload } from "../../examplePayloads";
import { updateTaskInputs } from "../../inputs";
import { updateTaskOutputSchema } from "../../outputSchemas";
import type {
  Assignees,
  UpdateTaskBody,
  UpdateTaskQueryParams,
} from "../../types";
export const updateTask = action({
  display: {
    label: "Update Task",
    description: "Update an existing task.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: updateTaskOutputSchema,
  }),
  examplePayload: updateTaskExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      taskId,
      customTaskIds,
      teamId,
      name,
      description,
      status,
      priority,
      schedule,
      parent,
      addAssignees,
      removeAssignees,
      archived,
      markdownDescription,
    },
  ) => {
    const assignees: Assignees = {
      add: addAssignees?.length ? addAssignees : [],
      rem: removeAssignees?.length ? removeAssignees : [],
    };
    const client = createClickUpClient(connection, context.debug.enabled);
    const body: UpdateTaskBody = {
      name,
      description,
      status,
      priority,
      due_date: schedule?.dueDate,
      due_date_time: schedule?.dueDateTime,
      parent,
      time_estimate: schedule?.timeEstimate,
      start_date: schedule?.startDate,
      start_date_time: schedule?.startDateTime,
      assignees,
      archived: archived,
      markdown_description: markdownDescription,
    };
    const params: UpdateTaskQueryParams = {
      custom_task_ids: customTaskIds,
      ...(teamId?.length && { team_id: teamId }),
    };
    const { data } = await client.put(`/task/${taskId}`, body, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async (_context, { name }) => ({
    data: {
      ...updateTaskExamplePayload.data,
      ...(name && { name }),
    },
  }),
  inputs: updateTaskInputs,
});
