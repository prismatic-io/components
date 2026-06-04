import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeUserFromWorkspaceExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId, userId } from "../../inputs";

const teamId = getTeamId(true);

export const removeUserFromWorkspace = action({
  display: {
    label: "Remove User from Workspace",
    description: "Deactivate a user from a workspace.",
  },
  examplePayload: removeUserFromWorkspaceExamplePayload,
  perform: async (context, { teamId, clickUpConnection, userId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.delete(`/team/${teamId}/user/${userId}`);
    return { data };
  },
  inputs: {
    teamId,
    clickUpConnection: connectionInput,
    userId,
  },
});
