import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWebhooksResponse } from "../../examplePayloads";
import { version, webhookConnection } from "../../inputs";
import { clientCredentialsConnection, getAppId } from "../../util";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "List all webhooks for the current application.",
  },
  perform: async (context, { connection, version }) => {
    clientCredentialsConnection(connection);
    const client = createClient(connection, context.debug.enabled, version);
    const appId = getAppId(connection);
    const { data } = await client.get(`/${appId}/subscriptions`);

    return {
      data,
    };
  },
  inputs: {
    version,
    connection: webhookConnection,
  },
  examplePayload: listWebhooksResponse,
});
