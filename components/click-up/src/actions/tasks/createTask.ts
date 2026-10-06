import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createTaskExamplePayload } from "../../examplePayloads";
import { createTaskInputs } from "../../inputs";
import { createTaskOutputSchema } from "../../outputSchemas";
import type {
  CreateTaskBody,
  CreateTaskQueryParams,
  CustomFieldValue as CustomField,
} from "../../types";
export const createTask = action({
  display: {
    label: "Create Task",
    description: "Create a new task in a list.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createTaskOutputSchema,
  }),
  examplePayload: createTaskExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      listId,
      customTaskIds,
      teamId,
      name,
      description,
      assignees,
      tags,
      status,
      priority,
      schedule,
      parent,
      linksTo,
      additionalFields,
      customFields,
    },
  ) => {
    const newCustomFields: CustomField[] = [];
    if (customFields?.length) {
      for (const obj of customFields) {
        newCustomFields.push({
          id: obj.key,
          value: util.types.toString(obj.value),
        });
      }
    }
    const client = createClickUpClient(connection, context.debug.enabled);
    const body: CreateTaskBody = {
      name,
      markdown_description: additionalFields?.markdownDescription,
      ...(description?.length && { description }),
      ...(assignees?.length && { assignees }),
      ...(tags?.length && { tags }),
      ...(status?.length && { status }),
      ...(priority !== undefined && { priority }),
      ...(schedule?.dueDate !== undefined && { due_date: schedule.dueDate }),
      due_date_time: schedule?.dueDateTime,
      ...(schedule?.timeEstimate !== undefined && {
        time_estimate: schedule.timeEstimate,
      }),
      ...(schedule?.startDate !== undefined && {
        start_date: schedule.startDate,
      }),
      start_date_time: schedule?.startDateTime,
      notify_all: additionalFields?.notifyAll,
      ...(parent?.length && { parent }),
      ...(linksTo?.length && { links_to: linksTo }),
      check_required_custom_fields: additionalFields?.checkRequiredCustomFields,
      ...(customFields?.length && { custom_fields: newCustomFields }),
    };
    const params: CreateTaskQueryParams = {
      custom_task_ids: customTaskIds,
      ...(teamId?.length && { team_id: teamId }),
    };
    const { data } = await client.post(`/list/${listId}/task`, body, {
      params,
    });
    return {
      data,
    };
  },
  examplePerform: async (_context, { name }) => ({
    data: {
      ...createTaskExamplePayload.data,
      name,
    },
  }),
  inputs: createTaskInputs,
});
