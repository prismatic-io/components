import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateTaskExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  getAddAssignees,
  getArchived,
  getCustomTaskIds,
  getDescription,
  getDueDateInt,
  getDueDateTime,
  getParent,
  getPriority,
  getRemoveAssignees,
  getStartDateInt,
  getStartDateTime,
  getStatus,
  getTaskId,
  getTaskName,
  getTeamId,
  getTimeEstimate,
  markdownDescription,
} from "../../inputs";
import type { Assignees } from "./types/Assignees";
import type { UpdateTaskBody } from "./types/UpdateTaskBody";
import type { UpdateTaskQueryParams } from "./types/UpdateTaskQueryParams";

const taskId = getTaskId(true, "Task ID");
const customTaskIds = getCustomTaskIds(
  false,
  "If you want to reference a task by it's custom task id, this value must be true."
);
const teamId = getTeamId(false, "Only used when the custom_task_ids parameter is set to true.");
const name = getTaskName(false, "Task Name");
const description = getDescription(false, "Task Description");

const status = getStatus(false, "Task Status");
const priority = getPriority(false, "Task Priority");

const dueDate = getDueDateInt(false, "Task Due Date", "1508369194377");
const dueDateTime = getDueDateTime(false, "Task Due Date Time", false);
const parent = getParent(
  false,
  'You can move a subtask to another parent task by including "parent" with a valid task id.'
);

const timeEstimate = getTimeEstimate(false, "Task Time Estimate", "8640000");
const startDate = getStartDateInt(false, "Task Start Date", "1567780450202");
const startDateTime = getStartDateTime(false, "Task Start Date Time", false);

const addAssignees = getAddAssignees(false, "Add Assignee");
const removeAssignees = getRemoveAssignees(false, "Remove Assignee");
const archived = getArchived(false, "Include Archived?", false);

export const updateTask = action({
  display: {
    label: "Update Task",
    description: "Update an existing task.",
  },
  examplePayload: updateTaskExamplePayload,
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
      dueDate,
      dueDateTime,
      parent,
      timeEstimate,
      startDate,
      startDateTime,
      addAssignees,
      removeAssignees,
      archived,
      markdownDescription,
    }
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
      due_date: dueDate,
      due_date_time: dueDateTime,
      parent,
      time_estimate: timeEstimate,
      start_date: startDate,
      start_date_time: startDateTime,
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
  inputs: {
    connection: connectionInput,
    taskId,
    customTaskIds,
    teamId,
    name,
    description,
    markdownDescription,
    status,
    priority,
    dueDate,
    dueDateTime,
    parent,
    timeEstimate,
    startDate,
    startDateTime,
    addAssignees,
    removeAssignees,
    archived,
  },
});
