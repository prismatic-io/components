import { input, util } from "@prismatic-io/spectral";
import {
  cleanFunctionForBooleanValueList,
  cleanFunctionForString,
  cleanFunctionValueList,
} from "../util";
import { WEBHOOK_SUBSCRIPTION_EVENT_TYPES } from "../constants";
import { connection, cursor, fetchAll, filterQuery, pageSize } from "./common";

const scope = input({
  label: "Scope",
  type: "string",
  required: true,
  placeholder: "Select scope",
  model: ["ACCOUNT", "GROUP", "USER", "RESOURCE"].map((model) => {
    return {
      value: model,
      label: model,
    };
  }),
  comments: "Scope of the webhook.",
  clean: util.types.toString,
});

const showInactiveWebhooks = input({
  label: "Show Inactive Webhooks",
  type: "boolean",
  comments:
    "When true, fetches all the inactive webhooks along with the active webhooks. Default value is false.",
  clean: util.types.toBool,
  required: false,
});

const webhookId = input({
  label: "Webhook ID",
  type: "string",
  required: true,
  placeholder: "Enter Webhook ID",
  example: "CBJCHBCAABAAxxxxxxxxxxxxxxxxxxxxxxxxxx",
  comments:
    "The webhook identifier, as returned by the Adobe Sign Webhook API.",
  dataSource: "selectWebhooks",
  clean: util.types.toString,
});

const webhookSubscriptionEvents = input({
  label: "Webhook Subscription Events",
  type: "string",
  required: true,
  placeholder: "Select subscription events",
  model: WEBHOOK_SUBSCRIPTION_EVENT_TYPES.map((model) => {
    return {
      value: model,
      label: model,
    };
  }),
  collection: "valuelist",
  comments:
    "The list of events for which the webhook subscription is being made.",
  clean: cleanFunctionValueList,
});

const webhookName = input({
  label: "Webhook Name",
  type: "string",
  required: true,
  placeholder: "Enter webhook name",
  example: "Agreement Status Webhook",
  comments: "The name of the webhook.",
  clean: util.types.toString,
});

const webhookUrlInfo = input({
  label: "Webhook URL",
  type: "string",
  required: true,
  placeholder: "Enter webhook URL",
  example: "https://your-webhook-endpoint.com/webhook/abc123",
  comments: "The URL to which the webhook payload is to be delivered.",
  clean: util.types.toString,
});

const webhookApplicationDisplayName = input({
  label: "Application Display Name",
  type: "string",
  required: false,
  placeholder: "Enter application display name",
  example: "My Integration App",
  comments: "The name of the application through which the webhook is created.",
  clean: cleanFunctionForString,
});

const webhookApplicationName = input({
  label: "Application Name",
  type: "string",
  required: false,
  placeholder: "Enter application name",
  example: "my-integration-app",
  comments: "The name of the application through which the webhook is created.",
  clean: cleanFunctionForString,
});

const webhookProblemNotificationEmails = input({
  label: "Problem Notification Emails",
  type: "string",
  collection: "valuelist",
  required: false,
  placeholder: "Enter email addresses",
  example: '["admin@example.com", "support@example.com"]',
  comments:
    "The list of email addresses to which the webhook problem notifications are sent.",
  clean: cleanFunctionValueList,
});

const webhookResourceId = input({
  label: "Resource ID",
  type: "string",
  required: false,
  placeholder: "Enter Resource ID",
  example: "3AAABLblqZhBf0aJb0XZqz5vXy8g3V9R3qQx6",
  comments:
    "ID of the resource type for which you want to create webhook. Provide agreementId if webhook needs to be created for an agreement. Similarly, widgetId if webhook needs to be created for a web form, megaSignId if webhook needs to be created for a bulk send and libraryDocumentId if webhook needs to be created for a library document. <strong>Note:</strong> Only specify if scope is 'RESOURCE'.",
  clean: cleanFunctionForString,
});

const webhookResourceType = input({
  label: "Webhook Resource Type",
  type: "string",
  required: false,
  placeholder: "Select resource type",
  clean: cleanFunctionForString,
  model: ["AGREEMENT", "WIDGET", "MEGASIGN", "LIBRARY_DOCUMENT"].map(
    (options) => {
      return {
        value: options,
        label: options,
      };
    },
  ),
  comments:
    "The type of resource being accessed. <strong>Note:</strong> Only specify if scope is Resource.",
});


export const webhookStatus = input({
  label: "Webhook Status",
  type: "string",
  required: false,
  placeholder: "Select status",
  clean: util.types.toString,
  model: ["ACTIVE", "INACTIVE"].map((options) => {
    return {
      value: options,
      label: options,
    };
  }),
  comments: "The status of the webhook.",
});

const webhookAgreementEvents = input({
  label: "Webhook Agreement Conditional Parameters",
  type: "string",
  required: false,
  collection: "valuelist",
  placeholder: "Select conditional parameters",
  model: [
    "includeDetailedInfo",
    "includeDocumentsInfo",
    "includeParticipantsInfo",
    "includeSignedDocuments",
  ].map((param) => {
    return {
      value: param,
      label: param,
    };
  }),
  comments:
    "Optional parameters to include additional information in the webhook payload for agreements.",
  clean: cleanFunctionForBooleanValueList,
});

const webhookLibraryDocumentEvents = input({
  label: "Webhook Library Documents Conditional Parameters",
  type: "string",
  required: false,
  collection: "valuelist",
  placeholder: "Select conditional parameters",
  model: ["includeDetailedInfo", "includeDocumentsInfo"].map((param) => {
    return {
      value: param,
      label: param,
    };
  }),
  comments:
    "Optional parameters to include additional information in the webhook payload for library documents.",
  clean: cleanFunctionForBooleanValueList,
});

const webhookMegaSignEvents = input({
  label: "Webhook MegaSign Conditional Parameters",
  type: "string",
  required: false,
  collection: "valuelist",
  placeholder: "Select conditional parameters",
  model: ["includeDetailedInfo"].map((param) => {
    return {
      value: param,
      label: param,
    };
  }),
  comments:
    "Optional parameters to include additional information in the webhook payload for MegaSign.",
  clean: cleanFunctionForBooleanValueList,
});

const webhookWidgetEvents = input({
  label: "Webhook Widget Conditional Parameters",
  type: "string",
  required: false,
  collection: "valuelist",
  placeholder: "Select conditional parameters",
  model: [
    "includeDetailedInfo",
    "includeDocumentsInfo",
    "includeParticipantsInfo",
  ].map((param) => {
    return {
      value: param,
      label: param,
    };
  }),
  comments:
    "Optional parameters to include additional information in the webhook payload for widgets.",
  clean: cleanFunctionForBooleanValueList,
});

export const createWebhookInputs = {
  connection,
  webhookSubscriptionEvents,
  scope,
  webhookName,
  webhookUrlInfo,
  webhookApplicationDisplayName,
  webhookApplicationName,
  webhookProblemNotificationEmails,
  webhookResourceId,
  webhookResourceType,
  webhookAgreementEvents,
  webhookLibraryDocumentEvents,
  webhookMegaSignEvents,
  webhookWidgetEvents,
};

export const deleteWebhookInputs = {
  connection,
  webhookId,
};

export const getWebhookInputs = {
  connection,
  webhookId,
};

export const listWebhooksInputs = {
  connection,
  fetchAll,
  showInactiveWebhooks,
  scope: {
    ...scope,
    required: false,
    comments: "Filter for webhooks with a specific scope.",
  },
  webhookResourceType,
  cursor,
  pageSize,
};

export const updateWebhookInputs = {
  connection,
  webhookSubscriptionEvents,
  scope,
  webhookName,
  webhookUrlInfo,
  webhookApplicationDisplayName,
  webhookApplicationName,
  webhookProblemNotificationEmails,
  webhookId,
  webhookAgreementEvents,
  webhookLibraryDocumentEvents,
  webhookMegaSignEvents,
  webhookWidgetEvents,
};

export const selectWebhooksInputs = {
  connection,
  filterQuery,
  scope: { ...scope, required: false },
  webhookResourceType: {
    ...webhookResourceType,
    comments: "The type of resource on which webhook was created.",
  },
};
