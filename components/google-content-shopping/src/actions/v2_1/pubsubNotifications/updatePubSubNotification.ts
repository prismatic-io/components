import { action } from "@prismatic-io/spectral";
import { createClient } from "../../../client";
import { updatePubSubNotificationExamplePayload } from "../../../examplePayloads/v2_1";
import { updatePubSubNotificationInputs } from "../../../inputs/v2_1";
export const updatePubSubNotification = action({
  display: {
    description:
      "Registers a Merchant Center account for Pub/Sub notifications, where cloud topic name should not be provided as part of the request.",
    label: "Update Pub/Sub Notification (Legacy v2.1)",
  },
  inputs: updatePubSubNotificationInputs,
  perform: async (
    _context,
    { connectionInput, merchantId, kind, cloudTopicName, registeredEvents },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.pubsubnotificationsettings.update({
      merchantId,
      requestBody: {
        kind,
        cloudTopicName,
        registeredEvents,
      },
    });
    return {
      data,
    };
  },
  examplePayload: updatePubSubNotificationExamplePayload,
});
