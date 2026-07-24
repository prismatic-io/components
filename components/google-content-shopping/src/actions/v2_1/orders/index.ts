import { cancelOrder } from "./cancelOrder";
import { getOrder } from "./getOrder";
import { listOrders } from "./listOrders";
import returns from "./returns";
export default {
  listOrders,
  getOrder,
  cancelOrder,
  ...returns,
};
