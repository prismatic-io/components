import { input, util } from "@prismatic-io/spectral";
import { NOTIFICATION_CONDITION_EXAMPLE, NOTIFICATION_EVENTS_EXAMPLE } from "../constants";
import { toOptionalObject, toOptionalString } from "../util/general";
import { connectionInput, fetchAll, page, per_page } from "./common";

export const channelId = input({
  label: "Channel ID",
  placeholder: "Enter the Channel ID",
  example: "123456789",
  type: "string",
  required: true,
  dataSource: "selectNotificationChannel",
  comments:
    "User-defined unique numeric identifier for the notification channel. You create this ID when enabling notifications and use it to reference the channel in subsequent operations. Must be a number.",
  clean: util.types.toString,
});

export const notificationEvents = input({
  label: "Events",
  placeholder: "Enter one or more events",
  type: "code",
  language: "json",
  required: true,
  comments:
    'Subscribed operations in format "{module}.{operation}". Operations: create, edit, delete, all.',
  clean: util.types.toObject,
  example: JSON.stringify(NOTIFICATION_EVENTS_EXAMPLE, null, 2),
});

export const notifyUrl = input({
  label: "Notify URL",
  placeholder: "Enter the notification URL",
  example: "https://example.com/webhook",
  type: "string",
  required: true,
  comments: "The URL that will receive POST notifications about the actions.",
  clean: util.types.toString,
});

export const notificationToken = input({
  label: "Token",
  placeholder: "Enter verification token",
  type: "string",
  required: false,
  comments:
    "Verification token (max 50 chars) sent in callbacks to verify notifications are from Zoho CRM.",
  example: "my_verification_token_123",
  clean: toOptionalString,
});

export const channelExpiry = input({
  label: "Channel Expiry",
  placeholder: "Enter ISO Datetime for Expiry",
  example: "2024-12-31T23:59:59Z",
  type: "string",
  required: false,
  comments: "ISO datetime for expiry. Maximum 1 week from now. Default is 1 hour.",
  clean: toOptionalString,
});

export const returnAffectedFieldValues = input({
  label: "Return Affected Field Values",
  type: "boolean",
  required: false,
  comments: "When true, includes updated field values in the notification callback.",
  clean: util.types.toBool,
});

export const notifyOnRelatedAction = input({
  label: "Notify On Related Action",
  type: "boolean",
  required: false,
  default: "true",
  comments: "When true, triggers notifications when associated record actions occur.",
  clean: util.types.toBool,
});

export const notificationCondition = input({
  label: "Notification Condition",
  placeholder: "Fields to watch",
  type: "code",
  language: "json",
  required: false,
  comments: "Filter notifications by specific field changes. Provide field API names to watch.",
  clean: toOptionalObject,
  example: JSON.stringify(NOTIFICATION_CONDITION_EXAMPLE, null, 2),
});

export const notificationModule = input({
  label: "Module",
  placeholder: "Enter module name",
  type: "string",
  required: false,
  comments:
    "API name of the module (e.g., Leads, Deals, Contacts). Leave empty to get all modules.",
  example: "Leads",
  clean: toOptionalString,
});

export const channelIds = input({
  label: "Channel IDs",
  placeholder: "Enter one or more Channel IDs",
  type: "string",
  required: true,
  comments:
    "Comma-separated channel IDs to disable. These are the IDs you provided when enabling the notification channels.",
  clean: util.types.toString,
  example: "123456789,987654321",
});


export const notificationEnableInputs = {
  connection: connectionInput,
  channelId,
  events: notificationEvents,
  notifyUrl,
  token: notificationToken,
  channelExpiry,
  returnAffectedFieldValues,
  notifyOnRelatedAction,
  notificationCondition,
};

export const notificationGetDetailsInputs = {
  channelId,
  fetchAll,
  module: notificationModule,
  page,
  per_page,
  connection: connectionInput,
};

export const notificationUpdateInputs = {
  connection: connectionInput,
  channelId,
  events: { ...notificationEvents, required: false, clean: toOptionalObject },
  notifyUrl: { ...notifyUrl, required: false },
  token: notificationToken,
  channelExpiry,
  notificationCondition,
};

export const notificationDisableInputs = {
  connection: connectionInput,
  channelIds,
};

export const notificationSpecificDisableInputs = {
  connection: connectionInput,
  channelId,
  events: notificationEvents,
  notifyOnRelatedAction,
};

export const notificationsTriggerInputs = {
  connection: connectionInput,
  channelId: {
    ...channelId,
    required: false,
    comments:
      "User-defined unique identifier for the notification channel. Leave empty and we will generate one.",
  },
  events: notificationEvents,
  token: notificationToken,
  channelExpiry,
  returnAffectedFieldValues,
  notifyOnRelatedAction,
  notificationCondition,
};


export const selectNotificationChannelInputs = {
  connection: connectionInput,
};
