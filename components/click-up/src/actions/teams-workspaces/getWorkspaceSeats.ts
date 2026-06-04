import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getWorkspaceSeatsExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId } from "../../inputs";

const teamId = getTeamId(true);

export const getWorkspaceSeats = action({
  display: {
    label: "Get Workspace Seats",
    description: "Retrieve the used, total, and available member and guest seats for a workspace.",
  },
  examplePayload: getWorkspaceSeatsExamplePayload,
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get(`/team/${teamId}/seats`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
  },
});
