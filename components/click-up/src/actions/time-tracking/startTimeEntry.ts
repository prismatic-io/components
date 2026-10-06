import { action, outputSchema, util } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { startTimeEntryExamplePayload } from "../../examplePayloads";
import { startTimeEntryInputs } from "../../inputs";
import { startTimeEntryOutputSchema } from "../../outputSchemas";
import type {
  CreateTimeEntryQueryParams,
  StartTimeEntryBody,
} from "../../types";
export const startTimeEntry = action({
  display: {
    label: "Start Time Entry",
    description: "Start a timer for the authenticated user.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: startTimeEntryOutputSchema,
  }),
  examplePayload: startTimeEntryExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      clickUpConnection,
      teamId,
      customTaskIds,
      customTeamId,
      description,
      billable,
      taskId,
      tagNamesArray,
    },
  ) => {
    const tags = (tagNamesArray ?? []).map((tagName) => ({
      name: util.types.toString(tagName),
    }));
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
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
    const { data } = await client.post(
      `/team/${teamId}/time_entries/start`,
      body,
      {
        params: queryParams,
      },
    );
    return {
      data,
    };
  },
  examplePerform: async () => startTimeEntryExamplePayload,
  inputs: startTimeEntryInputs,
});
