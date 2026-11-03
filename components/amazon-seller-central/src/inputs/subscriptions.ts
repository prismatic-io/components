import { input, util } from "@prismatic-io/spectral";
import { valueListInputClean } from "../util";
import {
  connectionInput,
  destinationId,
  MarketplaceIdsBody,
  notificationType,
} from "./common";

const subscriptionId = input({
  label: "Subscription ID",
  type: "string",
  placeholder: "Enter subscription ID",
  comments: "The identifier for the subscription that you want to get.",
  example: "7fcacc7e-727b-11e9-8848-1681be663d3e",
  clean: util.types.toString,
  required: true,
  dataSource: "selectSubscription",
});

const payloadVersion = input({
  label: "Payload Version",
  type: "string",
  placeholder: "Enter payload version",
  comments:
    'The version of the payload object to be used in the notification. The supported version depends on the notification type: for example, ORDER_CHANGE uses "1.0", FEED_PROCESSING_FINISHED uses "2020-09-04", and LISTINGS_ITEM_ISSUES_CHANGE requires "2023-12-13". See [Notification Type Values](https://developer-docs.amazon/sp-api/docs/notification-type-values) for the version of each type.',
  required: true,
  example: "1.0",
  clean: util.types.toString,
});

const aggregationTimePeriod = input({
  label: "Aggregation Time Period",
  type: "string",
  placeholder: "Select aggregation time period",
  comments:
    "The supported aggregation time periods. For example, if FiveMinutes is the value chosen, and 50 price updates occur for an ASIN within 5 minutes, Amazon will send only two notifications; one for the first event, and then a subsequent notification 5 minutes later with the final end state of the data. The 48 interim events will be dropped.",
  model: [
    {
      label: "FiveMinutes",
      value: "FiveMinutes",
    },
    {
      label: "TenMinutes",
      value: "TenMinutes",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  required: false,
  clean: util.types.toString,
});

const orderChangeTypes = input({
  label: "Order Change Types",
  type: "string",
  collection: "valuelist",
  placeholder: "Select order change types",
  comments:
    "List of order change types to subscribe to (e.g. BuyerRequestedChange). To receive notifications of all change types, do not provide this list.",
  model: [
    {
      label: "OrderStatusChange",
      value: "OrderStatusChange",
    },
    {
      label: "BuyerRequestedChange",
      value: "BuyerRequestedChange",
    },
    {
      label: "",
      value: "",
    },
  ],
  required: false,
  clean: valueListInputClean,
});

const eventFilterType = input({
  label: "Event Filter Type",
  type: "string",
  placeholder: "Select event filter type",
  comments:
    "An eventFilterType value that is supported by the specific notificationType. This is used by the subscription service to determine the type of event filter. Refer to the [Notification Type Values](https://developer-docs.amazon/sp-api/docs/notification-type-values) for the specific notificationType to determine if an eventFilterType is supported.",
  model: [
    {
      label: "ANY_OFFER_CHANGED",
      value: "ANY_OFFER_CHANGED",
    },
    {
      label: "ORDER_CHANGE",
      value: "ORDER_CHANGE",
    },
    {
      label: "",
      value: "",
    },
  ],
  default: "",
  required: false,
  clean: util.types.toString,
});

export const createSubscriptionInputs = {
  connectionInput,
  notificationType,
  payloadVersion,
  destinationId,
  marketplaceIds: {
    ...MarketplaceIdsBody,
    required: false,
    comments:
      "A list of marketplace identifiers to subscribe to (e.g. ATVPDKIKX0DER). To receive notifications in every marketplace, do not provide this list.",
  },
  orderChangeTypes,
  aggregationTimePeriod,
  eventFilterType,
};

export const deleteSubscriptionInputs = {
  connectionInput,
  subscriptionId: {
    ...subscriptionId,
    comments: "The identifier for the subscription that you want to delete.",
  },
  notificationType,
};

export const deleteInstancedSubscriptionsInputs = {
  connectionInput,
  subscriptionId: {
    ...subscriptionId,
    comments: "The identifier for the subscription that you want to delete.",
  },
  notificationType,
};

export const getSubscriptionByIdInputs = {
  connectionInput,
  subscriptionId,
  notificationType,
};

export const listSubscriptionsInputs = {
  connectionInput,
  notificationType,
};
