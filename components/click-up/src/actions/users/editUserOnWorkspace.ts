import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { editUserOnWorkspaceExamplePayload } from "../../examplePayloads";
import { admin, connectionInput, customRoleId, getTeamId, userId } from "../../inputs";

const teamId = getTeamId(true);

export const editUserOnWorkspace = action({
  display: {
    label: "Edit User on Workspace",
    description: "Update a user's name and role on a workspace.",
  },
  examplePayload: editUserOnWorkspaceExamplePayload,
  perform: async (context, { teamId, clickUpConnection, admin, customRoleId, userId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body = {
      username: "User Name",
      admin,
      custom_role_id: customRoleId,
    };

    const { data } = await client.put(`/team/${teamId}/user/${userId}`, body);
    return { data };
  },
  inputs: {
    teamId,
    clickUpConnection: connectionInput,
    admin,
    customRoleId,
    userId,
  },
});
