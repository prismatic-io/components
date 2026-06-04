import { input } from "@prismatic-io/spectral";
import { toOptionalString } from "../util";

export const timeZone = input({
  label: "Time Zone",
  type: "string",
  placeholder: "Enter a TZInfo-formatted time zone",
  example: "America/Los_Angeles",
  required: false,
  clean: toOptionalString,
  comments:
    "The TZInfo-formatted time zone in which results are rendered. Example: 'America/Los_Angeles'.",
});

export const filterNotifications = input({
  label: "Filter",
  type: "string",
  required: false,
  model: [
    { label: "Sms Notification", value: "sms_notification" },
    { label: "Email Notification", value: "email_notification" },
    { label: "Phone Notification", value: "phone_notification" },
    { label: "Push Notification", value: "push_notification" },
  ],
  clean: toOptionalString,
  comments: "The notification type to filter results by.",
});

export const includeNotifications = input({
  label: "Include",
  type: "string",
  required: false,
  model: [{ label: "Users", value: "users" }],
  clean: toOptionalString,
  comments: "The additional details to include in the response.",
});
