import { input, util } from "@prismatic-io/spectral";
import { cleanStringInput } from "../util";
import { RENEWAL_EXPIRATION_MINUTES } from "../constants";

export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The Outlook connection to use.",
});

export const startInput = input({
  label: "Start At",
  type: "string",
  required: true,
  example: "2024-01-15T12:00:00",
  placeholder: "Enter start time (ISO 8601 format)",
  comments:
    "The start timestamp in ISO 8601 format without timezone information. Format: YYYY-MM-DDTHH:mm:ss.",
  clean: util.types.toString,
});

export const startTimezoneInput = input({
  label: "Start Timezone",
  type: "string",
  required: true,
  default: "UTC",
  example: "Pacific Standard Time",
  placeholder: "Select a timezone",
  dataSource: "selectTimezone",
  comments:
    "The timezone applied to the start time of the event. Use the List Supported Timezones action for valid aliases or values for this user.",
  clean: util.types.toString,
});

export const endInput = input({
  label: "End At",
  type: "string",
  required: true,
  example: "2024-01-15T14:00:00",
  placeholder: "Enter end time (ISO 8601 format)",
  comments:
    "The end timestamp in ISO 8601 format without timezone information. Format: YYYY-MM-DDTHH:mm:ss.",
  clean: util.types.toString,
});

export const endTimezoneInput = input({
  label: "End Timezone",
  type: "string",
  required: true,
  default: "UTC",
  example: "Pacific Standard Time",
  placeholder: "Select a timezone",
  dataSource: "selectTimezone",
  comments:
    "The timezone applied to the end time of the event. Use the List Supported Timezones action for valid aliases or values for this user.",
  clean: util.types.toString,
});

export const pageLimitInput = input({
  label: "Page Limit",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter maximum results per page",
  comments: "The maximum number of results to return per page.",
  clean: (value) => util.types.toNumber(value) || undefined,
});

export const pageSkipInput = input({
  label: "Page Skip",
  type: "string",
  required: false,
  example: "100",
  placeholder: "Enter number of records to skip",
  comments: "The number of records to skip before returning results.",
  clean: cleanStringInput,
});

export const fetchAllInput = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  example: "false",
  comments: "When true, automatically fetches all pages of results using pagination.",
  clean: util.types.toBool,
});

export const eventIdInput = input({
  label: "Event ID",
  type: "string",
  required: true,
  clean: util.types.toString,
  comments: "The unique identifier of the calendar event.",
  example: "AAMkAGIAAAoZDOFAAA=",
  placeholder: "Enter Event ID",
  dataSource: "selectEvent",
});

export const folderIdInput = input({
  label: "Folder ID",
  type: "string",
  required: false,
  dataSource: "selectMailFolder",
  comments: "The unique identifier of the mail folder. Omit to list all messages.",
  example: "AAMkAGI2TGuLAAA=",
  placeholder: "Enter Folder ID",
  clean: cleanStringInput,
});

export const changeTypesInput = input({
  label: "Mail Change Types",
  type: "string",
  required: true,
  collection: "valuelist",
  comments: "The types of changes to listen for on mail messages.",
  placeholder: "Select change types",
  model: ["created", "updated", "deleted"].map((changeType) => {
    return { value: changeType, label: `on ${changeType}` };
  }),
  clean: (value: unknown): string => {
    if (Array.isArray(value)) {
      return value.join(",");
    }
    return util.types.toString(value);
  },
});

export const allowDuplicatesInput = input({
  label: "Allow Duplicates",
  type: "boolean",
  required: false,
  default: "false",
  example: "false",
  comments: "When true, allows more than one webhook subscription per endpoint.",
  clean: util.types.toBool,
});

export const notificationUrlInput = input({
  label: "Notification URL",
  type: "string",
  required: true,
  comments: "The URL where notification events will be sent.",
  example: "https://example.com/webhook",
  placeholder: "Enter notification URL",
  clean: util.types.toString,
});

export const expirationDateTimeInput = input({
  label: "Expiration Date/Time",
  type: "string",
  required: false,
  comments:
    "The expiration date and time for the webhook subscription in ISO 8601 format. If unspecified, defaults to the current date/time plus 10,070 minutes (the maximum permitted by the Graph API).",
  example: "2024-12-31T23:59:59.999Z",
  placeholder: "Enter expiration date/time (ISO 8601 format)",
  clean: (rawValue: unknown) => {
    const defaultDate = new Date();
    defaultDate.setTime(defaultDate.getTime() + RENEWAL_EXPIRATION_MINUTES * 60 * 1000);

    const value = rawValue || defaultDate;
    if (value instanceof Date) {
      return value.toISOString();
    }
    return util.types.toString(value);
  },
});

export const subscriptionIdInput = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the webhook subscription.",
  example: "e9d5b726-4478-4412-bfba-268530484566",
  placeholder: "Select a subscription",
  dataSource: "selectSubscription",
  clean: util.types.toString,
});
