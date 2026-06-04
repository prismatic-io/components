import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteTimeEntryExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId, timerId } from "../../inputs";

const teamId = getTeamId(true);

export const deleteTimeEntry = action({
  display: {
    label: "Delete Time Entry",
    description: "Delete a time entry from a workspace.",
  },
  examplePayload: deleteTimeEntryExamplePayload,
  perform: async (context, { clickUpConnection, teamId, timerId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.delete(`/team/${teamId}/time_entries/${timerId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    timerId,
  },
});
