import { batchProduct } from "./batchProduct";
import { createProduct } from "./createProduct";
import { deleteProduct } from "./deleteProduct";
import { getProduct } from "./getProduct";
import { listProducts } from "./listProducts";
import localInventory from "./localInventory";
import regionalInventory from "./regionalInventory";
import { updateProduct } from "./updateProduct";
export default {
  getProduct,
  listProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  batchProduct,
  ...localInventory,
  ...regionalInventory,
};
