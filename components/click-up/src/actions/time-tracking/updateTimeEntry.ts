import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { updateTimeEntryExamplePayload } from "../../examplePayloads";
import { updateTimeEntryInputs } from "../../inputs";
import type {
  CreateTimeEntryQueryParams,
  UpdateTimeEntryBody,
} from "../../types";
export const updateTimeEntry = action({
  display: {
    label: "Update Time Entry",
    description: "Update the details of a time entry.",
  },
  examplePayload: updateTimeEntryExamplePayload,
  performSafety: "notAllowed",
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
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
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
    const { data } = await client.put(
      `/team/${teamId}/time_entries/${timerId}`,
      body,
      {
        params: queryParams,
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => updateTimeEntryExamplePayload,
  inputs: updateTimeEntryInputs,
});
