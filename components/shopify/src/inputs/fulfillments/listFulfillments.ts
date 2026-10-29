import { connectionInput, getAlldata, orderId, pagination } from "../common";

export const listFulfillmentsInputs = {
  orderId,
  getAlldata,
  pagination,
  shopifyConnection: connectionInput,
};
