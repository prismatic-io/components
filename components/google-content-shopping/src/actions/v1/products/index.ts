import { batchProductMerchant } from "./batchProduct";
import { createProductMerchant } from "./createProduct";
import { deleteProductMerchant } from "./deleteProduct";
import { getProductMerchant } from "./getProduct";
import { listProductsMerchant } from "./listProducts";
import localInventory from "./localInventory";
import regionalInventory from "./regionalInventory";
import { updateProductMerchant } from "./updateProduct";
export default {
  getProductMerchant,
  listProductsMerchant,
  createProductMerchant,
  updateProductMerchant,
  deleteProductMerchant,
  batchProductMerchant,
  ...localInventory,
  ...regionalInventory,
};
