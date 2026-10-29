import { connectionInput, getAlldata, limit, pageInfo } from "../common";
import { ids } from "./common";

export const listInventoryItemsInputs = {
  ids,
  getAlldata,
  limit,
  pageInfo,
  shopifyConnection: connectionInput,
};
