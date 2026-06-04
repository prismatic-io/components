import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createTimeEntryExamplePayload } from "../../examplePayloads";
import {
  assigneeTimeEntry,
  connectionInput,
  getBillable,
  getCustomTaskIds,
  getCustomTeamId,
  getDescription,
  getDuration,
  getStart,
  getTaskId,
  getTeamId,
  tagsCode,
} from "../../inputs";
import type { CreateTimeEntryBody } from "./types/CreateTimeEntryBody";
import type { CreateTimeEntryQueryParams } from "./types/CreateTimeEntryQueryParams";

const teamId = getTeamId(true);
const customTaskIds = getCustomTaskIds(true);
const customTeamId = getCustomTeamId(true);
const description = getDescription(true, "Description");
const start = getStart(true, "Start time");
const billable = getBillable(true, "Billable", false);
const duration = getDuration(true, "Duration");
const taskId = getTaskId(true, "Associate a time entry with a task by ID");

export const createTimeEntry = action({
  display: {
    label: "Create Time Entry",
    description: "Create a time entry.",
  },
  examplePayload: createTimeEntryExamplePayload,
  perform: async (
    context,
    {
      clickUpConnection,
      teamId,
      customTaskIds,
      customTeamId,
      description,
      start,
      billable,
      duration,
      assigneeTimeEntry,
      taskId,
      tagsCode,
    }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const queryParams: CreateTimeEntryQueryParams = {
      custom_task_ids: customTaskIds,
      team_id: customTeamId,
    };

    const body: CreateTimeEntryBody = {
      description,
      tags: JSON.parse(tagsCode).tags,
      start,
      billable,
      duration,
      assignee: assigneeTimeEntry,
      tid: taskId,
    };

    const { data } = await client.post(`/team/${teamId}/time_entries`, body, {
      params: queryParams,
    });

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    customTaskIds,
    customTeamId,
    description,
    start,
    billable,
    duration,
    assigneeTimeEntry,
    taskId,
    tagsCode,
  },
});
