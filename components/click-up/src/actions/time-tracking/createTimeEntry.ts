import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createTimeEntryExamplePayload } from "../../examplePayloads";
import { createTimeEntryInputs } from "../../inputs";
import type {
  CreateTimeEntryBody,
  CreateTimeEntryQueryParams,
} from "../../types";
export const createTimeEntry = action({
  display: {
    label: "Create Time Entry",
    description: "Create a time entry.",
  },
  examplePayload: createTimeEntryExamplePayload,
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
      assigneeTimeEntry,
      taskId,
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
  examplePerform: async () => createTimeEntryExamplePayload,
  inputs: createTimeEntryInputs,
});
