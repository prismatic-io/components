import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { inviteUserToWorkspaceExamplePayload } from "../../examplePayloads";
import { admin, connectionInput, customRoleId, getEmail, getTeamId } from "../../inputs";

const teamId = getTeamId(true);
const email = getEmail(true, "Email address of User being added");

export const inviteUserToWorkspace = action({
  display: {
    label: "Invite User to Workspace",
    description: "Invite someone to join a workspace as a member.",
  },
  examplePayload: inviteUserToWorkspaceExamplePayload,
  perform: async (context, { teamId, clickUpConnection, email, admin, customRoleId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);
    const body = {
      email,
      admin,
      custom_role_id: customRoleId,
    };

    const { data } = await client.post(`/team/${teamId}/user`, body);
    return { data };
  },
  inputs: {
    teamId,
    clickUpConnection: connectionInput,
    email,
    admin,
    customRoleId,
  },
});
