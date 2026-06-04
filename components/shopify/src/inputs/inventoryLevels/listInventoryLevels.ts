import { connectionInput, getAlldata, limit, locationId, pageInfo } from "../common";

export const listInventoryLevelsInputs = {
  locationId,
  getAlldata,
  limit,
  pageInfo,
  shopifyConnection: connectionInput,
};
