import { connectionInput, getAlldata, limit, pageInfo, productId } from "../common";

export const listCollectsInputs = {
  getAlldata,
  productId: {
    ...productId,
    required: false,
    comments: "Filter collects by product ID. When omitted, all collects are returned.",
  },
  limit,
  pageInfo,
  shopifyConnection: connectionInput,
};
