import { input, util } from "@prismatic-io/spectral";
import {
  connection,
  organization,
  user,
  sort,
  scope,
  signingKey,
} from "./common";
const url = input({
  label: "URL",
  type: "string",
  comments: "The URL to receive POST requests for subscribed events.",
  required: true,
  placeholder: "Enter webhook URL",
  clean: util.types.toString,
});
const event = input({
  label: "Event",
  type: "string",
  collection: "valuelist",
  comments: "Event to subscribe to.",
  required: true,
  example: [
    "invitee.canceled",
    "invitee.created",
    "invitee_no_show.created",
    "routing_form_submission.created",
  ].join(", "),
  clean: (value) => value as string[],
});
const webhookUuid = input({
  label: "Webhook UUID",
  type: "string",
  required: true,
  comments: "The webhook's unique identifier.",
  placeholder: "Enter webhook UUID",
  clean: util.types.toString,
});
export const createWebhookSubscriptionInputs = {
  connection,
  organization: {
    ...organization,
    required: true,
    dataSource: "organizations",
    comments:
      "The unique reference to the organization that the webhook will be tied to.",
  },
  user: {
    ...user,
    required: false,
    comments:
      "The unique reference to the user that the webhook will be tied to.",
  },
  url,
  event,
  scope,
  signingKey,
};
export const deleteInstancedWebhooksInputs = {
  connection,
  organization: {
    ...organization,
    required: true,
    dataSource: "organizations",
    comments: "Organization to delete webhooks from",
  },
  scope: {
    ...scope,
    required: true,
    comments: "Organization or user webhooks to delete",
  },
  user: {
    ...user,
    comments: "User to delete webhooks from. Required if scope is set to user.",
  },
};
export const deleteWebhookSubscriptionInputs = {
  connection,
  webhookUuid,
};
export const getWebhookSubscriptionInputs = {
  connection,
  webhookUuid,
};
export const listWebhookSubscriptionInputs = {
  connection,
  organization: {
    ...organization,
    required: true,
    dataSource: "organizations",
    comments: "Indicates if the results should be filtered by organization",
  },
  scope: {
    ...scope,
    required: true,
    comments: "Filter the list by organization or user",
  },
  sort: {
    ...sort,
    default: undefined,
    comments:
      "Order results by the specified field and direction. Accepts comma-separated list of {field}:{direction} values. Supported fields are: created_at. Sort direction is specified as: asc, desc.",
  },
  user: {
    ...user,
    comments:
      "Indicates if the results should be filtered by user. This parameter is only required if the scope parameter is set to user.",
  },
};
