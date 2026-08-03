import { input, util } from "@prismatic-io/spectral";
import { AD_ACCOUNT_FIELDS, PAGE_FIELDS } from "../constants";
import { cleanCodeInput, cleanValueList } from "../util/clean";
import { version, webhookConnection } from "./common";
const verifyToken = input({
  label: "Verify Token",
  type: "string",
  required: true,
  comments: "The verify token for the webhook.",
  example: "test",
  placeholder: "test",
  clean: util.types.toString,
});
const object = input({
  label: "Object",
  type: "string",
  required: true,
  comments: "The object to be subscribed to.",
  example: "user",
  model: [
    { label: "Page", value: "page" },
    { label: "Ad Account", value: "ad_account" },
  ],
  clean: util.types.toString,
});
const callbackUrl = input({
  label: "Callback Url",
  type: "string",
  required: true,
  comments: "The URL to send the webhook to.",
  example: "https://your-domain.com/webhook",
  placeholder: "https://your-domain.com/webhook",
  clean: util.types.toString,
});
const pageFields = input({
  label: "Page Fields",
  collection: "valuelist",
  type: "string",
  required: false,
  comments: "The fields to be subscribed to.",
  example: "id,name",
  model: PAGE_FIELDS,
  clean: cleanValueList,
});
const pageFieldsJSON = input({
  label: "Dynamic Page Fields",
  type: "code",
  language: "json",
  required: false,
  comments: "The fields to be subscribed to.",
  example: JSON.stringify(
    PAGE_FIELDS.map((field) => field.value),
    null,
    2,
  ),
  clean: (value) => cleanCodeInput(value, "Page Fields"),
});
const adAccountFields = input({
  label: "Ad Account Fields",
  collection: "valuelist",
  type: "string",
  required: false,
  comments: "The fields to be subscribed to.",
  example: "id,name",
  model: AD_ACCOUNT_FIELDS,
  clean: cleanValueList,
});
const adAccountFieldsJSON = input({
  label: "Dynamic Ad Account Fields",
  type: "code",
  language: "json",
  required: false,
  comments: "The fields to be subscribed to.",
  example: JSON.stringify(
    AD_ACCOUNT_FIELDS.map((field) => field.value),
    null,
    2,
  ),
  clean: (value) => cleanCodeInput(value, "Ad Account Fields"),
});
export const createPageWebhookInputs = {
  connection: webhookConnection,
  verifyToken,
  callbackUrl,
  pageFields,
  pageFieldsJSON,
  version,
};
export const createAdAccountWebhookInputs = {
  connection: webhookConnection,
  verifyToken,
  callbackUrl,
  adAccountFields,
  adAccountFieldsJSON,
  version,
};
export const deleteWebhookInputs = {
  connection: webhookConnection,
  object: {
    ...object,
    comments: "The webhook associated with the object will be deleted.",
  },
  version,
};
export const listWebhooksInputs = {
  connection: webhookConnection,
  version,
};
export const metaAdsPageTriggerInputs = {
  connection: webhookConnection,
  verifyToken,
  pageFields,
  pageFieldsJSON,
  version,
};
export const metaAdsAdAccountTriggerInputs = {
  connection: webhookConnection,
  verifyToken,
  adAccountFields,
  adAccountFieldsJSON,
  version,
};
