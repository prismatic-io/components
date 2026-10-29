import { connectionInput, getAlldata, pagination, productId } from "../common";

export const listVariantsInputs = {
  productId,
  getAlldata,
  pagination,
  shopifyConnection: connectionInput,
};
