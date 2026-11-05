import { action } from "@prismatic-io/spectral";
import { createClient } from "../../client";
import { connection, showInstanceSubscriptions } from "../../inputs";

export const listSubscriptions = action({
  display: {
    label: "List Subscriptions",
    description: "List all available Subscriptions",
  },
  inputs: {
    connection,
    showInstanceSubscriptions,
  },
  perform: async (context, { connection, showInstanceSubscriptions }) => {
    const client = await createClient(connection, context.debug.enabled);
    const { data } = await client.get<{
      "@odata.context": string;
      value: { notificationUrl: string; [key: string]: unknown }[];
    }>("/subscriptions");

    if (showInstanceSubscriptions) {
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
          id: "38031b7d-16b1-448a-8e68-68b8aec6df45",
          resource: "/me/drive/root",
          applicationId: "0fed8223-8c47-4c71-ba78-92c6f9441235",
          changeType: "updated",
          clientState: null,
          notificationUrl: "https://hooks.example.com/trigger/SW5",
          notificationQueryOptions: null,
          lifecycleNotificationUrl: null,
          expirationDateTime: "2025-12-12T11:23:00.0000000Z",
          creatorId: "62162f3c-04d4-4b39-b2a4-ad891a5dcb8f",
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
