import { input } from "@prismatic-io/spectral";
import {
  LIST_FULFILLMENT_ORDERS_DATASOURCE_REFERENCE,
  LIST_FULFILLMENTS_DATASOURCE_REFERENCE,
} from "../../constants";
import { cleanFulfillmentId, cleanFulfillmentOrderId } from "../../util";
import { getAlldata, orderId, pagination, shopifyConnection } from "./common";

const fulfillmentId = input({
  label: "Fulfillment ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the fulfillment.",
  example: "5154544124321 or gid://shopify/Fulfillment/5154544124321",
  placeholder: "Enter fulfillment ID",
  clean: cleanFulfillmentId,
  dataSource: LIST_FULFILLMENTS_DATASOURCE_REFERENCE,
});

const fulfillmentOrderId = input({
  label: "Fulfillment Order ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the fulfillment order.",
  example: "564786110 or gid://shopify/FulfillmentOrder/564786110",
  placeholder: "Enter fulfillment order ID",
  clean: cleanFulfillmentOrderId,
  dataSource: LIST_FULFILLMENT_ORDERS_DATASOURCE_REFERENCE,
});

export const listFulfillmentOrdersInputs = {
  shopifyConnection,
  orderId,
  getAlldata,
  pagination,
};

export const getFulfillmentInputs = {
  shopifyConnection,
  fulfillmentId,
};

export const getFulfillmentOrderInputs = {
  shopifyConnection,
  fulfillmentOrderId,
};

export const listFulfillmentsInputs = {
  shopifyConnection,
  orderId,
};
