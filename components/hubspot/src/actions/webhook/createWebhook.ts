import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { checkDeveloperApiKeyAndAppId } from "../../util";
export const createWebhook = action({
  display: {
    label: "Create Webhook",
    description: "Create a webhook in HubSpot.",
  },
  performSafety: "notAllowed",
  perform: async (
    context,
    { hubspotConnection, eventType, propertyWebhookName, active, timeout },
  ) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient(
      {
        hubspotConnection,
        timeout,
        debugRequest,
        headers: { "Content-Type": "application/json" },
      },
      false,
    );
    const { developerApiKey, appId } =
      checkDeveloperApiKeyAndAppId(hubspotConnection);
    const { data } = await client.post(
      `/webhooks/v3/${appId}/subscriptions`,
      {
        eventType,
        ...(propertyWebhookName && { propertyName: propertyWebhookName }),
        active,
      },
      {
        params: { hapikey: developerApiKey },
      },
    );
    return { data };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: createWebhookExamplePayload.data,
  }),
  inputs: createWebhookInputs,
  examplePayload: createWebhookExamplePayload,
});
