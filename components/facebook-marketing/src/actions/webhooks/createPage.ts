import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { listWebhooksResponse } from "../../examplePayloads";
import {
  callbackUrl,
  pageFields,
  pageFieldsJSON,
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

export const createPageWebhook = action({
  display: {
    label: "Create Page Webhook",
    description: "Create a new page webhook for the current application.",
  },
  perform: async (
    context,
    {
      connection,
      version,
      verifyToken,
      callbackUrl,
      pageFields,
      pageFieldsJSON,
    },
  ) => {
    clientCredentialsConnection(connection);
    const client = createClient(connection, context.debug.enabled, version);
    const appId = getAppId(connection);
    const fields = pageFields.length > 0 ? pageFields : pageFieldsJSON;
    validateFields(fields);
    const data = await createWebhookFn(
      client,
      appId,
      "page",
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
    pageFields,
    pageFieldsJSON,
    connection: webhookConnection,
  },
  examplePayload: listWebhooksResponse,
});
