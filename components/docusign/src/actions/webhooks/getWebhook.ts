import { action, outputSchema } from "@prismatic-io/spectral";
import { getWebhookOutputSchema } from "../../outputSchemas";
import { getDocuSignClient } from "../../client";
import { getWebhookInputs } from "../../inputs";
import { getWebhookExamplePayload } from "../../examplePayloads";

export const getWebhook = action({
  display: {
    label: "Get Webhook",
    description: "Retrieve a single webhook.",
  },
  performSafety: "safe",
  perform: async (context, { connection, connectId }) => {
    const client = await getDocuSignClient(
      connection,
      true,
      context.debug.enabled,
    );
    const { data } = await client.get(`/connect/${connectId}`);
    return { data };
  },
  inputs: getWebhookInputs,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: getWebhookOutputSchema,
  }),
  examplePayload: getWebhookExamplePayload,
});
