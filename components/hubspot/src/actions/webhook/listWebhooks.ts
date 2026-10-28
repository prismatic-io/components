import { action, outputSchema } from "@prismatic-io/spectral";
import { listWebhooksOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
import { checkDeveloperApiKeyAndAppId } from "../../util";
import { hubspotPaths } from "../../constants";
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
    const { data } = await client.get(
      hubspotPaths.appWebhooks(appId, "/subscriptions"),
      {
        params: { hapikey: developerApiKey },
      },
    );
    return { data };
  },
  inputs: listWebhooksInputs,
  examplePayload: listWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: listWebhooksOutputSchema,
  }),
});
