import crypto from "node:crypto";
import { trigger, util } from "@prismatic-io/spectral";
import { webhookExamplePayload } from "../examplePayloads";
import { secret_key } from "../inputs";

export const webhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive and validate webhook requests from Greenhouse for webhooks you configure.",
  },
  perform: async (_context, payload, { secret_key, enabledEvents }) => {
    const headers = util.types.lowerCaseHeaders(payload.headers);
    const greenHouseEventID = headers["greenhouse-event-id"];
    if (greenHouseEventID) {
      const requestBody = payload.rawBody.data;
      const jsonBody = JSON.parse(util.types.toString(requestBody));
      const signature = crypto
        .createHmac("sha256", secret_key)
        .update(requestBody as string, "utf-8")
        .digest("base64");
      const match = `sha256 ${signature}` === headers.Signature;
      if (!match) {
        throw new Error("Signature verification failed");
      }
      if (
        enabledEvents &&
        enabledEvents.length > 0 &&
        enabledEvents.includes(jsonBody.action)
      ) {
        return Promise.resolve({
          payload,
          response: {
            headers: {
              ...payload.headers,
              "Greenhouse-Event-ID": greenHouseEventID,
            },
            statusCode: 200,
            contentType: "application/json",
            body: jsonBody,
          },
        });
      }
      throw new Error("Unhandled event type");
    }

    throw new Error("Signature verification failed");
  },
  inputs: {
    enabledEvents: {
      label: "Enabled Events",
      type: "string",
      collection: "valuelist",
      comments:
        "The list of webhook event names to accept in the integration. When empty, all events are accepted.",
    },
    secret_key,
  },
  synchronousResponseSupport: "valid",
  scheduleSupport: "valid",
  examplePayload: webhookExamplePayload,
});
