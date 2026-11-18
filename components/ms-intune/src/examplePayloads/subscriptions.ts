import type { TriggerPayload } from "@prismatic-io/spectral";
import { TriggerBranches } from "../constants";

export const listSubscriptionsExamplePayload = {
  data: {
    "@odata.context":
      "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
    value: [
      {
        id: "0fc0d6db-0073-42e5-a186-853da75fb308",
        resource: "Users",
        applicationId: "24d3b144-21ae-4080-943f-7067b395b913",
        changeType: "updated,deleted",
        clientState: null,
        notificationUrl:
          "https://webhookappexample.azurewebsites.net/api/notifications",
        lifecycleNotificationUrl:
          "https://webhook.azurewebsites.net/api/send/lifecycleNotifications",
        expirationDateTime: "2018-03-12T05:00:00Z",
        creatorId: "8ee44408-0679-472c-bc2a-692812af3437",
        latestSupportedTlsVersion: "v1_2",
        encryptionCertificate: "",
        encryptionCertificateId: "",
        includeResourceData: false,
        notificationContentType: "application/json",
      },
    ],
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

export const createSubscriptionExamplePayload = {
  data: [getSubscriptionExamplePayload.data],
};

export const deleteAllSubscriptionExamplePayload = {
  data: [
    "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    "0fc0d6db-0073-42e5-a186-853da75fb308",
  ],
};

export const deleteSubscriptionExamplePayload = {
  data: {
    success: true,
    id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    message: "Subscription deleted successfully.",
  },
};

export const selectSubscriptionExamplePayload = {
  result: [
    {
      label: "Users (updated,deleted)",
      key: "0fc0d6db-0073-42e5-a186-853da75fb308",
    },
  ],
};

export const updateSubscriptionExamplePayload = getSubscriptionExamplePayload;

const TRIGGER_USER_ID = "87d349ed-44d7-43e1-9a83-5f2406dee5bd";

const TRIGGER_TENANT_ID = "84bd8158-6d4d-4958-8b9f-9d6445542f95";

export const resourceTriggerExamplePayload: {
  payload: TriggerPayload;
  branch: TriggerBranches;
} = {
  payload: {
    headers: { "content-type": "application/json; charset=utf-8" },
    queryParameters: {},
    rawBody: { data: null },
    pathFragment: "",
    webhookUrls: {},
    webhookApiKeys: {},
    invokeUrl: "",
    executionId: "RXhhbXBsZUV4ZWN1dGlvblJlc3VsdElk",
    customer: {
      id: "testCustomerId",
      name: "Test Customer",
      externalId: "testExternalId",
    },
    instance: { id: "testInstanceId", name: "Test Instance" },
    user: {
      id: "testUserId",
      email: "user@example.com",
      name: "Test User",
      externalId: "testUserExternalId",
    },
    integration: {
      id: "testIntegrationId",
      name: "Test Integration",
      versionSequenceId: "1",
      externalVersion: "",
    },
    flow: { id: "testFlowId", name: "Test Flow", stableId: "testFlowStableId" },
    startedAt: "2024-01-15T00:00:00.000Z",
    globalDebug: false,
    body: {
      data: {
        value: [
          {
            subscriptionId: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
            subscriptionExpirationDateTime: "2026-12-01T00:00:00.0000000Z",
            changeType: "updated",
            resource: `Users/${TRIGGER_USER_ID}`,
            resourceData: {
              "@odata.type": "#Microsoft.Graph.User",
              "@odata.id": `Users/${TRIGGER_USER_ID}`,
              id: TRIGGER_USER_ID,
              organizationId: TRIGGER_TENANT_ID,
            },
            clientState: null,
            tenantId: TRIGGER_TENANT_ID,
          },
        ],
      },
    },
  },
  branch: TriggerBranches.Notification,
};
