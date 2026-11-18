export const createSubscriptionExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
    id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    resource: "me/mailFolders('Inbox')/messages",
    applicationId: "24d3b144-21ae-4080-943f-7067b395b913",
    changeType: "created",
    clientState: "secretClientValue",
    notificationUrl:
      "https://webhook.azurewebsites.net/api/send/myNotifyClient",
    expirationDateTime: "2016-11-20T18:23:45.9356913Z",
    creatorId: "8ee44408-0679-472c-bc2a-692812af3437",
    latestSupportedTlsVersion: "v1_2",
    notificationContentType: "application/json",
  },
};

export const getSubscriptionExamplePayload = {
  data: {
    id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    resource: "me/messages",
    applicationId: "24d3b144-21ae-4080-943f-7067b395b913",
    changeType: "created,updated",
    clientState: "secretClientValue",
    notificationUrl:
      "https://webhook.azurewebsites.net/api/send/myNotifyClient",
    lifecycleNotificationUrl:
      "https://webhook.azurewebsites.net/api/send/lifecycleNotifications",
    expirationDateTime: "2016-11-20T18:23:45.9356913Z",
    creatorId: "8ee44408-0679-472c-bc2a-692812af3437",
    latestSupportedTlsVersion: "v1_2",
    encryptionCertificate: "",
    encryptionCertificateId: "",
    includeResourceData: false,
    notificationContentType: "application/json",
  },
};

export const listSubscriptionsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
    value: [getSubscriptionExamplePayload.data],
  },
};

export const updateSubscriptionExamplePayload = getSubscriptionExamplePayload;

export const deleteInstancedSubscriptionsExamplePayload = {
  data: {
    subscriptionsRemoved: [
      "26ebd1e9-c54a-4bbe-9583-fc05974952a4",
      "b9b27172-ee2e-4248-86df-fc98cb71d914",
    ],
  },
};

export const deleteSubscriptionExamplePayload = {
  data: {
    success: true,
    id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    message: "Subscription deleted successfully",
  },
};

export const selectSubscriptionExamplePayload = {
  result: [{ label: "users", key: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07" }],
};
