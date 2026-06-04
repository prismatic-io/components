import { connectionInput, getAlldata, limit, pageInfo } from "../common";

export const listLocationsInputs = {
  limit,
  getAlldata,
  pageInfo,
  shopifyConnection: connectionInput,
};
