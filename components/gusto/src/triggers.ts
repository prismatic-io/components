import { trigger, util } from "@prismatic-io/spectral";
import { connectionInput } from "./inputs"; 
import type { HttpClient } from "@prismatic-io/spectral/dist/clients/http";
import { createWebhookClient } from "./client";

async function listWebhookSubscriptions(client: HttpClient) {
  const endpoint = "/webhook_subscriptions";
  const { data } = await client.get(endpoint);
  return data;
}

async function verifyWebhookSubscription(
  client: HttpClient,
  webhookUuid: string,
  verificationToken: string,
) {
  const endpoint = `/webhook_subscriptions/${webhookUuid}/verify`;

  try {
    const response = await client.put(endpoint, {
      verification_token: verificationToken,
    });
    return response.data;
  } catch (error) {
    console.error("Error verifying webhook:", error);
    throw error;
  }
}

const gustoWebhookTrigger = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Gusto for webhooks you configure.",
  },
  scheduleSupport: "invalid",
  synchronousResponseSupport: "valid",
  allowsBranching: true,
  inputs: {
    connection: connectionInput,
  },
  staticBranchNames: ["Notification", "URL Validation"],
  perform: async (context, payload, params) => {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const client = await createWebhookClient(
      params.connection,
      context.debug.enabled,
    );

    const existingWebhooks = await listWebhookSubscriptions(client);
    const thisWebhookUrl = context.webhookUrls[context.flow.name];
    const filteredWebhook = existingWebhooks.find(
      (webhook: { url: string }) => webhook.url === thisWebhookUrl,
    );

    let verificationToken: string | undefined;
    if (typeof payload.body.data === "object" && payload.body.data !== null) {
      const data = payload.body.data as Record<string, unknown>;
      if (typeof data.verification_token === "string") {
        verificationToken = data.verification_token;
      }
    }

    if (verificationToken && filteredWebhook) {
      await verifyWebhookSubscription(
        client,
        filteredWebhook.uuid,
        verificationToken,
      );
      return Promise.resolve({
        payload,
        response: {
          statusCode: 200,
          headers: {
            ...headers,
            accept: "application/json",
          },
          body: JSON.stringify({ verification_token: verificationToken }),
          contentType: "application/json",
        },
        branch: "URL Validation",
      });
    }
    return Promise.resolve({
      payload,
      response: { statusCode: 200, contentType: "text/plain" },
      branch: "Notification",
    });
  },
});

export default { gustoWebhookTrigger };
