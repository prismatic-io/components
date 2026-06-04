import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeGuestFromWorkspaceExamplePayload } from "../../examplePayloads";
import { connectionInput, getGuestId, getTeamId } from "../../inputs";

const teamId = getTeamId(true);
const guestId = getGuestId(true, "Guest ID");

export const removeGuestFromWorkspace = action({
  display: {
    label: "Remove Guest from Workspace",
    description: "Revoke a guest's access to a workspace.",
  },
  examplePayload: removeGuestFromWorkspaceExamplePayload,
  perform: async (context, { clickUpConnection, teamId, guestId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.delete(`/team/${teamId}/guest/${guestId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
    guestId,
  },
});
