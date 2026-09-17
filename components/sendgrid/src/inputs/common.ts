import { input, structuredObjectInput, util } from "@prismatic-io/spectral";
import { cleanStringInput, cleanValueListInput } from "../util";
export const connectionInput = input({
  label: "Connection",
  type: "connection",
  required: true,
  comments: "The SendGrid connection to use.",
});
export const fetchAll = input({
  label: "Fetch All",
  type: "boolean",
  required: false,
  default: "false",
  comments: "When true, fetches all pages of results using pagination.",
  clean: util.types.toBool,
});
const pageSize = input({
  label: "Page Size",
  type: "string",
  required: false,
  placeholder: "Enter page size",
  example: "10",
  comments: "Number of results to return per page (max 100).",
  clean: cleanStringInput,
});
const pageToken = input({
  label: "Page Token",
  type: "string",
  required: false,
  placeholder: "Enter page token",
  comments: "Token for fetching the next or previous page of results.",
  clean: cleanStringInput,
});
export const pagination = structuredObjectInput({
  label: "Pagination",
  required: false,
  comments: "Page size and page token controls for paging through results.",
  inputs: { page_size: pageSize, page_token: pageToken },
});
export const events = input({
  label: "Events",
  collection: "valuelist",
  type: "string",
  required: true,
  model: [
    { label: "Delivered", value: "delivered" },
    { label: "Bounce", value: "bounce" },
    { label: "Deferred", value: "deferred" },
    { label: "Processed", value: "processed" },
    { label: "Dropped", value: "dropped" },
    { label: "Open", value: "open" },
    { label: "Click", value: "click" },
    { label: "Spam Report", value: "spamReport" },
    { label: "Unsubscribe", value: "unsubscribe" },
    { label: "Group Unsubscribe", value: "groupUnsubscribe" },
    { label: "Group Resubscribe", value: "groupResubscribe" },
    { label: "Account Status Change", value: "accountStatusChange" },
  ],
  comments:
    "The email event types to subscribe to. Selected events trigger webhook notifications when they occur.",
  example: "delivered",
  default: ["delivered"],
  clean: cleanValueListInput,
});
export const webhookFriendlyName = input({
  label: "Friendly Name",
  placeholder: "Enter a friendly name",
  example: "My Event Webhook",
  type: "string",
  required: false,
  clean: cleanStringInput,
  comments: "A friendly name to help differentiate between multiple webhooks.",
});
