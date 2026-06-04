import { input, util } from "@prismatic-io/spectral";
import { ENS_ALL_EVENT_TYPES } from "../constants";
import { toOptionalNumber } from "../util";
import { connection } from "./common";





const callbackId = input({
  label: "Callback ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the ENS callback registration.",
  example: "cb-12345-abcde",
  placeholder: "Enter callback ID",
  dataSource: "selectCallback",
  clean: util.types.toString,
});

const callbackName = input({
  label: "Callback Name",
  type: "string",
  required: true,
  comments: "A descriptive name for the ENS callback endpoint registration.",
  example: "My Integration Webhook",
  placeholder: "Enter callback name",
  clean: util.types.toString,
});

const callbackUrl = input({
  label: "Callback URL",
  type: "string",
  required: true,
  comments: "The URL where Marketing Cloud will send event notifications.",
  example: "https://hooks.example.com/sfmc/events",
  placeholder: "Enter callback URL",
  clean: util.types.toString,
});

const maxBatchSize = input({
  label: "Max Batch Size",
  type: "string",
  required: false,
  comments:
    "The maximum number of events to include in a single callback batch (1-100). Defaults to 100.",
  example: "100",
  placeholder: "Enter max batch size",
  clean: toOptionalNumber,
});





const verificationKey = input({
  label: "Verification Key",
  type: "string",
  required: true,
  comments:
    "The verification key sent to the callback URL during registration. Must be returned to verify ownership.",
  example: "abc123def456",
  placeholder: "Enter verification key",
  clean: util.types.toString,
});





const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  required: true,
  comments: "The unique identifier of the ENS event subscription.",
  example: "sub-12345-abcde",
  placeholder: "Enter subscription ID",
  dataSource: "selectSubscription",
  clean: util.types.toString,
});

const subscriptionName = input({
  label: "Subscription Name",
  type: "string",
  required: true,
  comments: "A descriptive name for the ENS event subscription.",
  example: "Email Events Subscription",
  placeholder: "Enter subscription name",
  clean: util.types.toString,
});

const eventCategoryTypes = input({
  label: "Event Types",
  type: "string",
  collection: "valuelist",
  required: true,
  model: ENS_ALL_EVENT_TYPES,
  comments:
    "The event types to subscribe to. Select one or more Marketing Cloud event categories.",
  clean: (value: unknown) => value as string[],
});

const callbackUrlOptional = input({
  label: "Callback URL",
  type: "string",
  required: false,
  comments:
    "The updated URL where Marketing Cloud will send event notifications.",
  example: "https://hooks.example.com/sfmc/events",
  placeholder: "Enter callback URL",
  clean: (value: unknown) => (value ? util.types.toString(value) : undefined),
});

const maxBatchSizeOptional = input({
  label: "Max Batch Size",
  type: "string",
  required: false,
  comments:
    "The updated maximum number of events to include in a single callback batch (1-100).",
  example: "100",
  placeholder: "Enter max batch size",
  clean: toOptionalNumber,
});





export const updateCallbackInputs = {
  connection,
  callbackId,
  callbackName: {
    ...callbackName,
    required: false,
    clean: (value: unknown) => (value ? util.types.toString(value) : undefined),
  },
  callbackUrl: callbackUrlOptional,
  maxBatchSize: maxBatchSizeOptional,
};

export const updateSubscriptionInputs = {
  connection,
  subscriptionId,
  subscriptionName: {
    ...subscriptionName,
    required: false,
    clean: (value: unknown) => (value ? util.types.toString(value) : undefined),
  },
  eventCategoryTypes: {
    ...eventCategoryTypes,
    required: false,
  },
};

export const listCallbacksInputs = {
  connection,
};

export const createCallbackInputs = {
  connection,
  callbackName,
  callbackUrl,
  maxBatchSize,
};

export const verifyCallbackInputs = {
  connection,
  callbackId,
  verificationKey,
};

export const deleteCallbackInputs = {
  connection,
  callbackId,
};

export const listSubscriptionsInputs = {
  connection,
};

export const createSubscriptionInputs = {
  connection,
  subscriptionName,
  callbackId,
  eventCategoryTypes,
};

export const getSubscriptionInputs = {
  connection,
  subscriptionId,
};

export const deleteSubscriptionInputs = {
  connection,
  subscriptionId,
};

const signatureKey = input({
  label: "Signature Key",
  type: "password",
  required: false,
  comments:
    "The base64-encoded signature key provided when creating the ENS callback. Copy this value exactly as returned by Salesforce. Used to validate webhook signatures for security.",
  example: "SmWButn7JlKSZghyaKgNSc8OQy6V3U9L8I2g8lqsWFs=",
  placeholder: "Enter the base64 signature key from callback creation",
  clean: (value: unknown) => (value ? util.types.toString(value) : undefined),
});

export const ensWebhookInputs = {
  signatureKey,
};
