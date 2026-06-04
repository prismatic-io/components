import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { deleteTeamExamplePayload } from "../../examplePayloads";
import { connectionInput, groupId } from "../../inputs";

export const deleteTeam = action({
  display: {
    label: "Delete Team",
    description: "Remove a user group (Team) from a workspace.",
  },
  examplePayload: deleteTeamExamplePayload,
  perform: async (context, { clickUpConnection, groupId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.delete(`/group/${groupId}`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    groupId,
  },
});
