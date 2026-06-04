import { connectionInput, productId } from "../common";
import { fileName, imageAlt, imagePosition, imageURL } from "./common";

export const createProductImageInputs = {
  productId,
  fileName,
  imagePosition,
  imageURL,
  imageAlt,
  shopifyConnection: connectionInput,
};
