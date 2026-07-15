import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { listWebhooksExamplePayload } from "../../examplePayloads";
import { listWebhooksInputs } from "../../inputs";
export const listWebhooks = action({
  display: {
    label: "List Webhooks",
    description: "Lists all Event Webhook configurations.",
  },
  inputs: listWebhooksInputs,
  perform: async (_context, { sendGridConnection }) => {
    const client = createAuthorizedClient(sendGridConnection);
    const [_response, body] = await client.request({
      url: "/v3/user/webhooks/event/settings/all",
      method: "GET",
    });
    return {
      data: body,
    };
  },
  examplePayload: listWebhooksExamplePayload,
});
