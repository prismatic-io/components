import {
  getAlldata,
  locationId,
  pagination,
  shopifyConnection,
} from "./common";
export const listLocationsInputs = {
  shopifyConnection,
  getAlldata,
  pagination,
};
export const countLocationsInputs = {
  shopifyConnection,
};
export const getLocationInputs = {
  shopifyConnection,
  locationId,
};
