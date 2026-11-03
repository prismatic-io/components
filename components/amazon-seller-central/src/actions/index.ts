import destinations from "./destinations";
import feeds from "./feeds";
import items from "./items";
import misc from "./misc";
import orders from "./orders";
import shipments from "./shipments";
import subscriptions from "./subscriptions";

export default {
  ...destinations,
  ...feeds,
  ...items,
  ...orders,
  ...shipments,
  ...subscriptions,
  ...misc,
};
