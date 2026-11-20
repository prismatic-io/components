const siteListSubscription = {
  id: "e9d5b726-4478-4412-bfba-268530484566",
  resource:
    "sites/example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418/lists/3a3c0f6a-86da-4567-94d4-3b939da63200",
  applicationId: "e76615c0-13e3-4cd2-8235-a2d628ad13de",
  changeType: "updated",
  clientState: null,
  notificationUrl:
    "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOjU4ZTE4OTBhLWY3YzQtNGIwZS1hZGVlLWQ4YzY3ZjFjZDIwMg==",
  notificationQueryOptions: null,
  lifecycleNotificationUrl: null,
  expirationDateTime: "2026-11-12T09:00:00Z",
  creatorId: "efee1b77-fb3b-4f65-99d6-274c11914d12",
  includeResourceData: null,
  latestSupportedTlsVersion: "v1_2",
  encryptionCertificate: null,
  encryptionCertificateId: null,
  notificationUrlAppId: null,
};

const driveRootSubscription = {
  id: "38031b7d-16b1-448a-8e68-68b8aec62315",
  resource: "drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root",
  applicationId: "e76615c0-13e3-4cd2-8235-a2d628ad13de",
  changeType: "updated",
  clientState: "7c2f9e41b8d34a6e",
  notificationUrl:
    "https://hooks.example.com/trigger/SW5zdGFuY2VGbG93Q29uZmlnOjU4ZTE4OTBhLWY3YzQtNGIwZS1hZGVlLWQ4YzY3ZjFjZDIwMg==",
  notificationQueryOptions: null,
  lifecycleNotificationUrl: null,
  expirationDateTime: "2026-11-12T11:23:00Z",
  creatorId: "efee1b77-fb3b-4f65-99d6-274c11914d12",
  includeResourceData: null,
  latestSupportedTlsVersion: "v1_2",
  encryptionCertificate: null,
  encryptionCertificateId: null,
  notificationUrlAppId: null,
};

export const createSiteListSubscriptionExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    ...siteListSubscription,
  },
};

export const updateSiteListSubscriptionExpirationExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    ...siteListSubscription,
    expirationDateTime: "2026-12-07T09:00:00Z",
  },
};

export const createSubscriptionExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    ...driveRootSubscription,
  },
};

export const deleteSubscriptionExamplePayload = {
  data: {
    success: true,
    id: "38031b7d-16b1-448a-8e68-68b8aec62315",
    message: "Subscription deleted successfully",
  },
};

export const deleteAllInstanceSubscriptionsExamplePayload = {
  data: {
    subscriptionsRemoved: [
      "38031b7d-16b1-448a-8e68-68b8aec62315",
      "e9d5b726-4478-4412-bfba-268530484566",
    ],
    count: 2,
  },
};

export const listSubscriptionsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
    value: [driveRootSubscription, siteListSubscription],
  },
};

export const listSubscriptionsDataSourceExamplePayload = {
  result: [
    {
      key: "38031b7d-16b1-448a-8e68-68b8aec62315",
      label:
        "Resource: drives/b!j4hEbINY8E6lQtIagCz-pgZdLe2S4UdAr6al1_JbNBjiyKTRbzt6TZ4cXyuKDWxD/root - Change Type: updated",
    },
    {
      key: "e9d5b726-4478-4412-bfba-268530484566",
      label:
        "Resource: sites/example.sharepoint.com,6c44888f-5883-4ef0-a542-d21a802cfea6,ed2d5d06-e192-4047-afa6-a5d7f25b3418/lists/3a3c0f6a-86da-4567-94d4-3b939da63200 - Change Type: updated",
    },
  ],
};

export const renewSubscriptionExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    ...driveRootSubscription,
    expirationDateTime: "2026-12-08T11:23:00Z",
  },
};
