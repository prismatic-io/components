export const getPubSubNotificationExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    notificationSubscriptions: [
      {
        name: "accounts/123456789/notificationsubscriptions/456",
        registeredEvent: "PRODUCT_STATUS_CHANGE",
        callBackUri: "https://www.example.com/webhooks/merchant",
        allManagedAccounts: true,
      },
    ],
    nextPageToken: "CgwI4MSB3QYQ",
  },
};
export const updatePubSubNotificationExamplePayload: {
  data: Record<string, unknown>;
} = {
  data: {
    name: "accounts/123456789/notificationsubscriptions/456",
    registeredEvent: "PRODUCT_STATUS_CHANGE",
    callBackUri: "https://www.example.com/webhooks/merchant",
    allManagedAccounts: true,
  },
};
