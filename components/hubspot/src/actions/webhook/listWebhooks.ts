import { action } from "@prismatic-io/spectral";
import { getHubspotClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { checkDeveloperApiKeyAndAppId } from "../../util";
export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description:
      "Retrieve a list of all webhook subscriptions for the HubSpot app.",
  },
  performSafety: "safe",
  perform: async (context, { hubspotConnection, timeout }) => {
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
    const { data } = await client.get(`/webhooks/v3/${appId}/subscriptions`, {
      params: { hapikey: developerApiKey },
    });
    return { data };
  },
  inputs: listWebhooksInputs,
  examplePayload: listWebhooksExamplePayload,
});
