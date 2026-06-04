import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWebhooksResponse } from "../../examplePayloads";
import {
  adAccountFields,
  adAccountFieldsJSON,
  callbackUrl,
  verifyToken,
  version,
  webhookConnection,
} from "../../inputs";
import {
  clientCredentialsConnection,
  createWebhookFn,
  getAppId,
  validateFields,
} from "../../util";

export const createAdAccountWebhook = action({
  display: {
    label: "Create Ad Account Webhook",
    description: "Create a new ad account webhook for the current application.",
  },
  perform: async (
    context,
    {
      connection,
      version,
      verifyToken,
      callbackUrl,
      adAccountFields,
      adAccountFieldsJSON,
    },
  ) => {
    clientCredentialsConnection(connection);
    const client = createClient(connection, context.debug.enabled, version);
    const appId = getAppId(connection);
    const fields =
      adAccountFields.length > 0 ? adAccountFields : adAccountFieldsJSON;
    validateFields(fields);
    const data = await createWebhookFn(
      client,
      appId,
      "ad_account",
      callbackUrl,
      verifyToken,
      fields,
    );

    return {
      data,
    };
  },
  inputs: {
    version,
    verifyToken,
    callbackUrl,
    adAccountFields,
    adAccountFieldsJSON,
    connection: webhookConnection,
  },
  examplePayload: listWebhooksResponse,
});
