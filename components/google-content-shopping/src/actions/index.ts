import accounts from "./accounts";
import orders from "./orders";
import products from "./products";
import pubsubNotifications from "./pubsubNotifications";
import rawRequest from "./rawRequest";

export default {
  ...accounts,
  ...products,
  ...orders,
  ...pubsubNotifications,
  rawRequest,
};
