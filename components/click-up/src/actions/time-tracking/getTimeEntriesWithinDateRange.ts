import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getTimeEntriesWithinDateRangeExamplePayload } from "../../examplePayloads";
import { getTimeEntriesWithinDateRangeInputs } from "../../inputs";
import { getTimeEntriesWithinDateRangeOutputSchema } from "../../outputSchemas";
import type { TimeEntriesDateRangeQueryParams } from "../../types";
import { addToObjectIfContent, booleanToString } from "../../util";
export const getTimeEntriesWithinDateRange = action({
  display: {
    label: "Get Time Entries Within Date Range",
    description:
      "List time entries filtered by start and end date. By default, returns entries from the last 30 days created by the authenticated user.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getTimeEntriesWithinDateRangeOutputSchema,
  }),
  examplePayload: getTimeEntriesWithinDateRangeExamplePayload,
  performSafety: "notAllowed",
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
    },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
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
  examplePerform: async () => getTimeEntriesWithinDateRangeExamplePayload,
  inputs: getTimeEntriesWithinDateRangeInputs,
});
