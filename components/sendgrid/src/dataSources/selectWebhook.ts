import { dataSource, type Element, util } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../client";
import { selectWebhookExamplePayload } from "../examplePayloads";
import { selectWebhookInputs } from "../inputs";
import type { SendGridWebhook } from "../types";
export const selectWebhook = dataSource({
  display: {
    label: "Select Webhook",
    description: "Selects an event webhook from a SendGrid account.",
  },
  inputs: selectWebhookInputs,
  dataSourceType: "picklist",
  perform: async (context, { connection }) => {
    const client = createAuthorizedClient(connection);
    try {
      const [_response, body] = await client.request({
        method: "GET",
        url: "/v3/user/webhooks/event/settings/all",
      });
      const typedBody = body as {
        webhooks?: SendGridWebhook[];
      };
      const webhooks = typedBody?.webhooks || [];
      const result = webhooks.map<Element>((webhook) => ({
        label: webhook.friendly_name || webhook.url || webhook.id,
        key: webhook.id,
      }));
      return { result };
    } catch (error) {
      context.logger.error(
        `Failed to fetch SendGrid webhooks for data source: ${util.types.toString(error)}`,
      );
      return {
        result: [
          {
            label: "Error fetching webhooks. Check logs.",
            key: "ERROR",
          },
        ],
      };
    }
  },
  examplePayload: selectWebhookExamplePayload,
});
