import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteTeamExamplePayload } from "../../examplePayloads";
import { deleteTeamInputs } from "../../inputs";
export const deleteTeam = action({
  display: {
    label: "Delete Team",
    description: "Remove a user group (Team) from a workspace.",
  },
  examplePayload: deleteTeamExamplePayload,
  performSafety: "notAllowed",
  perform: async (context, { clickUpConnection, groupId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.delete(`/group/${groupId}`);
    return {
      data,
    };
  },
  examplePerform: async () => deleteTeamExamplePayload,
  inputs: deleteTeamInputs,
});
