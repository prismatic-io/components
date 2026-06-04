import { action } from "@prismatic-io/spectral";
import { listWebhooksInputs } from "../../inputs";
import { getAdobeSignClient } from "../../client";
import type { WebhookResponse } from "../../types";
import { fetchAdobeSignResults } from "../../util";
import { listWebhooksExamplePayload } from "../../examplePayloads";

export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Retrieves webhooks for a user.",
  },
  inputs: listWebhooksInputs,
  perform: async (
    context,
    {
      connection,
      fetchAll,
      webhookResourceType,
      showInactiveWebhooks,
      pageSize,
      scope,
      cursor,
    },
  ) => {
    const client = getAdobeSignClient(connection, context.debug.enabled);

    const data = await fetchAdobeSignResults<
      WebhookResponse,
      "userWebhookList",
      typeof fetchAll
    >(
      client,
      "/webhooks",
      fetchAll,
      {
        pageSize: pageSize || undefined,
        cursor: cursor || undefined,
        scope: scope || undefined,
        resourceType: webhookResourceType || undefined,
        showInactiveWebhooks: showInactiveWebhooks || false,
      },
      "userWebhookList",
    );

    return { data };
  },
  examplePayload: listWebhooksExamplePayload,
});
