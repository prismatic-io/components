import { connectionInput, getAlldata, limit, orderId, pageInfo } from "../common";

export const listFulfillmentsInputs = {
  orderId,
  getAlldata,
  limit,
  pageInfo,
  shopifyConnection: connectionInput,
};
