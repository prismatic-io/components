import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { removeGuestFromWorkspaceExamplePayload } from "../../examplePayloads";
import { removeGuestFromWorkspaceInputs } from "../../inputs";
import { removeGuestFromWorkspaceOutputSchema } from "../../outputSchemas";
export const removeGuestFromWorkspace = action({
  display: {
    label: "Remove Guest from Workspace",
    description: "Revoke a guest's access to a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: removeGuestFromWorkspaceOutputSchema,
  }),
  examplePayload: removeGuestFromWorkspaceExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, teamId, guestId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/team/${teamId}/guest/${guestId}`);
    return {
      data,
    };
  },
  examplePerform: async () => removeGuestFromWorkspaceExamplePayload,
  inputs: removeGuestFromWorkspaceInputs,
});
