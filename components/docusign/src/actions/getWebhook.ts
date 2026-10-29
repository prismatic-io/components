import { action } from "@prismatic-io/spectral";
import { getDocuSignClient } from "../client";
import { connection, connectId } from "../inputs";
import { getWebhookPayload } from "../examplePayloads";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieve a single webhook.",
  },
  perform: async (context, { connection, connectId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/connect/${connectId}`);
    return { data };
  },
  inputs: {
    connection,
    connectId,
  },
  examplePayload: getWebhookPayload,
});
