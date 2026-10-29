import { action, outputSchema } from "@prismatic-io/spectral";
import { webhookSubscriptionSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { createWebhookExamplePayload } from "../../examplePayloads";
import { createWebhookInputs } from "../../inputs";
import { checkDeveloperApiKeyAndAppId } from "../../util";
import { hubspotPaths } from "../../constants";

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
      hubspotPaths.appWebhooks(appId, "/subscriptions"),
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
  examplePerform: async () => ({
    data: createWebhookExamplePayload.data,
  }),
  inputs: createWebhookInputs,
  examplePayload: createWebhookExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: webhookSubscriptionSchema,
  }),
});
