import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeUserFromWorkspaceExamplePayload } from "../../examplePayloads";
import { removeUserFromWorkspaceInputs } from "../../inputs";
import { removeUserFromWorkspaceOutputSchema } from "../../outputSchemas";
export const removeUserFromWorkspace = action({
  display: {
    label: "Remove User from Workspace",
    description: "Deactivate a user from a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeUserFromWorkspaceOutputSchema,
  }),
  examplePayload: removeUserFromWorkspaceExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { teamId, clickUpConnection, userId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/team/${teamId}/user/${userId}`);
    return { data };
  },
  examplePerform: async () => removeUserFromWorkspaceExamplePayload,
  inputs: removeUserFromWorkspaceInputs,
});
