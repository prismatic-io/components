import { connectionInput, fieldValues, productId, sku } from "../common";
import { price, variantTitle, weight } from "./common";

export const createVariantInputs = {
  productId,
  variantTitle,
  price,
  sku,
  weight,
  fieldValues,
  shopifyConnection: connectionInput,
};
