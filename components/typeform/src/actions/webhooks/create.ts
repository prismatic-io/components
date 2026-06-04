import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connection,
  enabled,
  formId,
  formResponse,
  formResponsePartial,
  secret,
  tag,
  url,
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
    url,
    enabled,
    formResponse,
    formResponsePartial,
    connection,
  },
  perform: async (
    context,
    {
      connection,
      formId,
      tag,
      url,
      enabled,
      formResponse,
      formResponsePartial,
      secret,
    },
  ) => {
    const client = createClient(connection, context.debug.enabled);

    const { data } = await createWebhookFunction({
      client,
      formId,
      tag,
      enabled,
      form_response: formResponse,
      form_response_partial: formResponsePartial,
      secret,
      url,
    });
    return {
      data,
    };
  },
  examplePayload: {
    data: createWebhookResponse,
  },
});
