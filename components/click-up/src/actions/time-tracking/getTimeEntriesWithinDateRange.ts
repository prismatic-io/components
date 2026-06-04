import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTimeEntriesWithinDateRangeExamplePayload } from "../../examplePayloads";
import { addToObjectIfContent, booleanToString } from "../../helpers";
import {
  connectionInput,
  endDate,
  getAssignee,
  getCustomTaskIds,
  getCustomTeamId,
  getFolderId,
  getlistId,
  getSpaceId,
  getTaskId,
  getTeamId,
  includeLocationNames,
  includeTaskTags,
  startDate,
} from "../../inputs";
import type { TimeEntriesDateRangeQueryParams } from "./types/TimeEntriesDateRangeQueryParams";

const spaceId = getSpaceId(false, "Only include time entries associated with tasks in a specific Space.");
const teamId = getTeamId(true);
const listId = getlistId(false);
const folderId = getFolderId(false);
const taskId = getTaskId(false);
const customTeamId = getCustomTeamId(false);
const customTaskIds = getCustomTaskIds(false);
const assignee = getAssignee(false, "Filter by User ID");

export const getTimeEntriesWithinDateRange = action({
  display: {
    label: "Get Time Entries Within Date Range",
    description:
      "List time entries filtered by start and end date. By default, returns entries from the last 30 days created by the authenticated user.",
  },
  examplePayload: getTimeEntriesWithinDateRangeExamplePayload,
  perform: async (
    context,
    {
      clickUpConnection,
      teamId,
      startDate,
      endDate,
      assignee,
      includeTaskTags,
      includeLocationNames,
      spaceId,
      folderId,
      listId,
      taskId,
      customTaskIds,
      customTeamId,
    }
  ) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const queryParams: TimeEntriesDateRangeQueryParams = addToObjectIfContent({
      start_date: startDate,
      end_date: endDate,
      assignee,
      include_task_tags: booleanToString(includeTaskTags),
      include_location_names: booleanToString(includeLocationNames),
      space_id: spaceId,
      folder_id: folderId,
      list_id: listId,
      task_id: taskId,
      custom_task_ids: booleanToString(customTaskIds),
      team_id: customTeamId,
    });

    const { data } = await client.get(`/team/${teamId}/time_entries`, {
      params: queryParams,
    });

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    startDate,
    endDate,
    assignee,
    includeTaskTags,
    includeLocationNames,
    spaceId,
    folderId,
    listId,
    taskId,
    customTaskIds,
    customTeamId,
  },
});
