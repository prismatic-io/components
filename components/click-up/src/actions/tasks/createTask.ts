import { action, util } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createTaskExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  customFields,
  getAssignees,
  getCheckRequiredCustomFields,
  getCustomTaskIds,
  getDescription,
  getDueDateInt,
  getDueDateTime,
  getLinksTo,
  getlistId,
  getNotifyAll,
  getParent,
  getPriority,
  getStartDateInt,
  getStartDateTime,
  getStatus,
  getTags,
  getTaskName,
  getTeamId,
  getTimeEstimate,
  markdownDescription,
} from "../../inputs";
import type { CreateTaskBody } from "./types/CreateTaskBody";
import type { CreateTaskQueryParams } from "./types/CreateTaskQueryParams";
import type { CustomField } from "./types/CustomField";

const listId = getlistId(true, "List ID");
const customTaskIds = getCustomTaskIds(
  false,
  "If you want to reference a task by it's custom task id, this value must be true."
);
const teamId = getTeamId(false, "Only used when the custom_task_ids parameter is set to true.");
const name = getTaskName(true, "Task Name");
const description = getDescription(false, "Task Description");
const assignees = getAssignees(false, "Task Assignees");
const tags = getTags(false, "Task Tags");
const status = getStatus(false, "Task Status");
const priority = getPriority(false, "Task Priority");

const dueDate = getDueDateInt(false, "Task Due Date", "1508369194377");
const dueDateTime = getDueDateTime(false, "Task Due Date Time", false);
const timeEstimate = getTimeEstimate(false, "Task Time Estimate", "8640000");
const startDate = getStartDateInt(false, "Task Start Date", "1567780450202");
const startDateTime = getStartDateTime(false, "Task Start Date Time", false);
const notifyAll = getNotifyAll(
  false,
  "If notify_all is true, notifications will be sent to everyone including the creator of the comment.",
  true
);
const parent = getParent(
  false,
  "You can create a subtask by including an existing task ID. The parent task ID you include cannot be a subtask, and must be in the same List specified in the path parameter."
);
const linksTo = getLinksTo(false, "Include a task ID to create a linked dependency with your new task.");

const checkRequiredCustomFields = getCheckRequiredCustomFields(
  false,
  "When creating a task via API any required Custom Fields are ignored by default (false).",
  false
);

export const createTask = action({
  display: {
    label: "Create Task",
    description: "Create a new task in a list.",
  },
  examplePayload: createTaskExamplePayload,
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
      dueDate,
      dueDateTime,
      timeEstimate,
      startDate,
      startDateTime,
      notifyAll,
      parent,
      linksTo,
      checkRequiredCustomFields,
      customFields,
      markdownDescription,
    }
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
      markdown_description: markdownDescription,
      ...(description?.length && { description }),
      ...(assignees?.length && { assignees }),
      ...(tags?.length && { tags }),
      ...(status?.length && { status }),
      ...(priority !== undefined && { priority }),
      ...(dueDate !== undefined && { due_date: dueDate }),
      due_date_time: dueDateTime,
      ...(timeEstimate !== undefined && { time_estimate: timeEstimate }),
      ...(startDate !== undefined && { start_date: startDate }),
      start_date_time: startDateTime,
      notify_all: notifyAll,
      ...(parent?.length && { parent }),
      ...(linksTo?.length && { links_to: linksTo }),
      check_required_custom_fields: checkRequiredCustomFields,
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
  inputs: {
    connection: connectionInput,
    listId,
    customTaskIds,
    teamId,
    name,
    description,
    markdownDescription,
    assignees,
    tags,
    status,
    priority,
    dueDate,
    dueDateTime,
    timeEstimate,
    startDate,
    startDateTime,
    notifyAll,
    parent,
    linksTo,
    checkRequiredCustomFields,
    customFields,
  },
});
