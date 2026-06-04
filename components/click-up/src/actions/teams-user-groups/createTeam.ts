import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { createTeamExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId, members, name } from "../../inputs";

const teamId = getTeamId(true);

export const createTeam = action({
  display: {
    label: "Create Team",
    description: "Create a user group (Team) of users that can be assigned to items in a workspace.",
  },
  examplePayload: createTeamExamplePayload,
  perform: async (context, { clickUpConnection, teamId, name, members }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body = {
      name,
      members,
    };

    const { data } = await client.post(`/team/${teamId}/group`, body);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    name,
    members,
  },
});
