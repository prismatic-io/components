import { input } from "@prismatic-io/spectral";
import {
  asStringArray,
  lookBackDateClean,
  toOptionalString,
  webhookEventOptions,
} from "../util";
import { connection } from "./common";
const authHeaderName = input({
  label: "Auth Header Name",
  type: "string",
  required: false,
  comments:
    "Name of the header Jamf Pro sends for header authentication (must match the webhook's configured header). Leave blank to accept all incoming requests.",
  clean: toOptionalString,
  placeholder: "X-Jamf-Signature",
  example: "X-Jamf-Signature",
});
const authHeaderValue = input({
  label: "Auth Header Value",
  type: "string",
  required: false,
  comments:
    "Expected value of the authentication header. Incoming requests whose header does not match are rejected. Required only if an Auth Header Name is set.",
  clean: toOptionalString,
  placeholder: "Enter the expected header value",
});
export const webhookInputs = { authHeaderName, authHeaderValue };
const events = input({
  label: "Events",
  type: "string",
  collection: "valuelist",
  required: true,
  model: webhookEventOptions,
  default: ["ComputerAdded"],
  comments:
    "The Jamf Pro events to subscribe to. One webhook is created per selected event.",
  clean: asStringArray,
});
const lookBackDate = input({
  label: "Look-back Date",
  placeholder: "Enter look-back date (YYYY-MM-DD)",
  type: "string",
  required: false,
  comments:
    "The date the initial sync starts from, in YYYY-MM-DD format. Cannot be a future date. Leave empty to start from the first recurrence with no backfill. When set, the initial sync seeds each computer enrolled on or after this date once.",
  example: "2026-01-01",
  clean: lookBackDateClean,
});
export const webhookEventsInputs = { connection, events };
export const pollComputersInputs = { connection, lookBackDate };
export const pollMobileDevicesInputs = { connection };
