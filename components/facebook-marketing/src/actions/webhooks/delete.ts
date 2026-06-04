import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { DELETE_RESPONSE } from "../../constants";
import { object, version, webhookConnection } from "../../inputs";
import {
  clientCredentialsConnection,
  deleteWebhookFn,
  getAppId,
} from "../../util";

export const deleteWebhook = action({
  display: {
    label: "Delete Webhook",
    description: "Delete a webhook for the current application.",
  },
  perform: async (context, { connection, version, object }) => {
    clientCredentialsConnection(connection);
    const client = createClient(connection, context.debug.enabled, version);
    const appId = getAppId(connection);
    await deleteWebhookFn(client, appId, object, []);

    return {
      data: DELETE_RESPONSE,
    };
  },
  inputs: {
    version,
    object: {
      ...object,
      comments: "The webhook associated with the object will be deleted.",
    },
    connection: webhookConnection,
  },
  examplePayload: {
    data: DELETE_RESPONSE,
  },
});
