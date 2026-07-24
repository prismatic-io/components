import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { getPubSubNotificationExamplePayload } from "../../../examplePayloads/v2_1";
import { getPubSubNotificationInputs } from "../../../inputs/v2_1";
export const getPubSubNotification = action({
  display: {
    description:
      "Retrieves a Merchant Center account's Pub/Sub notification settings.",
    label: "Get Pub/Sub Notification Settings (Legacy v2.1)",
  },
  inputs: getPubSubNotificationInputs,
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
