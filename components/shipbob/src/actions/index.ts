import channels from "./channels";
import fulfillment from "./fulfillment";
import orders from "./orders";
import products from "./products";
import rawRequest from "./rawRequest";
import shipment from "./shipment";
import warehouses from "./warehouses";
import webhooks from "./webhooks";

export default {
  ...channels,
  ...orders,
  ...shipment,
  ...warehouses,
  ...fulfillment,
  ...products,
  ...webhooks,
  rawRequest,
};
