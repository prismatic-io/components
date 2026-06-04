import { connectionInput, getAlldata, limit, updatedAtMin } from "../common";
import { inventoryItemIds, locationIds } from "./common";

export const listInventoryLevelsNoLocationInputs = {
  locationIds,
  inventoryItemIds,
  updatedAtMin: {
    ...updatedAtMin,
    comments: "Show inventory levels updated at or after date (format: 2019-03-19T01:21:44-04:00).",
  },
  getAlldata,
  limit,
  shopifyConnection: connectionInput,
};
