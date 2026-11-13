export const createSubscriptionExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    id: "38031b7d-16b1-448a-8e68-68b8aec62315",
    resource: "/me/drive/root",
    changeType: "updated",
    clientState: "client-specific-string",
    notificationUrl: "https://hooks.example.com/trigger/SW5z",
    expirationDateTime: "2025-01-15T11:23:00.0000000Z",
    creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
    latestSupportedTlsVersion: "v1_2",
  },
};

export const listSubscriptionsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
    value: [
      {
        id: "38031b7d-16b1-448a-8e68-68b8aec62315",
        resource: "/me/drive/root",
        changeType: "updated",
        clientState: "client-specific-string",
        notificationUrl: "https://hooks.example.com/trigger/SW5z",
        expirationDateTime: "2025-01-15T11:23:00.0000000Z",
        creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
        latestSupportedTlsVersion: "v1_2",
      },
      {
        id: "482b9c1e-9a7f-4f3d-8b2a-1c5e6f7d8e9f",
        resource: "/me/drive/items/01BYE5RZ6QN3ZWBTUFOFD3GSPGOHDJD36K",
        changeType: "created,updated,deleted",
        clientState: "another-client-state",
        notificationUrl:
          "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOjU4ZTE4OTBhLWY3YzQtNGIwZS1hZGVlLWQ4YzY3ZjFjZDIwMg==",
        expirationDateTime: "2025-01-20T09:15:00.0000000Z",
        creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
        latestSupportedTlsVersion: "v1_2",
      },
    ],
  },
};

export const renewSubscriptionExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    id: "38031b7d-16b1-448a-8e68-68b8aec62315",
    resource: "/me/drive/root",
    changeType: "updated",
    clientState: "client-specific-string",
    notificationUrl: "https://hooks.example.com/trigger/SW5z",
    expirationDateTime: "2025-02-15T11:23:00.0000000Z",
    creatorId: "6219df3c-04d4-4b39-b2a4-ad162a5dcb8f",
    latestSupportedTlsVersion: "v1_2",
  },
};

export const deleteSubscriptionExamplePayload = {
  data: {},
};

export const deleteSubscriptionsExamplePayload: {
  data: { subscriptionsRemoved?: string[]; message?: string };
} = {
  data: {
    subscriptionsRemoved: [
      "38031b7d-16b1-448a-8e68-68b8aec62315",
      "482b9c1e-9a7f-4f3d-8b2a-1c5e6f7d8e9f",
    ],
  },
};

export const selectSubscriptionExamplePayload = {
  result: [
    {
      label: "/me/drive/root (updated)",
      key: "38031b7d-16b1-448a-8e68-68b8aec62315",
    },
  ],
};
