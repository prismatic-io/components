import { action, outputSchema } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createWebhookInputs } from "../../inputs";
import { createWebhook as createWebhookFn } from "../../util";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookOutputSchema } from "../../outputSchemas";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a new webhook.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    {
      connection,
      subscriptionUrl,
      eventAction,
      eventObject,
      userId,
      httpAuthUser,
      httpAuthPassword,
      version,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await createWebhookFn(client, {
      subscriptionUrl,
      eventAction,
      eventObject,
      userId,
      httpAuthUser,
      httpAuthPassword,
      version,
    });
    return { data };
  },
  inputs: createWebhookInputs,
  examplePayload: createWebhookExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: createWebhookOutputSchema,
  }),
});
