import { action, outputSchema } from "@prismatic-io/spectral";
import { deleteAllWebhooksOutputSchema } from "../../outputSchemas";
import { getHubspotClient } from "../../client";
import { deleteAllWebhooksExamplePayload } from "../../examplePayloads";
import { SUCCESS_MESSAGE } from "../../constants";
import { deleteAllWebhooksInputs } from "../../inputs";
import {
  checkDeveloperApiKeyAndAppId,
  deleteAllAppSubscriptions,
} from "../../util";
export const deleteAllWebhooks = action({
  display: {
    label: "Delete All Instanced Webhooks",
    description: "Delete all webhooks created by this instance in HubSpot.",
  },
  performSafety: "notAllowed",
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
    await deleteAllAppSubscriptions(client, appId, developerApiKey);
    return {
      data: {
        message: SUCCESS_MESSAGE,
      },
    };
  },
  examplePerform: async (): Promise<{
    data: unknown;
  }> => ({
    data: deleteAllWebhooksExamplePayload.data,
  }),
  inputs: deleteAllWebhooksInputs,
  examplePayload: deleteAllWebhooksExamplePayload,
  outputSchema: outputSchema({
    type: "actionOutput",
    schema: deleteAllWebhooksOutputSchema,
  }),
});
