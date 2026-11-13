import type { Subscription } from "@microsoft/microsoft-graph-types";
import type { TriggerPayload } from "@prismatic-io/spectral";
import type { PaginatedResponse } from "../types";

export const createEventSubscriptionExamplePayload = {
  data: {
    id: "e9d5b726-4478-4412-bfba-268530484566",
    resource: "me/events",
    changeType: "updated",
    notificationUrl: "https://example.com/webhook/",
    expirationDateTime: "2024-12-31T23:59:59.999Z",
    creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
    latestSupportedTlsVersion: "v1_2",
  } as Subscription,
};

export const createMailFolderSubscriptionExamplePayload = {
  data: {
    id: "7f105c7d-2dc5-4530-97cd-4e7ae6534c07",
    resource: "me/mailFolders('Inbox')/messages",
    changeType: "created,updated",
    notificationUrl: "https://example.com/webhook/",
    expirationDateTime: "2024-12-31T23:59:59.999Z",
    creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
    latestSupportedTlsVersion: "v1_2",
  } as Subscription,
};

export const listSubscriptionsExamplePayload = {
  data: {
    "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
    value: [
      {
        id: "e9d5b726-4478-4412-bfba-268530484566",
        resource: "me/events",
        changeType: "updated",
        clientState: null,
        notificationUrl: "https://example.com/webhook/",
        notificationQueryOptions: null,
        lifecycleNotificationUrl: null,
        expirationDateTime: "2024-12-31T23:59:59.999Z",
        creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
        includeResourceData: null,
        latestSupportedTlsVersion: "v1_2",
        encryptionCertificate: null,
        encryptionCertificateId: null,
        notificationUrlAppId: null,
      },
    ],
  } as PaginatedResponse<Subscription>,
};

export const updateEventSubscriptionExamplePayload = {
  data: {
    id: "e9d5b726-4478-4412-bfba-268530484566",
    resource: "me/events",
    changeType: "updated",
    notificationUrl: "https://example.com/webhook/",
    expirationDateTime: "2024-12-31T23:59:59.999Z",
    creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
    latestSupportedTlsVersion: "v1_2",
  } as Subscription,
};

export const deleteSubscriptionExamplePayload = {
  data: {
    success: true,
    id: "e9d5b726-4478-4412-bfba-268530484566",
    message: "Subscription deleted successfully",
  },
};

export const deleteAllInstanceSubscriptionsExamplePayload = {
  data: {
    subscriptionsRemoved: [
      "26ebd1e9-c54a-4bbe-9583-fc05974952a4",
      "b9b27172-ee2e-4248-86df-fc98cb71d914",
    ],
  },
};

export const webhookExamplePayload = {
  payload: {
    headers: {
      "Content-Type": "application/json",
    },
    queryParameters: {},
    rawBody: {
      data: "",
      contentType: "application/json",
    },
    body: {
      data: {
        value: [
          {
            subscriptionId: "e9d5b726-4478-4412-bfba-268530484566",
            subscriptionExpirationDateTime: "2024-12-31T23:59:59.999Z",
            changeType: "updated",
            resource: "Users/{user-id}/Events/{event-id}",
            resourceData: {
              "@odata.type": "#Microsoft.Graph.Event",
              "@odata.id": "Users/{user-id}/Events/{event-id}",
              "@odata.etag": 'W/"CQAAABYAAADHcgC8Hl9tRZ/hc1wEUs1TAAAwR4Hg"',
              id: "AAMkAGIAAAoZDOFAAA=",
            },
            clientState: "secretClientValue",
            tenantId: "1717622f-1d94-4d0c-9d74-709fad664b77",
          },
        ],
      },
      contentType: "application/json",
    },
    pathFragment: "",
    webhookUrls: {
      "Webhook Flow": "https://hooks.example.com/trigger/EXAMPLE",
    },
    webhookApiKeys: {
      "Webhook Flow": ["example-api-key"],
    },
    invokeUrl: "https://hooks.example.com/trigger/EXAMPLE",
    executionId: "SW5zdGFuY2VFeGVjdXRpb246MTIzNDU=",
    customer: {
      id: "Q3VzdG9tZXI6MTIzNDU=",
      externalId: "example-customer-external-id",
      name: "Example Customer",
    },
    instance: {
      id: "SW5zdGFuY2U6MTIzNDU=",
      name: "Example Instance",
    },
    user: {
      id: "VXNlcjoxMjM0NQ==",
      externalId: "example-user-external-id",
      name: "Example User",
      email: "user@example.com",
    },
  } as unknown as TriggerPayload,
  branch: "Notification",
};

export const selectSubscriptionExamplePayload = {
  result: [
    {
      label: "me/events (https://example.com/webhook/)",
      key: "e9d5b726-4478-4412-bfba-268530484566",
    },
  ],
};
