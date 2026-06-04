import { connectionInput, getAlldata, limit, pageInfo } from "../common";

export const listDraftOrdersInputs = {
  getAlldata,
  limit,
  pageInfo,
  shopifyConnection: connectionInput,
};
