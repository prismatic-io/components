import { listOrders } from "./list";
import { cancelOrder } from "./cancel";
import { getOrder } from "./get";
import returns from "./returns";

export default {
  listOrders,
  getOrder,
  cancelOrder,
  ...returns,
};
