import { action, outputSchema } from "@prismatic-io/spectral";
import { createClickUpClient } from "../../client";
import { getWebhooksExamplePayload } from "../../examplePayloads";
import { getWebhooksInputs } from "../../inputs";
import { getWebhooksOutputSchema } from "../../outputSchemas";
export const getWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all webhooks for a workspace.",
  },
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWebhooksOutputSchema,
  }),
  examplePayload: getWebhooksExamplePayload,
  performSafety: "safe",
  perform: async (context, { clickUpConnection, teamId }) => {
    const client = createClickUpClient(
      clickUpConnection,
      context.debug.enabled,
    );
    const { data } = await client.get(`/team/${teamId}/webhook`);
    return {
      data,
    };
  },
  inputs: getWebhooksInputs,
});
