import { connectionInput, productId } from "../common";
import { variantId } from "./common";

export const deleteVariantInputs = {
  productId,
  variantId,
  shopifyConnection: connectionInput,
};
