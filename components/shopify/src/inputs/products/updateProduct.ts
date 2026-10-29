import { connectionInput, fieldValues, productId, tags } from "../common";
import { imageUrl, productStatus, title } from "./common";

export const updateProductInputs = {
  productId,
  title,
  productStatus,
  tags,
  imageUrl,
  fieldValues,
  shopifyConnection: connectionInput,
};
