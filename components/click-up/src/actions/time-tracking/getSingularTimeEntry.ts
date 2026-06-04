import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getSingularTimeEntryExamplePayload } from "../../examplePayloads";
import { addToObjectIfContent, booleanToString } from "../../helpers";
import { connectionInput, getTeamId, includeLocationNames, includeTaskTags, timerId } from "../../inputs";
import type { SingularTimeEntryQueryParams } from "./types/SingularTimeEntryQueryParams";

const teamId = getTeamId(true);

export const getSingularTimeEntry = action({
  display: {
    label: "Get Time Entry",
    description: "Retrieve a single time entry.",
  },
  examplePayload: getSingularTimeEntryExamplePayload,
  perform: async (context, { clickUpConnection, teamId, timerId, includeTaskTags, includeLocationNames }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const queryParams: SingularTimeEntryQueryParams = addToObjectIfContent({
      include_task_tags: booleanToString(includeTaskTags),
      include_location_names: booleanToString(includeLocationNames),
    });

    const { data } = await client.get(`/team/${teamId}/time_entries/${timerId}`, {
      params: queryParams,
    });

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    timerId,
    includeTaskTags,
    includeLocationNames,
  },
});
