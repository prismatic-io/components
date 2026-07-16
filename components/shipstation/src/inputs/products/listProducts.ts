import {
  connectionInput,
  endDate,
  pagination,
  showInactive,
  sorting,
  startDate,
  tagId,
} from "../common";
import { productCategoryId, productName, productTypeId, sku } from "./common";
export const listProductsInputs = {
  connectionInput,
  sku,
  productName,
  productCategoryId,
  productTypeId,
  tagId,
  startDate,
  endDate,
  sorting,
  pagination,
  showInactive,
};
