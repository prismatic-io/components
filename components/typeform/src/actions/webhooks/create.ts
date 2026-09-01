import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  deliverySettings,
  formId,
  secret,
  tag,
} from "../../inputs";
import { createWebhookResponse } from "../../examplePayloads/webhooks";
import { createWebhookFunction } from "../../util";
export const createWebhook = action({
  display: {
    label: "Create or Update Webhook",
    description: "Create or Update a Webhook",
  },
  inputs: {
    formId,
    tag,
    secret,
    deliverySettings,
    connection,
  },
  perform: async (
    context,
    { connection, formId, tag, deliverySettings, secret },
  ) => {
    const client = createClient(connection, context.debug.enabled);
    const { data } = await createWebhookFunction({
      client,
      formId,
      tag,
      enabled: deliverySettings.enabled,
      form_response: deliverySettings.formResponse,
      form_response_partial: deliverySettings.formResponsePartial,
      secret,
      url: deliverySettings.url,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createWebhookResponse,
  },
});
