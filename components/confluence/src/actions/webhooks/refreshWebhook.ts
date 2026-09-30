import { action } from "@prismatic-io/spectral";
import { refreshWebhookInputs } from "../../inputs";
import { createClient } from "../../client";
export const refreshWebhook = action({
  display: {
    label: "Refresh Webhook",
    description: "Refresh webhook expiration by ID.",
  },
  inputs: refreshWebhookInputs,
  performSafety: "notAllowed",
  perform: async (context, { connectionInput, webhookId }) => {
    const client = await createClient(connectionInput, context.debug.enabled);
    const { data } = await client.put("/webhook/refresh", {
      webhookIds: [webhookId],
    });
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: { expirationDate: "2022-12-21T09:20:20.388-0900" },
  }),
  examplePayload: {
    data: { expirationDate: "2022-12-21T09:20:20.388-0900" },
  },
});
