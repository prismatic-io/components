import { connectionInput, getAlldata, limit, pageInfo } from "../common";

export const listProductsInputs = {
  limit,
  getAlldata,
  pageInfo,
  shopifyConnection: connectionInput,
};
