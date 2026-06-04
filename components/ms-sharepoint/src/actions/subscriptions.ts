import { action, input, util } from "@prismatic-io/spectral";
import { createClient } from "../client";
import { connection, siteId, listId } from "../inputs";

const notificationUrlInput = input({
  label: "Notification URL",
  type: "string",
  required: true,
  comments: "URL to send events of this Subscription to",
  clean: util.types.toString,
});

const expirationDateTimeInput = input({
  label: "Expiration Date/Time",
  type: "string",
  required: false,
  comments:
    "Expiration date/time for subscription. If unspecified the default will be the current date/time plus 29 days (close to the maximum permitted by the Graph API).",
  clean: (rawValue) => {
    const defaultDate = new Date();
    defaultDate.setDate(defaultDate.getDate() + 29);

    const value = rawValue || defaultDate;
    if (value instanceof Date) {
      return value.toISOString();
    }
    return util.types.toString(value);
  },
});

const subscriptionIdInput = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  comments: "Subscription ID to manage",
  dataSource: "listSubscriptions",
  clean: util.types.toString,
});

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "List all subscriptions for Microsoft SharePoint",
  },
  inputs: {
    connection,
    showInstanceWebhooks: input({
      label: "Show Instance Webhooks",
      type: "boolean",
      required: true,
      default: "true",
      comments: "Show only subscriptions for this Instance's webhooks",
      clean: util.types.toBool,
    }),
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    const { data } = await client.get<{
      "@odata.context": string;
      value: { notificationUrl: string; [key: string]: unknown }[];
    }>("/subscriptions");

    if (params.showInstanceWebhooks) {
      const instanceWebhooks = new Set(Object.values(context.webhookUrls));
      const instanceSubscriptions = data.value.filter(({ notificationUrl }) =>
        instanceWebhooks.has(notificationUrl),
      );
      return { data: { ...data, value: instanceSubscriptions } };
    }

    return { data };
  },
  examplePayload: {
    data: {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions",
      value: [
        {
          id: "e9d5b726-4478-4412-bfba-268530484566",
          resource:
            "sites/example.sharepoint.com,17cd4ada-1a76-420e-a7ec-4adaa3327c86,87742bc7-2d2f-404c-8255-d3d9fa9a6561/lists/3a3c0f6a-86da-4567-94d4-3b939da63200",
          applicationId: "e76615c0-13e3-4cd2-8235-a2d628ad13de",
          changeType: "updated",
          clientState: null,
          notificationUrl: "https://example.com/webhook/",
          notificationQueryOptions: null,
          lifecycleNotificationUrl: null,
          expirationDateTime: "2022-11-22T23:32:10.231Z",
          creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
          includeResourceData: null,
          latestSupportedTlsVersion: "v1_2",
          encryptionCertificate: null,
          encryptionCertificateId: null,
          notificationUrlAppId: null,
        },
      ],
    },
  },
});

const createSiteListSubscription = action({
  display: {
    label: "Create Site List Subscription",
    description: "Create a Site List subscription for Microsoft SharePoint",
  },
  inputs: {
    connection,
    siteId,
    listId,
    notificationUrl: notificationUrlInput,
    expirationDateTime: expirationDateTimeInput,
    allowDuplicates: input({
      label: "Allow Duplicates",
      type: "boolean",
      required: false,
      default: "false",
      comments: "Enable to allow more than one webhook per endpoint",
      clean: util.types.toBool,
    }),
  },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);

    if (!params.allowDuplicates) {
      const {
        data: { value: subscriptions },
      } = await client.get<{ value: { notificationUrl: string }[] }>("/subscriptions");
      const [existingSubscription] = subscriptions.filter(
        ({ notificationUrl }) => params.notificationUrl === notificationUrl,
      );
      if (existingSubscription) {
        context.logger.info(
          "A webhook with the specified Notification URL already exists. Skipping webhook creation and returning existing webhook.",
        );
        return { data: existingSubscription };
      }
    }

    const { data } = await client.post("/subscriptions", {
      resource: `sites/${params.siteId}/lists/${params.listId}`,
      notificationUrl: params.notificationUrl,
      
      changeType: "updated",
      expirationDateTime: params.expirationDateTime,
    });
    return { data };
  },
  examplePayload: {
    data: {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
      id: "e9d5b726-4478-4412-bfba-268530484566",
      resource:
        "sites/example.sharepoint.com,17cd4ada-1a76-420e-a7ec-4adaa3327c86,87742bc7-2d2f-404c-8255-d3d9fa9a6561/lists/3a3c0f6a-86da-4567-94d4-3b939da63200",
      applicationId: "e76615c0-13e3-4cd2-8235-a2d628ad13de",
      changeType: "updated",
      clientState: null,
      notificationUrl: "https://example.com/webhook/",
      notificationQueryOptions: null,
      lifecycleNotificationUrl: null,
      expirationDateTime: "2022-11-22T23:32:10.231Z",
      creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
      includeResourceData: null,
      latestSupportedTlsVersion: "v1_2",
      encryptionCertificate: null,
      encryptionCertificateId: null,
      notificationUrlAppId: null,
    },
  },
});

const updateSiteListSubscriptionExpiration = action({
  display: {
    label: "Update Site List Subscription Expiration",
    description: "Update existing Site List subscription expiration for Microsoft SharePoint",
  },
  inputs: {
    connection,
    subscriptionId: subscriptionIdInput,
    expirationDateTime: expirationDateTimeInput,
  },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.patch(`/subscriptions/${params.subscriptionId}`, {
      expirationDateTime: params.expirationDateTime,
    });
    return { data };
  },
  examplePayload: {
    data: {
      "@odata.context": "https://graph.microsoft.com/v1.0/$metadata#subscriptions/$entity",
      id: "e9d5b726-4478-4412-bfba-268530484566",
      resource:
        "sites/example.sharepoint.com,17cd4ada-1a76-420e-a7ec-4adaa3327c86,87742bc7-2d2f-404c-8255-d3d9fa9a6561/lists/3a3c0f6a-86da-4567-94d4-3b939da63200",
      applicationId: "e76615c0-13e3-4cd2-8235-a2d628ad13de",
      changeType: "updated",
      clientState: null,
      notificationUrl: "https://example.com/webhook/",
      notificationQueryOptions: null,
      lifecycleNotificationUrl: null,
      expirationDateTime: "2022-11-22T23:32:10.231Z",
      creatorId: "c8edbeda-c453-446c-91ce-c6d5c7310a6c",
      includeResourceData: null,
      latestSupportedTlsVersion: "v1_2",
      encryptionCertificate: null,
      encryptionCertificateId: null,
      notificationUrlAppId: null,
    },
  },
});

export const deleteSubscription = action({
  display: {
    label: "Delete Subscription",
    description: "Delete existing subscription for Microsoft SharePoint",
  },
  inputs: { connection, subscriptionId: subscriptionIdInput },
  perform: async ({ debug: { enabled: debug } }, params) => {
    const client = await createClient(params.connection, debug);
    const { data } = await client.delete(`/subscriptions/${params.subscriptionId}`);
    return { data };
  },
  examplePayload: { data: "" },
});

export const deleteAllInstanceSubscriptions = action({
  display: {
    label: "Delete All Instance Subscriptions",
    description: "Delete all subscriptions pointed at this instance",
  },
  inputs: { connection },
  perform: async (context, params) => {
    const client = await createClient(params.connection, context.debug.enabled);
    
    const {
      data: { value: subscriptions },
    } = await client.get<{ value: { notificationUrl: string; id: string }[] }>("/subscriptions");

    const instanceWebhooks = new Set(Object.values(context.webhookUrls));
    const subscriptionsToRemove = subscriptions
      .filter(({ notificationUrl }) => instanceWebhooks.has(notificationUrl))
      .map(({ id }) => id);

    await Promise.all(subscriptionsToRemove.map((id) => client.delete(`/subscriptions/${id}`)));

    return { data: { subscriptionsRemoved: subscriptionsToRemove } };
  },
  examplePayload: {
    data: {
      subscriptionsRemoved: [
        "26ebd1e9-c54a-4bbe-9583-fc05974952a4",
        "b9b27172-ee2e-4248-86df-fc98cb71d914",
      ],
    },
  },
});

export default {
  
  createSiteListSubscription,
  updateSiteListSubscriptionExpiration,
  
  
};
