import { trigger, util } from "@prismatic-io/spectral";
import { createClient } from "@prismatic-io/spectral/dist/clients/http";
import { snsS3NotificationWebhookExamplePayload } from "../examplePayloads";
import { snsS3NotificationWebhookInputs } from "../inputs";
import type { SnsMessage } from "../types";
import { assertSnsUrl, verifySnsMessageSignature } from "../utils";
export const snsS3NotificationWebhook = trigger({
  display: {
    label: "Webhook",
    description:
      "Receive Amazon SNS notifications for Amazon S3 events. Confirms SNS subscription requests automatically.",
  },
  allowsBranching: true,
  staticBranchNames: ["Notification", "Subscribe"],
  perform: async (_context, payload, { expectedTopicArn }) => {
    const bodyData = util.types.toString(payload.rawBody.data);
    if (!bodyData.length) throw new Error("Missing data in payload");
    const data = JSON.parse(bodyData) as SnsMessage;
    const eventType = data.Type;
    if (!eventType) throw new Error("Event type not received");
    if (
      eventType !== "Notification" &&
      eventType !== "SubscriptionConfirmation"
    ) {
      throw new Error(
        `Message type was not "Notification" or "SubscriptionConfirmation", but "${eventType}" instead.`,
      );
    }
    await verifySnsMessageSignature(data);
    if (expectedTopicArn && data.TopicArn !== expectedTopicArn) {
      throw new Error(
        `Amazon SNS message TopicArn "${data.TopicArn}" did not match the configured Topic ARN; the message was rejected.`,
      );
    }
    if (eventType === "SubscriptionConfirmation") {
      assertSnsUrl(data.SubscribeURL, "SubscribeURL");
      await createClient({
        baseUrl: data.SubscribeURL,
      }).get("");
      return {
        branch: "Subscribe",
        payload: { ...payload, body: { data } },
      };
    }
    return {
      branch: "Notification",
      payload: { ...payload, body: { data } },
    };
  },
  inputs: snsS3NotificationWebhookInputs,
  synchronousResponseSupport: "invalid",
  scheduleSupport: "invalid",
  examplePayload: snsS3NotificationWebhookExamplePayload,
});
