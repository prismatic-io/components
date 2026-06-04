import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { createWebhookInputs } from "../../inputs";
import { createWebhook as createWebhookFn } from "../../util";

export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Creates a new webhook.",
  },
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
});
