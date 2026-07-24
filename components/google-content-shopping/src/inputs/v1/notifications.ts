import { input, util } from "@prismatic-io/spectral";
import { toOptionalString } from "../../util";
import {
  account,
  connectionOnlyInputs,
  paginationGroupedInputs,
} from "./common";
const callBackUri = input({
  label: "Callback URI",
  type: "string",
  clean: util.types.toString,
  comments: "The URL where notifications will be delivered via HTTPS POST.",
  example: "https://www.example.com/webhooks/merchant",
  placeholder: "Enter Callback URL",
  required: true,
});
const registeredEvent = input({
  label: "Registered Event",
  type: "string",
  clean: util.types.toString,
  comments: "The event the subscription is registered for.",
  placeholder: "Select event",
  required: true,
  default: "PRODUCT_STATUS_CHANGE",
  model: [
    {
      label: "Product Status Change",
      value: "PRODUCT_STATUS_CHANGE",
    },
  ],
});
const targetAccount = input({
  label: "Target Account",
  type: "string",
  clean: toOptionalString,
  comments:
    "Subscribe to notifications for a single sub-account (e.g. accounts/123456789). Leave empty to subscribe for all managed accounts instead.",
  example: "accounts/123456789",
  placeholder: "Enter Target Account resource name",
  required: false,
});
const allManagedAccounts = input({
  label: "All Managed Accounts",
  type: "boolean",
  clean: util.types.toBool,
  comments:
    "When true, subscribe to notifications for all sub-accounts of the calling account. Ignored when a Target Account is provided.",
  default: "true",
  required: false,
});
export const getPubSubNotificationInputs = {
  ...connectionOnlyInputs,
  account,
  ...paginationGroupedInputs,
};
export const updatePubSubNotificationInputs = {
  ...connectionOnlyInputs,
  account,
  registeredEvent,
  callBackUri,
  targetAccount,
  allManagedAccounts,
};
