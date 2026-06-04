import { connectionInput, fieldValues, tags } from "../common";
import { body, imageUrl, productType, title, vendor } from "./common";

export const createProductInputs = {
  title,
  body,
  productType,
  vendor,
  imageUrl,
  tags,
  fieldValues,
  shopifyConnection: connectionInput,
};
