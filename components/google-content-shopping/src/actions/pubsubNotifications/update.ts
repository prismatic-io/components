import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import {
  connectionInput,
  merchantId,
  kind,
  cloudTopicName,
  registeredEvents,
} from "../../inputs";
import { updatePubSubNotificationExamplePayload } from "../../examplePayloads";

export const updatePubSubNotification = action({
  display: {
    description:
      "Register a Merchant Center account for pubsub notifications. Note that cloud topic name shouldn't be provided as part of the request.",
    label: "Update PubSub Notification",
  },
  inputs: {
    connectionInput,
    merchantId,
    kind,
    cloudTopicName,
    registeredEvents,
  },
  perform: async (
    _context,
    { connectionInput, merchantId, kind, cloudTopicName, registeredEvents },
  ) => {
    const client = createClient(connectionInput);
    const { data } = await client.pubsubnotificationsettings.update({
      merchantId,
      requestBody: {
        kind: kind || undefined,
        cloudTopicName: cloudTopicName || undefined,
        registeredEvents: registeredEvents || undefined,
      },
    });
    return {
      data,
    };
  },
  examplePayload: updatePubSubNotificationExamplePayload,
});
