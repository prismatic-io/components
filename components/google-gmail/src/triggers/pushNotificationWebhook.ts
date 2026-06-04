import { type TriggerPayload, trigger } from "@prismatic-io/spectral";

import type { GmailNotificationBody } from "../interfaces";
import { pushNotificationWebhookExamplePayload } from "../examplePayloads";

export const pushNotificationWebhook = trigger({
  display: {
    label: "Manual Push Notifications",
    description:
      "Receive and validate webhook requests from Gmail for manually configured Push Notification subscriptions.",
  },
  perform: async (context, payload) => {
    const finalPayload: TriggerPayload = { ...payload };
    try {
      const message = (finalPayload.body.data as GmailNotificationBody).message;
      message.decodedData = JSON.parse(Buffer.from(message.data, "base64").toString("utf-8"));
      finalPayload.body.data = {
        ...(finalPayload.body.data as object),
        message,
      };
    } catch (error) {
      throw new Error("Error parsing data. Was this message sent from Gmail?", error);
    }
    return Promise.resolve({
      payload,
      response: { statusCode: 200, contentType: "text/plain" },
    });
  },
  inputs: {},
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: pushNotificationWebhookExamplePayload,
});
