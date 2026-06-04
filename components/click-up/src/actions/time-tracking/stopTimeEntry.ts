import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { stopTimeEntryExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId } from "../../inputs";

const teamId = getTeamId(true);

export const stopTimeEntry = action({
  display: {
    label: "Stop Time Entry",
    description: "Stop the timer that is currently running for the authenticated user.",
  },
  examplePayload: stopTimeEntryExamplePayload,
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.post(`/team/${teamId}/time_entries/stop`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
  },
});
