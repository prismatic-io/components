import {
  connectionInput,
  endDate,
  page,
  pageSize,
  showInactive,
  sortBy,
  sortDir,
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
  sortBy,
  sortDir,
  page,
  pageSize,
  showInactive,
};
