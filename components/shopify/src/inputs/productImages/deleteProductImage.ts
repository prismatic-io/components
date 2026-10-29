import { connectionInput, productId } from "../common";
import { imageId } from "./common";

export const deleteProductImageInputs = {
  productId,
  imageId,
  shopifyConnection: connectionInput,
};
