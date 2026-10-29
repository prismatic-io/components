import { trigger, util } from "@prismatic-io/spectral";
import crypto from "node:crypto";
import { rawHttpClient } from "../auth";
import { webhookExamplePayload } from "../examplePayloads";
import { connectionInput } from "../inputs";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Zendesk for manually configured webhook subscriptions.",
  },
  examplePayload: webhookExamplePayload,
  perform: async (context, payload, params) => {
    if (context.isSimulatedTestExecution) {
      return Promise.resolve({ payload });
    }

    const headers = util.types.lowerCaseHeaders(payload.headers);
    const {
      "x-zendesk-webhook-signature": signature,
      "x-zendesk-webhook-signature-timestamp": timestamp,
      "x-zendesk-webhook-id": webhookId,
    } = headers;
    const body = util.types.toString(payload.rawBody.data);
    let secret: string;

    if (!signature) {
      throw new Error(
        "A Zendesk HMAC signature was not included in this webhook request",
      );
    }

    if (!timestamp) {
      throw new Error(
        "A Zendesk timestamp header was not included in this webhook request",
      );
    }

    if (!webhookId) {
      throw new Error(
        "A Zendesk webhook ID header was not included in this webhook request",
      );
    }

    try {
      const client = rawHttpClient(params.connection);
      const { data } = await client.get(
        `/webhooks/${webhookId}/signing_secret`,
      );
      secret = data.signing_secret.secret;
    } catch {
      throw new Error(
        "An error occurred fetching the source webhook's signing key. Did this webhook request originate from Zendesk?",
      );
    }

    const computedSignature = crypto
      .createHmac("sha256", secret)
      .update(timestamp + body)
      .digest("base64");

    if (signature !== computedSignature) {
      throw new Error(
        "The included signing signature does not match the configured Zendesk signing key. Rejecting.",
      );
    }

    return Promise.resolve({ payload });
  },
  inputs: { connection: connectionInput },
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
});
