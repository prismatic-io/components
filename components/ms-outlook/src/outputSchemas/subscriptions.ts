import { nullableBoolean, nullableDateTime, nullableString } from "./shared";

const subscriptionSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    applicationId: nullableString,
    changeType: nullableString,
    clientState: nullableString,
    creatorId: nullableString,
    encryptionCertificate: nullableString,
    encryptionCertificateId: nullableString,
    expirationDateTime: nullableDateTime,
    id: { type: "string" },
    includeResourceData: nullableBoolean,
    latestSupportedTlsVersion: nullableString,
    lifecycleNotificationUrl: nullableString,
    notificationQueryOptions: nullableString,
    notificationUrl: nullableString,
    notificationUrlAppId: nullableString,
    resource: nullableString,
    vapidPublicKey: nullableString,
    webPushEncryptionP256dhPublicKey: nullableString,
    webPushEncryptionSecret: nullableString,
  },
  required: ["id"],
};

export const listSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    "@odata.context": nullableString,
    value: { type: "array" as const, items: subscriptionSchema },
    "@odata.nextLink": nullableString,
  },
  required: ["value"],
};

export const createEventSubscriptionOutputSchema = subscriptionSchema;

export const createMailFolderSubscriptionOutputSchema = subscriptionSchema;

export const updateEventSubscriptionOutputSchema = subscriptionSchema;

export const deleteAllInstanceSubscriptionsOutputSchema = {
  type: "object" as const,
  properties: {
    subscriptionsRemoved: { type: "array" as const, items: { type: "string" } },
  },
  required: ["subscriptionsRemoved"],
};
