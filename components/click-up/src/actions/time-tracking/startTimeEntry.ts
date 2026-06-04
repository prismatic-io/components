import { action, util } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { startTimeEntryExamplePayload } from "../../examplePayloads";
import {
  connectionInput,
  getBillable,
  getCustomTaskIds,
  getCustomTeamId,
  getDescription,
  getTagNamesArray,
  getTaskId,
  getTeamId,
} from "../../inputs";
import type { CreateTimeEntryQueryParams } from "./types/CreateTimeEntryQueryParams";
import type { StartTimeEntryBody } from "./types/StartTimeEntryBody";

const teamId = getTeamId(true);
const customTaskIds = getCustomTaskIds(false);
const customTeamId = getCustomTeamId(false);
const description = getDescription(true, "Description");
const billable = getBillable(true, "Billable", false);
const taskId = getTaskId(true, "Associate a time entry with a task by ID");
const tagNamesArray = getTagNamesArray(true, "Add a tag name");

export const startTimeEntry = action({
  display: {
    label: "Start Time Entry",
    description: "Start a timer for the authenticated user.",
  },
  examplePayload: startTimeEntryExamplePayload,
  perform: async (
    context,
    { clickUpConnection, teamId, customTaskIds, customTeamId, description, billable, taskId, tagNamesArray }
  ) => {
    const tags = tagNamesArray.map((tagName) => ({
      name: util.types.toString(tagName),
    }));
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const queryParams: CreateTimeEntryQueryParams = {
      custom_task_ids: customTaskIds,
      team_id: customTeamId,
    };
    const body: StartTimeEntryBody = {
      description,
      tags,
      tid: taskId,
      billable,
    };

    const { data } = await client.post(`/team/${teamId}/time_entries/start`, body, {
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
    billable,
    taskId,
    tagNamesArray,
  },
});
