

export const renewSubscriptionExamplePayload = {
  data: {
    id: "38031b7d-16b1-448a-8e68-68b8aec62315",
    resource: "/me/drive/root",
    changeType: "updated",
    clientState: "client-specific-string",
    notificationUrl: "https://hooks.example.com/trigger/SW5z",
    expirationDateTime: "2025-12-12T11:23:00.0000000Z",
    creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
    latestSupportedTlsVersion: "v1_2",
  },
};

export const deleteAllSubscriptionsExamplePayload = {
  data: {
    subscriptionsRemoved: [
      "38031b7d-16b1-448a-8e68-68b8aec62315",
      "a1b2c3d4-5678-90ab-cdef-1234567890ab",
    ],
    count: 2,
  },
};
