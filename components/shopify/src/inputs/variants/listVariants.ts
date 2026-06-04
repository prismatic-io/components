import { connectionInput, getAlldata, limit, pageInfo, productId } from "../common";

export const listVariantsInputs = {
  productId,
  getAlldata,
  limit,
  pageInfo,
  shopifyConnection: connectionInput,
};
