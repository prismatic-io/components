import accounts from "./accounts";
import misc from "./misc";
import notifications from "./notifications";
import products from "./products";
export default {
  ...accounts,
  ...products,
  ...notifications,
  ...misc,
};
