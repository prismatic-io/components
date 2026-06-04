import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connectionInput, merchantId } from "../../inputs";
import { getPubSubNotificationExamplePayload } from "../../examplePayloads";

export const getPubSubNotification = action({
  display: {
    description:
      "Retrieves a Merchant Center account's pubsub notification settings.",
    label: "Get PubSub Notification Settings",
  },
  inputs: {
    connectionInput,
    merchantId,
  },
  perform: async (_context, { connectionInput, merchantId }) => {
    const client = createClient(connectionInput);
    const { data } = await client.pubsubnotificationsettings.get({
      merchantId,
    });
    return {
      data,
    };
  },
  examplePayload: getPubSubNotificationExamplePayload,
});
