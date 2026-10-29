import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { WEBHOOK_DEFAULTS } from "../../constants";
import { reposCreateWebhookExamplePayload } from "../../examplePayloads";
import { reposCreateWebhookInputs } from "../../inputs";
import { reposCreateWebhookOutputSchema } from "../../outputSchemas";

export const reposCreateWebhook = action({
  display: {
    label: "Create Repository Webhook",
    description: "Create a repository webhook.",
  },
  examplePayload: reposCreateWebhookExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: reposCreateWebhookOutputSchema,
  }),
  performSafety: "notAllowed",
  perform: async (context, params) => {
    const client = createClient(params.connection, context.debug.enabled);
    const { data } = await client.post(
      `/repos/${params.owner}/${params.repo}/hooks`,
      {
        name: WEBHOOK_DEFAULTS.name,
        config: {
          url: params.callbackUrl,
          content_type: WEBHOOK_DEFAULTS.contentType,
          insecure_ssl: WEBHOOK_DEFAULTS.insecureSsl,
          secret: params.webhookSecret,
        },
        events: params.events,
        active: true,
      },
    );
    return { data };
  },
  examplePerform: async (_context, { callbackUrl, events }) => ({
    data: {
      ...reposCreateWebhookExamplePayload.data,
      events,
      config: {
        ...reposCreateWebhookExamplePayload.data.config,
        url: callbackUrl,
      },
    },
  }),
  inputs: reposCreateWebhookInputs,
});
