import { input, util } from "@prismatic-io/spectral";
import {
  LIST_FULFILLMENT_ORDERS_DATASOURCE_REFERENCE,
  LIST_FULFILLMENTS_DATASOURCE_REFERENCE,
} from "../../constants";

export const fulfillmentId = input({
  label: "Fulfillment ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the fulfillment.",
  example: "r84963704502935",
  placeholder: "Enter fulfillment ID",
  clean: util.types.toString,
  dataSource: LIST_FULFILLMENTS_DATASOURCE_REFERENCE,
});

export const fulfillmentOrderId = input({
  label: "Fulfillment Order ID",
  type: "string",
  required: true,
  comments: "The unique identifier for the fulfillment order.",
  example: "1046000820",
  placeholder: "Enter fulfillment order ID",
  clean: util.types.toString,
  dataSource: LIST_FULFILLMENT_ORDERS_DATASOURCE_REFERENCE,
});
