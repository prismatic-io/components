import accounts from "./accounts";
import misc from "./misc";
import orders from "./orders";
import products from "./products";
import pubsubNotifications from "./pubsubNotifications";
export default {
  ...accounts,
  ...products,
  ...orders,
  ...pubsubNotifications,
  ...misc,
};
