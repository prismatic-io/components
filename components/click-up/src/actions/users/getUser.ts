import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getUserExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId, userId } from "../../inputs";

const teamId = getTeamId(true);

export const getUser = action({
  display: {
    label: "Get User",
    description: "Retrieve information about a user in a workspace.",
  },
  examplePayload: getUserExamplePayload,
  perform: async (context, { teamId, userId, clickUpConnection }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get(`/team/${teamId}/user/${userId}`);
    return { data };
  },
  inputs: { teamId, userId, clickUpConnection: connectionInput },
});
