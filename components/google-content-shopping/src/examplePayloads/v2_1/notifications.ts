import type { content_v2_1 } from "googleapis";
export const getPubSubNotificationExamplePayload: {
  data: content_v2_1.Schema$PubsubNotificationSettings;
} = {
  data: {
    kind: "content#pubsubnotificationsettings",
    cloudTopicName: "projects/example-project/topics/merchant-notifications",
    registeredEvents: [
      "PRODUCT_STATUS_CHANGE",
      "ORDER_PENDING_SHIPMENT",
      "ORDER_SHIPPED",
    ],
  },
};
export const updatePubSubNotificationExamplePayload: {
  data: content_v2_1.Schema$PubsubNotificationSettings;
} = {
  data: {
    kind: "content#pubsubnotificationsettings",
    cloudTopicName:
      "projects/example-project/topics/merchant-notifications-updated",
    registeredEvents: [
      "PRODUCT_STATUS_CHANGE",
      "ORDER_PENDING_SHIPMENT",
      "ORDER_SHIPPED",
      "ORDER_DELIVERED",
    ],
  },
};
