import { getProduct } from "./get";
import { getInventoryItem } from "./inventory/get";
import { listInventoryItems } from "./inventory/list";
import { listByProductId } from "./inventory/listByProductId";
import { listProduct } from "./list";
import { updateProduct } from "./update";

export default {
  getProduct,
  getInventoryItem,
  listInventoryItems,
  listByProductId,
  listProduct,
  updateProduct,
};
