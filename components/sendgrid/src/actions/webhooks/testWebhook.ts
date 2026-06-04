import { action } from "@prismatic-io/spectral";
import { createAuthorizedClient } from "../../client";
import { testWebhookInputs } from "../../inputs";
import { testWebhookExamplePayload } from "../../examplePayloads";

export const testWebhook = action({
  display: {
    label: "Test Webhook",
    description: "Test an Event Webhook by sending a fake event notification.",
  },
  inputs: testWebhookInputs,
  perform: async (_context, { sendGridConnection, url }) => {
    const client = createAuthorizedClient(sendGridConnection);

    await client.request({
      url: "/v3/user/webhooks/event/test",
      method: "POST",
      body: {
        url,
      },
    });

    return {
      data: {
        success: true,
        message: "Test event sent successfully",
      },
    };
  },
  examplePayload: testWebhookExamplePayload,
});
