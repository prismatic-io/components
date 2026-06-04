import { listProducts } from "./list";
import { createProduct } from "./create";
import { deleteProduct } from "./delete";
import { getProduct } from "./get";
import { updateProduct } from "./update";
import { batchProduct } from "./batch";
import localInventory from "./localInventory";
import regionalInventory from "./regionalInventory";

export default {
  listProducts,
  createProduct,
  deleteProduct,
  getProduct,
  updateProduct,
  batchProduct,
  ...localInventory,
  ...regionalInventory,
};
