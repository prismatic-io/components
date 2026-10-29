import { connectionInput, fieldValues, sku, updatePrice } from "../common";
import { updateVariantTitle, variantId, weight } from "./common";

export const updateVariantInputs = {
  variantId,
  updateVariantTitle,
  updatePrice,
  sku,
  weight,
  fieldValues,
  shopifyConnection: connectionInput,
};
