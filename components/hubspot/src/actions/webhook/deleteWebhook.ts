import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { deleteWebhookExamplePayload } from "../../examplePayloads";
import { deleteWebhookInputs } from "../../inputs";
import { checkDeveloperApiKeyAndAppId } from "../../util";
import { hubspotPaths } from "../../constants";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook by ID in HubSpot.",
  },
  performSafety: "notAllowed",
  perform: async (context, { hubspotConnection, subscriptionId, timeout }) => {
    const debugRequest = context.debug.enabled;
    const client = getHubspotClient(
      {
        hubspotConnection,
        timeout,
        debugRequest,
      },
      false,
    );
    const { developerApiKey, appId } =
      checkDeveloperApiKeyAndAppId(hubspotConnection);

    const { data } = await client.delete(
      hubspotPaths.appWebhooks(appId, `/subscriptions/${subscriptionId}`),
      {
        params: { hapikey: developerApiKey },
      },
    );

    return { data };
  },
  examplePerform: async () => ({
    data: deleteWebhookExamplePayload.data,
  }),
  inputs: deleteWebhookInputs,
  examplePayload: deleteWebhookExamplePayload,
});
