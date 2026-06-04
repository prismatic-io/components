import destinations from "./destinations";
import feeds from "./feeds";
import items from "./items";
import orders from "./orders";
import rawRequest from "./rawRequest";
import shipments from "./shipments";
import subscriptions from "./subscriptions";

export default {
  ...destinations,
  ...feeds,
  ...items,
  ...orders,
  ...shipments,
  ...subscriptions,
  rawRequest,
};
