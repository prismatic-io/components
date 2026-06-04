import { action } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getWebhooksExamplePayload } from "../../examplePayloads";
import { connectionInput, getTeamId } from "../../inputs";

const teamId = getTeamId(true);

export const getWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all webhooks for a workspace.",
  },
  examplePayload: getWebhooksExamplePayload,
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(clickUpConnection, context.debug.enabled);

    const { data } = await client.get(`/team/${teamId}/webhook`);

    return {
      data,
    };
  },
  inputs: {
    clickUpConnection: connectionInput,
    teamId,
  },
});
