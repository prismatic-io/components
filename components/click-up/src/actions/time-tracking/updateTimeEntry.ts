import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateTimeEntryExamplePayload } from "../../examplePayloads";
import {
  assigneeTimeEntry,
  connectionInput,
  getBillable,
  getCustomTaskIds,
  getCustomTeamId,
  getDescription,
  getDuration,
  getEnd,
  getStart,
  getTaskId,
  getTeamId,
  tagAction,
  tagsCode,
  timerId,
} from "../../inputs";
import type { CreateTimeEntryQueryParams } from "./types/CreateTimeEntryQueryParams";
import type { UpdateTimeEntryBody } from "./types/UpdateTimeEntryBody";

const teamId = getTeamId(true);
const customTaskIds = getCustomTaskIds(true);
const customTeamId = getCustomTeamId(true);
const description = getDescription(true, "Description");
const start = getStart(true, "Start time");
const end = getEnd(true, "End time");
const billable = getBillable(true, "Billable", false);
const duration = getDuration(true, "Duration");
const taskId = getTaskId(true, "Associate a time entry with a task by ID");

export const updateTimeEntry = action({
  display: {
    label: "Update Time Entry",
    description: "Update the details of a time entry.",
  },
  examplePayload: updateTimeEntryExamplePayload,
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
      taskId,
      timerId,
      tagAction,
      end,
      tagsCode,
    }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const queryParams: CreateTimeEntryQueryParams = {
      custom_task_ids: customTaskIds,
      team_id: customTeamId,
    };
    const body: UpdateTimeEntryBody = {
      description,
      tags: JSON.parse(tagsCode).tags,
      start,
      billable,
      duration,
      tid: taskId,
      tag_action: tagAction,
      end,
    };

    const { data } = await client.put(`/team/${teamId}/time_entries/${timerId}`, body, {
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
    timerId,
    tagAction,
    end,
    tagsCode,
  },
});
