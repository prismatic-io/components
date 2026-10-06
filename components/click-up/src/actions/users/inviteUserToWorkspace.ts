import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { inviteUserToWorkspaceExamplePayload } from "../../examplePayloads";
import { inviteUserToWorkspaceInputs } from "../../inputs";
import { inviteUserToWorkspaceOutputSchema } from "../../outputSchemas";
export const inviteUserToWorkspace = action({
  display: {
    label: "Invite User to Workspace",
    description: "Invite someone to join a workspace as a member.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: inviteUserToWorkspaceOutputSchema,
  }),
  examplePayload: inviteUserToWorkspaceExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { teamId, clickUpConnection, email, admin, customRoleId },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const body = {
      email,
      admin,
      custom_role_id: customRoleId,
    };
    const { data } = await client.post(`/team/${teamId}/user`, body);
    return { data };
  },
  examplePerform: async () => inviteUserToWorkspaceExamplePayload,
  inputs: inviteUserToWorkspaceInputs,
});
