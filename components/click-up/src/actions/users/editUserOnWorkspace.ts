import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { editUserOnWorkspaceExamplePayload } from "../../examplePayloads";
import { editUserOnWorkspaceInputs } from "../../inputs";
import { editUserOnWorkspaceOutputSchema } from "../../outputSchemas";
import type { GetUserResponse } from "../../types";
export const editUserOnWorkspace = action({
  display: {
    label: "Edit User on Workspace",
    description: "Update a user's name and role on a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: editUserOnWorkspaceOutputSchema,
  }),
  examplePayload: editUserOnWorkspaceExamplePayload,
  performSafety: "notAllowed",
  perform: async (
    context,
    { teamId, clickUpConnection, admin, customRoleId, userId, username },
  ) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const currentUsername = username
      ? undefined
      : (await client.get<GetUserResponse>(`/team/${teamId}/user/${userId}`))
          .data.member.user.username;
    const body = {
      username: username ?? currentUsername,
      admin,
      custom_role_id: customRoleId,
    };
    const { data } = await client.put(`/team/${teamId}/user/${userId}`, body);
    return { data };
  },
  examplePerform: async () => editUserOnWorkspaceExamplePayload,
  inputs: editUserOnWorkspaceInputs,
});
