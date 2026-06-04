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
} from "../../common";
import {
  productCategoryId,
  productName,
  productTypeId,
  sku,
} from "../../products/common";

export const selectProductsInputs = {
  connectionInput,
  sku: { ...sku, required: false },
  productName: { ...productName, required: false },
  productCategoryId: { ...productCategoryId, required: false },
  productTypeId: { ...productTypeId, required: false },
  tagId,
  startDate: { ...startDate, required: false },
  endDate: { ...endDate, required: false },
  sortBy,
  sortDir,
  page,
  pageSize,
  showInactive,
};
