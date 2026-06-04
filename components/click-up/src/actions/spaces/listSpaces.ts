import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { listSpacesExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId } from "../../inputs";

const teamId = getTeamId(true);

export const listSpaces = action({
  display: {
    label: "List Spaces",
    description: "List the spaces available in a workspace.",
  },
  examplePayload: listSpacesExamplePayload,
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get(`/team/${teamId}/space`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
  },
});
